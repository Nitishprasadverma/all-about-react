
const emailValidator = require('email-validator');
const signupValidator = (req, res, next) => {
    const { username, name, bio, email, password } = req.body;
    if (!name || !username || !bio || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    const validEmail = emailValidator.validate(email)
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email id'
        })
    }
    next();
};

const loginValidator = (req, res, next) => {
    const { identifier, password } = req.body; // identifier can be email or username

    if (!identifier || !password) {
        return res.status(400).json({
            success: false,
            message: "Username or email and password are required!"
        });
    }


    next();
};

module.exports = {
    signupValidator,
    loginValidator
}