const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { Schema } = mongoose;




const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
        minLength: [5, 'Name must be at least 5 char'],
        maxLength: [50, 'Name must be less than 50 char'],
        trim: true
    },
    username: {
        type: String,
        unique:[true, 'Already exist'],
        
        minLength: [3,"username must be atleast of 3 char"],
        maxLength:[20, "username should't be more than 20 char"],
        match: /^[a-zA-Z0-9_.]*$/,
        required:true
    },
    email: {
        type: String,
        required: [true, 'user email us required'],
        
        lowercase: true,
        unique: [true, 'Already exist']
    },
    password: {
        type: String,
        select: false,
        required:true
    },
    bio:{
        type: String,
        maxlength: 150, 
        default: "Hey there! I'm using this app." 
    }

})

userSchema.methods = {
    jwtToken(){
        return JWT.sign({id:this._id,email:this.email}),
        process.env.SECRET,
        {expireSIn:'12h'}
    }
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel