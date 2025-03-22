const express = require('express');
const databaseConnection = require('./config/databaseConfig');
const authRouter = require("./router/authRoute")
const app = express();

databaseConnection();
app.use(express.json());

app.use("/api/auth",authRouter )
app.use("/", (req,res) =>{
    res.status(200).json({
        data:"JWTauth server"
    })
})
module.exports = app;