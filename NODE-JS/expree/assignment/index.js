const { error } = require('console');
const http = require('http');
const PORT = 3030;
const HOSTNAME = 'localhost';

const menProducts = [
    {id:1,name:"Men's Shirt", price: 999},
    {id:2,name:"Men's Jacket", price: 999},
    {id:3,name:"Men's Snekar", price: 999},
    {id:4,name:"Men's Watch", price: 999},
    {id:5,name:"Men's Shirt", price: 999},
    {id:6,name:"Men's Shoes", price: 999},
    {id:7,name:"Men's Belt", price: 999},
    {id:8,name:"Men's Inner", price: 999},
    {id:9,name:"Men's UnderWear", price: 999},
    {id:10,name:"Men's Shirt", price: 999}
]

const womenProducts = [
    { id: 1, name: "Women's Dress", price: 1299 },
    { id: 2, name: "Women's Jeans", price: 1599 },
    { id: 3, name: "Women's Handbag", price: 3499 },
    { id: 4, name: "Women's Heels", price: 2899 },
    { id: 5, name: "Women's Earrings", price: 699 },
    { id: 6, name: "Women's Perfume", price: 2199 },
    { id: 7, name: "Women's Scarf", price: 899 },
    { id: 8, name: "Women's Sunglasses", price: 1799 },
    { id: 9, name: "Women's Watch", price: 3999 },
    { id: 10, name: "Women's Lipstick", price: 499 }
]


const server = http.createServer((req,res) =>{
    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to Men & Women Dummy Data')
    }else if(req.url === '/men'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(menProducts));
    }else if(req.url == '/women'){
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(womenProducts));
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: "Page Not Found"}));
    }
});

server.listen(PORT,() =>{
    console.log(`Serve running at http://${HOSTNAME} :${PORT}`);
});