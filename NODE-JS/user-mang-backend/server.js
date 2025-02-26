require("dotenv").config()

const express = require("express")
const connectToDb = require("./config/db.js")

const userRoutes = require("./routes/userRoutes.js")

const cors = require("cors")

const app = express()

//middleware

app.use(express.json())
app.use(cors())


//connect to database

connectToDb()

//routes

app.use("/api/users",userRoutes)
const PORT=process.env.PORT || 3200;
console.log(`Loaded PORT: "${process.env.PORT}"`)
app.listen(PORT,() =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})