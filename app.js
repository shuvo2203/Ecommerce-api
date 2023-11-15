const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const data = require('./config/database');


const PORT = process.env.PORT;

app.use(express.json());

const product = require('./routes/productRoute');


app.use('/api/v1', product);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})