
const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt')
const signup = async (req, res, next) => {

    const { name, email, password, confirmPassword } = req.body;

    //Checking is all field is there or not
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Every field is required'
        })
    }
    //Password matching with confirm password
    if (password != confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and confirm password doesn't match"
        })
    }

    //Email validator
    const validEmail = emailValidator.validate(email)
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email id'
        })
    }



    //Database work
    try {
        const userInfo = userModel(req.body)
        const result = await userInfo.save() //storing the data ins data base

        return res.status(200).json({
            sucess: true,
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

const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is mandatory'
        })
    }

    try {

        const user = await userModel.findOne({
            email
        }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: 'invalid credentials'
            })
        }

        const token = user.jwtToken();

        user.password = undefined;
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }
        res.cookie("token", token, cookieOption)
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}
const getUser = async (req, res) =>{
    const userId = req.user.id;
    
    try {
        const user = await userModel.findById(userId);
        console.log("user in getuser", user)
        return res.status(200).json({
            sucess:true,
            data:user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    }


    const logout = (req ,res) =>{
        try {
            const cookieOption = {
                expires: new Date(),
                httpOnly:true
            };
            res.cookie("token", null, cookieOption);
            res.status(200).json({
                success:true,
                message:"Logged Out"

            })
        } catch (error) {
            res.status(400).json({
                success:false,
                message: error.message

            })
        }
    }
module.exports = {
    signup,
    signin,
    getUser,
    logout
}