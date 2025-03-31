import { Router } from "express";
import {login,logout,getProfile,register} from '../controllers/user.controllers.js'
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me',isLoggedIn, getProfile );
router.get('/logout', logout);

export default router;