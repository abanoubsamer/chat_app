 const mongoose = require('mongoose');


exports.connectDB = async ()=>{
    try{
    await mongoose.connect(process.env.URL_DATABASE)
    }
    catch(error)
    {
    console.log(error)
    }
 }


 