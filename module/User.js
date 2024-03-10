const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type : String,
        default:"bibosamer"
    },
    email:{
        type : String,
        required: true,
    },
    phonenumber: 
    {
        type : String,
        required: true,
    },
    image:{
     type:String,
     default:"photo.jpg"
    },
    about:{
        type:String,
        default:"Hay there ! iam using WhatsApp"
    } 
})


const User= mongoose.model('User',userSchema);

















exports.User = User;