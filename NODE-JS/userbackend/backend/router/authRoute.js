const express = require('express');
const { signup,login } = require('../controllers/authControllers');

const { signupValidator, loginValidator } = require('../middleware/validatore'); // Fix import

// const { router } = require('../app');




const authRouter = express.Router();

authRouter.post('/signup' ,signupValidator,signup);
authRouter.post('/login',login)
module.exports = authRouter;