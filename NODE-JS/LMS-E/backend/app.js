import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'; // Importing user-related routes
import errorMiddleware from './middleware/error.middleware.js'; // Importing error-handling middleware

// Load environment variables from .env file
config();

const app = express(); // Creating an Express application instance

app.use(express.json()); // Middleware to parse incoming JSON requests

// Configure CORS to allow frontend requests
app.use(
    cors({
        origin: [process.env.FRONTEND_URL], // Allow requests from the frontend URL
        credentials: true, // Ensures cookies are sent with requests
    })
);

app.use(cookieParser()); // Middleware to parse cookies from incoming requests
app.use(morgan('dev')); // Logging middleware for HTTP requests

// Health check route
app.use('/ping', (req, res) => {
    res.send('/pong');
});

// Register user-related routes
app.use('/api/v1/user', userRoutes);

// Handle undefined routes with a 404 error response
app.use('*', (req, res) => {
    res.status(404).send('Oops! 404 page not found!');
});

// Global error-handling middleware
app.use(errorMiddleware);

export default app; // Export the configured Express app instance