const express = require('express');
const app = express();
const PORT = 3000;

//middleware to parse JSON
app.use(express.json());


//Home route
app.get('/',(req,res) =>{
    res.json({msg: 'I am homepage'});
})


//About page route
app.get('/',(req,res) =>{
    res.json({msg: 'I am about page'});
})
//contact page
app.get('/contact', (req,res) =>{
    res.json({email:'support@pwskills.com'});
})

app.listen(PORT,() =>{
    console.log(`Serve is running on http://localhost:${PORT}`)
})