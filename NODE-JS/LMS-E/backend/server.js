import { config } from 'dotenv';
import app from './app.js'; // Add ".js" when importing local modules in ES modules
import connectionToDB from './config/dbConnection.js';

config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`App is running at http://localhost:${PORT}`);
});
