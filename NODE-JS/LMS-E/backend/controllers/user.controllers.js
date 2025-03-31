import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
// import cloudinary from 'cloudinary'
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; 

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
        if (!user || !user.comparePassword(password)) {
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

// Export functions
export {
    register,
    login,
    logout,
    getProfile
};
