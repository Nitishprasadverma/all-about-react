const JWT = require('jsonwebtoken')

const jwtAuth = (req, res, next) =>{
    const token  = (req.cookies && req.cookies.token) || null;
    console.log("Token received:", token); // Debugging
    if(!token){
        return res.status(400).json({
            success:false,
            message:'Not authorized'
        })
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        console.log("Payload:", payload);
        req.user = {id:payload.id, email:payload.email};
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }

    next();
}

module.exports = jwtAuth;