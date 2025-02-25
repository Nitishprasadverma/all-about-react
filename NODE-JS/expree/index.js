const express = require("express");

const app = express();
const PORT = 3040;
const HOSTNAME = 'localhost';

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})
app.get('/contact', (req, res) => {
    res.send('contact page!')
})
app.listen(PORT, () => {
    console.log(`server running at ${PORT} : ${HOSTNAME}`);
}
)