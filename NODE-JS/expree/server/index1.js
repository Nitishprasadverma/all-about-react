const http = require('http');
const { hostname } = require('os');
const PORT = 3030;
const   HOSTNAME = 'localhost'
const server = http.createServer((req,res) =>{

    res.statusCode
    res.end("Node server created by nitish ")
})

server.listen(PORT, () =>{
    console.log(`server running at ${hostname} : ${PORT}`)
})