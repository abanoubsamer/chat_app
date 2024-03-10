const jwt =require("jsonwebtoken")
// hna ana 3awz awls ly ale token bta3 ale user 
// we a3ml check 3leh 
exports.verfiyjwt = (req,res,next)=>{
const authHandler=req.headers.authorization || req.headers.Authorization // Bearer token
if(!authHandler?.startsWith("Bearer ")){
    return res.status(401).json({message:"user Unauthorized"})
}                                   //   0        1 
const token = authHandler.split(" ")[1]//["Bearer","token"]
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KET,(err,decoded)=>{
if(err){ return res.status(403).json({message:"Forbidden"})}
    req.user= decoded.userinfo.id // hna ana bsbt al id bta3 al user dh lkol function 3awzh fe ale req
    next();
})
}