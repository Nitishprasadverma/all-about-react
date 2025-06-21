import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/my_database";

const dbConnection = async () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then((conn) => {
        console.log(`Connected to DB :${conn.connection.host}`);
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    })
}


export default dbConnection;