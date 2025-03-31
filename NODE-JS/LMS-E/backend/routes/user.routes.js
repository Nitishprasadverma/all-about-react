import { Router } from "express"; // Importing Router from Express to define routes
import { login, logout, getProfile, register } from '../controllers/user.controllers.js'; // Importing user-related controllers
import { isLoggedIn } from "../middleware/auth.middleware.js"; // Middleware to check if user is logged in
import upload from "../middleware/multer.middleware.js"; // Multer middleware for handling file uploads

// Initialize Router instance
const router = Router();

// User registration route with file upload (avatar image)
router.post('/register', upload.single("avatar"), register);

// User login route
router.post('/login', login);

// Get user profile route, requires authentication
router.get('/me', isLoggedIn, getProfile);

// User logout route
router.get('/logout', logout);

// Export the router to be used in other parts of the application
export default router;
