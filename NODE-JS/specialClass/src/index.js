
import app from './app.js';
import mongoose from 'mongoose';
const port = 3000;

// database connection :- mongodb

// mongoose.connect('mongodb://127.0.0.1:27017/test'); // may fail bcz connection faild is not handled

(async () => {
    try {
        // db connection

        await mongoose.connect('dbstring');
        console.log('db connected successfully')
        app.on("error", (err) => {
            console.log("ERROR: ", err)
            throw err;
        })

        app.listen(port, () => {
            console.log(`Listening on port: ${port}`)
        })


    } catch (error) {
        console.error("ERROR:", err);
        throw error;
    }
})()

// app.listen(port, () => {
//     console.log(`server is running at ${port}`)
// })