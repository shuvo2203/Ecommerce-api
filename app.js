const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const data = require('./config/database');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

const product = require('./routes/productRoute');
const user = require('./routes/userRoute');


app.use('/api/v1', product);
app.use('/api/v1', user);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})