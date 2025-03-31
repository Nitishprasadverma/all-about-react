import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be atleast 5 character'],
        maxLength: [30, 'Name should be less than 30 character'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: 'String',
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'please fill in valid email address'
        ],


    },
    password: {
        type: 'String',
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be atleast 8 character'],
        select: false
    },
    avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, {
    timestamps: true
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);

})

userSchema.methods = {
    generateJWTToken: async function () {
        return await jwt.sign(
            { id: this._id, email: this.email, subscription: this.subscription, role: this.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    }
}
const User = model('User', userSchema);

export default User;