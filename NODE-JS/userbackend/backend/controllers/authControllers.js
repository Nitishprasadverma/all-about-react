const userModel = require('../usermodel/userSchema');
('email-validator');
const bcrypt = require('bcrypt');



const signup = async (req, res, next) => {

    // const {name, username, email, password, bio} = req.body;

    //DB work

    try {
        const userInfo = userModel(req.body);

        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {

        if (error.code === 1100) {
            return res.status(400).json({
                success: false,
                message: 'Account already exist with provided email id'
            })
        }
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}




const login = async (req, res, next) => {

    const { email, username, password } = req.body;

    try {
        console.log("Received Data:", req.body);
        const user = await userModel.findOne({
            $or: [{ email }, { username }]
        }).select('+password');

        console.log("User Found:", user); 
//
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials - User not found!',
            });
        }

        console.log("Stored Password:", user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials - Password mismatch!',
            });
        }

        const token = user.jwtToken();
        user.password = undefined;
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Server error" + error.message
        });
    }
}


module.exports = {
    signup,
    login
}