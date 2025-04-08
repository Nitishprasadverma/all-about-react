import { config } from 'dotenv';
import app from './app.js'; // Importing the Express app instance
import connectionToDB from './config/dbConnection.js'; // Importing database connection function
import { v2 as cloudinary } from 'cloudinary'; // Importing Cloudinary for file uploads

import Razorpay from 'razorpay'
// Load environment variables from .env file
config();

const PORT = process.env.PORT || 5000; // Set default port to 5000 if not specified in .env

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,

key_secret: process.env.RAZORPAY_SECRET
})


// Start the Express server and establish a database connection
app.listen(PORT, async () => {
    await connectionToDB(); // Connecting to the database
    console.log(`App is running at http://localhost:${PORT}`); // Debugging log (commented out)
});
