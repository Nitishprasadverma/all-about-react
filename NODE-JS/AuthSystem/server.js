// import {config} from 'dotenv';
import dotenv from 'dotenv'
dotenv.config(); // loading the .env file here

console.log(" email :" ,process.env.MAIL_USER);
console.log("PAss", process.env.MAIL_PASS);
import app from './app.js';
import dbConnection from './Config/dbConnect.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () =>{
     await dbConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
});
