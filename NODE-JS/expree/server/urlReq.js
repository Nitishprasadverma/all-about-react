// const { error } = require('console');
const http = require('http');
const https = require('https');
const PORT = 3030;

const HOSTNAME = 'localhost';

const server = http.createServer((req, res) => {
    //home
    // contact
    // about
    // product
    //rest --> errr;

    if (req.url == '/') {

        res.statusCode = 200;

        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to Node js server by nitish verma');


    } else if (req.url == '/contact') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Contact Page')
    } else if (req.url == '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('About Page');


    } else if (req.url == '/product') {



        const options = {
            hostname: 'fakestoreapi.com',
            path: '/products/1',
            method: 'GET'


        }
        const apiReq = https.request(options, (apiRes) => {
            apiRes.on("data", (data) => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(data.toString());

            })
        });

        apiReq.on("error", (e) => {
            console.log("API Request Error:", e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Faild to fetch product data" }))
        })

        apiReq.end();



    } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('ERROR Aa  Gya!');
    }




});

server.listen(PORT, () => {
    console.log(`Server running at ${HOSTNAME} :${PORT}`);
})


