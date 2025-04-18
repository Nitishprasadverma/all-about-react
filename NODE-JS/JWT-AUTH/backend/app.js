
const express = require("express");
const app = express();
const authRouter = require("./router/authRoute");
const databaseconnect = require("./config/databaseConfig");
const cookieParser = require('cookie-parser')
const cors = require('cors');

databaseconnect();
app.use(express.json());
app.use(cookieParser());
//enabling cors for browser
app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true
}))


app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});


// Mount auth routes first
app.use("/api/auth", authRouter);

// ✅ Place this at the bottom
app.use("/", (req, res) => {
    res.status(200).json({ data: "JWTauth server" });
});

module.exports = app;
