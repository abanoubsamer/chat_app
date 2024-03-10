  const router = require('express').Router();
  let body=require('body-parser');
  body=body.json();
  const authcontral=require('../contral/athu.contral')
  const verifemail=require('../contral/verifyemail.contal')
  const verfiyjwt=require('../middelwere/verifyJWT')


 
router.route("/refresh").get(authcontral.refreshToken)
router.route("/auth").get(verfiyjwt.verfiyjwt,authcontral.getuser)
router.route("/login").post(authcontral.login)
router.get('/Signin',authcontral.getSignin)
router.post('/Authotp',body,verifemail.sendotp);
router.post('/Signin',body,verifemail.verfyotp,authcontral.register);

router.route("/logout").post(authcontral.logout)




//logout from website

router.all('/logout')

module.exports= router;