const http = require('https')
// const { hostname } = require('os')

const options = {
    hostname: 'fakestoreapi.com',
    path: '/products/1',
    method: 'GET'


}
const apiReq = http.request(options, (apiRes) => {
    apiRes.on("data", (data) => {
        console.log(data.toString())
    })
});

apiReq.on("error",() => {
    console.log(e)
})

apiReq.end();