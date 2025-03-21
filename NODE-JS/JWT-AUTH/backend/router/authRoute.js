const express = require('express');
const { signup , signin,getUser } = require('../controller/authController');
 const authRouter = express.Router();

 authRouter.post('/signup',signup)
//  authRouter.post('/signin',signin)
authRouter.post("/signin", signin); // ✅ Should be exactly this


 module.exports = authRouter;