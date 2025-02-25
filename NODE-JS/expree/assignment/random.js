const express = require('express');
const app = express();
const PORT = 3034;

app.use(express.json());

app.get('/random', (req,res) =>{
    const randomNum = Math.floor(Math.random() *100) + 1;

    res.json({random: randomNum});
})

app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})