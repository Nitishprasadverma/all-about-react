
require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/databaseConfig');
const authRouter = require("./router/authRoute")
const app = express();
console.log("Loaded SECRET:", process.env.SECRET);
databaseConnection();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use("/api/auth",authRouter )
app.use("/", (req,res) =>{
    res.status(200).json({
        data:"JWTauth server"
    })
})
module.exports = app;