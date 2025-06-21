import app from './app.js';
import dbConnection from './Config/dbConnect.js';
import {config} from 'dotenv';

config(); // loading the .env file here

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () =>{
     await dbConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
});
