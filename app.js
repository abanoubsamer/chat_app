require("dotenv").config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookiesParser = require('cookie-parser') 
const port = process.env.PORT ||3000;


////////////////////////////////////////////
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
////////////////////////////////////////////
const connectDB = require('./config/ConectDB')
const authrouter = require('./router/auth.router')
const homerouter= require('./router/home.router');
const CorsOption=require("./config/CorsOption");
//1- lazm awl 7aga t3ml connect db
connectDB.connectDB();
//2-lazm tany 7aga t3ml cors option
app.use(cors(CorsOption))
//3-
app.use(cookiesParser());
app.use(express.json())

//4-
app.use('/',homerouter);
app.use("/",authrouter);
app.use("/",authrouter);




app.all("*",(req,res,next)=>{

  res.status(404)
  // hna ana b3ml back end ly web we mobile fa bolh hwa lw bt2bl ale html 
  if(req.accepts("html")){
    res.render('404.ejs',{ pagetitale: "Page Not Found" })
  }
  else if(req.accepts("json")){
    res.json({mas:"page not found"})
  }
  // hna hwa wla by2bl html wla json 
  else{
    res.type("text").send("page not found")
  }
  
})

// mongoose btdelk function deh btolh anta lma t3ml connecte 3la db t3ml 7aga mo3yna hna ana bolh mt3ml4 listen 3la ale serve 8er lma t3ml connect db
mongoose.connection.once("open", ()=>{
  console.log("Connect to Mongoose server ...")
  
server.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});

})
// hna deh 4bh ale event lw 7sl error h3ml eh
mongoose.connection.on("error",(err)=>{
  console.log(`Error: ${err}`);
})

















