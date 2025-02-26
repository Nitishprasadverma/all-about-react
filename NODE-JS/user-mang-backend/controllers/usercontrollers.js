const { JsonWebTokenError } = require('jsonwebtoken')
const User = require('../models/Users.js')
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")


// new user registeration 

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    message: "All fields are required"
                }
            )
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json(
                    {
                        message: "User already exist"
                    }
                )
        }


        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201)
            .json(
                {
                    success: true,
                    message: "User registered successfully",
                    user
                }
            )

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


//User Login

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}