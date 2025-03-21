const express = require('express');
const { signup , signin,getUser } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');
 const authRouter = express.Router();

 authRouter.post('/signup',signup)
//  authRouter.post('/signin',signin)
authRouter.post("/signin", signin); // ✅ Should be exactly this
authRouter.get('/user', jwtAuth, getUser)

 module.exports = authRouter;