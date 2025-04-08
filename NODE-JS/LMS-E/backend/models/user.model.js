import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

// Define the User schema with necessary fields and validation
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [30, 'Name should be less than 30 characters'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regular expression for email validation
            'Please provide a valid email address'
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters'],
        select: false // Ensures password is not returned in queries by default
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'], // Defines allowed roles
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
        id:String,
        status:String
    }
}, {
    timestamps: true // Automatically manages createdAt and updatedAt fields
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Instance methods for user model
userSchema.methods = {
    // Generate JWT token for authentication
    generateJWTToken: async function () {
        return await jwt.sign(
            { id: this._id, email: this.email, role: this.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );
    },
    // Compare plain text password with the hashed password
    comparePassword: async function (plainTextPassword) {
        console.log("Comparing:", plainTextPassword, "with stored:", this.password);
        const isMatch = await bcrypt.compare(plainTextPassword, this.password);
        console.log("PAssword Match:", isMatch);
        return isMatch;
    },
    generatePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;//15min
        return resetToken;
    }
};

// Create and export the User model
const User = model('User', userSchema);
export default User;
