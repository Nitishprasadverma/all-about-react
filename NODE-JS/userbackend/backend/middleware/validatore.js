
const emailValidator = require('email-validator');
const userModel = require('../usermodel/userSchema');

const signupValidator = async (req, res, next) => {
    const { username, name, bio, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !username || !bio || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Validate email format
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email ID'
        });
    }

    try {
        // Check if the username already exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username already taken. Please choose a different one.'
            });
        }

        next(); // Move to the next middleware/controller if validation passes
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while checking username availability'
        });
    }
};
const loginValidator = (req, res, next) => {
    const { username, email, password } = req.body;

    // Validate input: Ensure at least one of username or email is provided along with the password
    if ((!username && !email) || !password) {
        return res.status(400).json({
            success: false,
            message: "Username or Email and Password are required!",
        });
    }

    next();
};

module.exports = {
    signupValidator,
    loginValidator
}