import { Router } from "express"; // 
import { login, logout, getProfile, register, resetPassword, forgotPassword } from '../controllers/user.controllers.js'; // 
import { isLoggedIn } from "../middleware/auth.middleware.js"; 
import upload from "../middleware/multer.middleware.js"; 
// Initialize Router instance
const router = Router();

//end points routes
router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/me', isLoggedIn, getProfile);
router.get('/logout', logout);
router.post('/forgotPassword',forgotPassword);
router.post('/reset-password',resetPassword);
// Export the router to be used in other parts of the application
export default router;
