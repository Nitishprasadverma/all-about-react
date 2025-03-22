const userModel = require('../usermodel/userSchema');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');



const singup = async(req, res,next) => {

// const {name, username, email, password, bio} = req.body;

//DB work

try {
    const userInfo = userModel(req.body);

    const result = await userInfo.save();

    return res.status(200).json({
        success:true,
        data:result
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

const login = async(req, res, next) => {



    try {
        const user = await userModel.findOne({
            email
        }).select('+password');

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({
                success: false,
                message: 'invalid credentials'
            })
        }

        const token  = user.jwtToken();
        user.password = undefined;
        const cookieOption ={
            maxAge: 24 *60 * 60 * 1000,
            httpOnly : true
        }

        res.cookie("token", token, cookieOption);
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


module.exports = {
    singup,
    login
}