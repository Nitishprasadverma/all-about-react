import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


console.log("🔧 Service file loaded");
export const hashPassword = async (plainPassword) =>{
    return await bcrypt.hash(plainPassword, 10);
}


export const comparePasswords = async (plain, hashed) =>{
    return bcrypt.compare(plain, hashed);
};

export const generateToken = (user) => {
    return jwt.sign(
        {
            id : user.id, email : user.email
        },
        process.env.SECRET,
        {expiresIn:"24h"}
    );
}