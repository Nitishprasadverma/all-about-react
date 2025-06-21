import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required :[true,'User name is required'],
        minLength : [3, 'Name must be atleast 3 character'],
        trim: true
    },

    email: {
        type: String,
        required : [true, 'User email is required'],
        unique : [true,'This email id already exist'],
        lowercase: true,
    },
    password : {
        type : String,
        select : false,
    }
}, {
    timestamps : true
})

const User = model('User', userSchema);

export default User