const userModel = require('../usermodel/userSchema');
('email-validator');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    try {
        // Create a new user instance with the provided data from the request body
        const userInfo = new userModel(req.body);

        // Save the user to the database
        const result = await userInfo.save();

        // If successful, return success response with user data
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        // Handle duplicate entry error (code 1100 indicates a unique constraint violation)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Account already exists with the provided email or username'
            });
        }

        // Handle any other errors
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const login = async (req, res, next) => {

    const { username, email, password } = req.body;

    // Validate input: Ensure at least one of username or email is provided along with the password
    // if ((!username && !email) || !password) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Username or Email and Password are required!",
    //     });
    // }

    try {
        let user;

        // Attempt to find the user by username first
        if (username) {
            user = await userModel.findOne({ username }).select('+password');
        }

        // If no user is found with the username, attempt to find by email
        if (!user && email) {
            user = await userModel.findOne({ email }).select('+password');
        }

        // If user is still not found, return an error
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials - User not found!",
            });
        }

        console.log("Stored Hashed Password:", user.password);
        console.log("Entered Password:", password);

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        // If passwords don't match, return an error
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials - Password mismatch!",
            });
        }

        // Generate a JWT token for authentication
        const token = user.jwtToken();

        // Remove the password field before sending user data in response
        user.password = undefined;

        // Set token in cookies with secure options
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours expiration
            httpOnly: true // Prevent client-side access to the cookie
        };

        res.cookie("token", token, cookieOption);
        
        // Send success response with user data (excluding password)
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        // Handle server errors and send response
        res.status(400).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
}



module.exports = {
    signup,
    login
}