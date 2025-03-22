
const emailValidator = require('email-validator');
const signupDataValidate = (req, res, next) => {
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

module.exports = signupDataValidate