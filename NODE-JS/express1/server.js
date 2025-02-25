
require('dotenv').config();
const app = require('./app.js');

const PORT=process.env.PORT || 3200;

console.log(`Loaded PORT: "${process.env.PORT}"`)
app.listen(PORT,() =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})