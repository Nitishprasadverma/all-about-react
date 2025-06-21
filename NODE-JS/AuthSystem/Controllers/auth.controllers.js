import User from '../Models/user.model.js';

import AppError from '../Utils/error.util.js';

import { generateToken, comparePasswords, hashPassword } from '../Services/user.service.js';

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new AppError('All fields are required', 400));
        }


        const userExist = await User.findOne({ email });

        if (userExist) {
            return next(new AppError("User already exists", 400));
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(user);

        // console.log("user instance", user)
        // console.log("token method", token)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });


    } catch (error) {
        next(error);
    }
}

export const Login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        //if password or email field is null

        if (!email || !password) {
            return next(new AppError('All fields are required', 400));
        }

        // if both are provied then find user with provided email if exist

        const user = await User.findOne({ email }).select('+password');

        // console.log("usre inspection login", user)
        // console.log("password", password);
        // console.log("hash password", user.password)
        //
        if (!user || !(await comparePasswords(password, user.password))) {
            return next(new AppError('Email or password does not match', 400));
        }


        const token = generateToken(user);

        user.password = undefined;
        const cookieOptions = {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: process.env.NODE_ENV === 'production', // for https
            sameSite: 'Lax'
        };
        res.cookie('token', token, cookieOptions);


        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        })

    } catch (error) {
        return next(new AppError(error.message, 500));
    }


}