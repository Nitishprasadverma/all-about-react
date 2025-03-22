const express = require('express');
const { singup } = require('../controllers/authControllers');
const signupvalidator = require('../middleware/validatore.js')
// const { router } = require('../app');




const authRouter = express.Router();

authRouter.post('/signup', signupvalidator,singup);

module.exports = authRouter;