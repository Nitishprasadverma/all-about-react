
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectToDb = require('./db.js')

const app = express()

//Express middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

//init connection to db

connectToDb();

const userRoutes =  require("./routes/userRoutes.js")
app.use('/',userRoutes)

// export default app;
module.exports = app;