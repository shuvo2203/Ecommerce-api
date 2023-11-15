const mongoose = require('mongoose');
mongoose.connect(process.env.DB).then(()=>{
    console.log('database connect');
}).catch((error)=>{
    console.log(error);
})