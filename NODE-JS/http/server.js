const http = require('http');

const server = http.createServer((req, resp) =>{
if(req.url =='/'){
    resp.write('<h1>hello nitiish server is this</h1>');
}else if(req.url == '/about'){
    resp.write('<h1>About page </h1>');
}
resp.end();
})

server.listen(5000);
console.log('the http server is running on port 5000:');