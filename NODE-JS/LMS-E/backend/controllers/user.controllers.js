import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
// import cloudinary from 'cloudinary'
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'

// Cookie options for authentication
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevents client-side JavaScript access
    secure: false // Should be true in production (HTTPS required)
}

// Register a new user
const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new AppError('Email already exists', 400));
    }

    // Create a new user
    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzglpt/image/upload' // Default avatar
        }
    });

    if (!user) {
        return next(new AppError('User registration failed, please try again', 400));
    }

    // Handle file upload (if user uploaded an avatar)
    if (req.file) {
        // console.log("request for file", JSON.stringify(req.file));
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove the file from local storage
                await fs.unlink(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(new AppError(error.message || 'File not uploaded, please try again!', 500));
        }
    }

    // Save user and remove password from response
    await user.save();
    user.password = undefined;

    // Generate JWT token
    const token = await user.generateJWTToken();

    // console.log("Setting Cookie:", token); // Debugging
    res.cookie('token', token, cookieOptions);
    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        user
    });
}

// Login user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return next(new AppError('All fields are required', 400));
        }

        // Find user by email
        const user = await User.findOne({ email }).select('+password');

        // Check if user exists and password is correct
        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Email or password does not match!', 400));
        }


        // Generate JWT token and set cookie
        const token = await user.generateJWTToken();
        user.password = undefined;
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

// Logout user
const logout = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}

// Get user profile
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            message: 'User details',
            user
        });
    } catch (error) {
        return next(new AppError('Failed to fetch user details', 500));
    }
}

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError('Email is required', 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('Email does not exist', 400))
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log(resetPasswordUrl);
    const subject = 'resetPassword';
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`

        })
    } catch (error) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();
        return next(new AppError(error.message, 500));
    }
}

const resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;

    const { password } = req.body;

    const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })

    if (!user) {
        return next(new AppError('Token is invalid or expired, please try again', 400));
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })
}

const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    const { id } = req.user;

    if (!oldPassword || !newPassword) {
        return next(new AppError('All field are madatory', 400));
    }
    const user = await User.findById(id).select('+password')

    if (!user) {
        return next(
            new AppError('User does not exist', 400)
        );
    }

    const isPassowordValid = await user.comparePassword(oldPassword);
    if (!isPassowordValid) {
        return next(
            new AppError('Invalid Password', 400)
        );
    }
    user.password = newPassword;
    await user.save();
    user.password = undefined;
    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    })
}

const updateUser = async (req, res, next) => {
    const { fullName } = req.body;
    // console.log("full name:", fullName)
    const id = req.params.id;
    // console.log("User id in update",id)
    const user = await User.findById(id);

    if (!user) {
        return next(
            new AppError('User does not exists'), 400
        )
    }

    if (fullName) {
        user.fullName = fullName
    }

    if (req.file) {
        await cloudinary.uploader.destroy(user.avatar.public_id)

        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove the file from local storage
                await fs.unlink(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(new AppError(error.message || 'File not uploaded, please try again!', 500));
        }
    }

    await user.save();
    res.status(200).json({
        success: true,
        message: 'Profile updated successfully !',

    })
}
// Export functions
export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
};
