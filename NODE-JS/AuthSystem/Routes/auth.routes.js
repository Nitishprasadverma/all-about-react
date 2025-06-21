import express from 'express';
import { register,Login } from '../Controllers/auth.controllers.js';


const router = express.Router();

router.post("/register", register);
router.get("/login", Login);
export default router;

