const { error } = require('console');
const http = require('http')

const PORT = 3000;
const hostname = 'localhost';

// const server = http.createServer((req, resp) =>{
//     resp.statusCode = 200;
//     resp.setHeader('Content-Type','text/plain');
//     resp.end("hello world");
    
// })


//throwing error from server
const server = http.createServer((req, resp) =>{
    resp.statusCode = 500;
    resp.setHeader('Content-Type','application/json');
    resp.end(JSON.stringify({error:"server error"}));
    
})


server.listen(PORT, () =>{
    console.log(`Server running at ${hostname}:${PORT}`);
})

