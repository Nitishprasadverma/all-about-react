const express = require("express")

const fs = require('fs')

const path = require('path')

const cors = require('cors')

const app = express()
app.use(cors())
const PORT = 3000;

const movieFilePath = path.join(__dirname,'movies_data.json')


//utility function to read the json file


function readMoviesData(){

        try {
            const data = fs.readFileSync(movieFilePath,'utf-8')

            return JSON.parse(data)
        } catch (error) {
            console.log('Error reading the JSON file', err)
            return []
        }

}

//Route to get all movies

app.get('/movies', (req,res) =>{
    const movies = readMoviesData();
    res.send(movies)
})

//route to get specific movie by id

app.get('/movies/:id', (req,res) =>{
    const movieId = parseInt(req.params.id, 10);

    const movies = readMoviesData();
    const movie = movies.find(m => m.id === movieId);

    if(movie){
        res.send(movie)
    }else{
        res.status(404).send({error: 'Movie not found'})
    }
})

//start the server

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
