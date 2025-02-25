const User = require("../models/userModel.js");

exports.home = (req, res) => {
    res.send('Hello World!')
}

exports.creatUser = async (req, res) => {
    //extract info
    try {
        const { name, email } = req.body

        if (!name || !email) {
            throw new Error("Name and email are required");
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            throw new Error("User already exist");
        }


        const user = await User.create({
            name,
            email
        })

        res.status(201).json({
            success: true,
            message: "user created Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


//Fetching all users from the databse

exports.getUsers = async (req, res) => {
    try {

        const users = await User.find({})
        if (users.length == 0) {
            throw new Error("No user exists in the database");

        } else {
            res.status(200).json({
                success: true,
                message: "All users fetched",
                users
            })
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Editing the existing user data value
exports.editUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userexit = await User.findById(userId)
        if (userexit) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body)
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                updatedUser
            })
        } else {
            throw new Error("User doesn't exist")
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Deleting method 
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userexit = await User.findById(userId)
        if (userexit) {
            const user = await User.findByIdAndDelete(userId)
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        } else {
            throw new Error("This user doesn't exist");
        }



    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}