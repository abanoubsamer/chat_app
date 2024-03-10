const router = require('express').Router();
  let body=require('body-parser');
  body=body.urlencoded ({extended: true});
 const homecontroal=require("../contral/home.contral");


 router.get('/',homecontroal.gethome);




 module.exports= router;