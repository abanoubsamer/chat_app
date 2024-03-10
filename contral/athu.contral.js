
const Usermodul= require("../module/User") ;
const jwt =require("jsonwebtoken")

const  bcrypt= require("bcrypt");
exports.register= async(req,res,next)=>{

     //get data from frontend
     // const name=name.req.body;
    const email=req.body.email;
    const phonenumber=req.body.phone;
    //const image=image.req.body;
    //const about=about.req.body;
        // validation data
        if(!email || !phonenumber)
        {
           
            return res.status(400).json({message:"requerd  email ond  phonenumber"})
        }
        // check user is existing
        const foundUser=await Usermodul.User.findOne({ $or: [{ email: email }, { phonenumber: phonenumber }] }).exec()
        if(foundUser)
        {
            return res.status(401).json({message:"user already registered"})
        }
        // hashing user phone
        const hashPhonenumber=await bcrypt.hash(phonenumber,10);
        // create new user
        const user= await Usermodul.User.create({
                  //  name,
                    email,
                    phonenumber:hashPhonenumber,
                   // image,
                   // about
                    }) 
       // generate token from user
        const accessToken = jwt.sign({
            userinfo: {
            id: user._id,
            },
        },process.env.ACCESS_TOKEN_SECRET_KET,{expiresIn: "15m"},)

          // generate  refresh token from user
          const refreshToken = jwt.sign({
            userinfo: {
            id: user._id,
                   },
          },process.env.REFESH_TOKEN_SECRER,{expiresIn: "1h"},)

        //// send cookise to front end
        res.cookie("token", refreshToken,{
            httpOnly: true, // hna ana ana kdh bolh mfe4 ay 7d hy2der ywsl ly ale token dh 8er ale server 
            secure: true,  // hna ana bolh m4 htwsl lu ale token dh 8er ale https 
            sameSit:"None", // hna ana lw 3nal syb domin ly ale app  bta3y bhwa kdh hyb3t ly ale ale sf7ten ale token //fe 7aga tany asmha strict hna hwa hyb3th ly ale domin ale aslyy bs
             maxAge: 60*60*1000 // hna lazm ale cookie tkon lyha expired zy ale refrash tokin 
        })
       
        /// send tokens
        res.json({
            refreshToken,
            accessToken,
            success: true ,
            phone:user.phonenumber,
            name:user.name,
            email:user.email,
            image:user.image,
            about:user.about
        })

}



exports.login=async(req,res,next)=>{
    //get data from frontend
   const {email, phonenumber}=req.body
       // validation data
       if(!phonenumber)
       {
           return res.status(400).json({message:"requerd phonenumber"})
       }
      // check user is existing
       const foundUser=await Usermodul.User.findOne({email}).exec()
       if(!foundUser)
       {
           return res.status(401).json({message:"user Not existing"})
       }
       const match=await bcrypt.compare(phonenumber,foundUser.phonenumber);
       if(!match)
       {
        return res.status(401).json({message:"phone number invalid"})
       }
       
      // generate token from user
       const accessToken = jwt.sign({
           userinfo: {
        id: foundUser._id,
           },
       },process.env.ACCESS_TOKEN_SECRET_KET,{expiresIn: "15m"},)

         // generate  refresh token from user
         const refreshToken = jwt.sign({
           userinfo: {
               id: foundUser._id,
                  },
         },process.env.REFESH_TOKEN_SECRER,{expiresIn: "1h"},)

       //// send cookise to front end
       res.cookie("token", refreshToken,{
           httponly: true, // hna ana ana kdh bolh mfe4 ay 7d hy2der ywsl ly ale token dh 8er ale server 
           secure: true,  // hna ana bolh m4 htwsl lu ale token dh 8er ale https 
           sameSit:"None", // hna ana lw 3nal syb domin ly ale app  bta3y bhwa kdh hyb3t ly ale ale sf7ten ale token //fe 7aga tany asmha strict hna hwa hyb3th ly ale domin ale aslyy bs
            maxAge: 60*60*1000 // hna lazm ale cookie tkon lyha expired zy ale refrash tokin 
       })

       /// send tokens
       res.json({
           accessToken,
           phonenumber: phonenumber,
           name:foundUser.name,
           email:foundUser.email,
           image:foundUser.image,
           about:foundUser.about
       })

}




exports.getuser=async(req,res,next)=>{
      // check user is existing
       const Users=await Usermodul.User.find().exec()
       if(Users.length===0)
       {
           return res.status(401).json({message:"Not Users"})
       }
       /// send tokens
       res.json(Users)

}


exports.refreshToken=(req,res,next)=>{
const cookies=req.cookies
if(!cookies?.token)
{
    return res.status(401).json({message:"UnAuthorized"})
}

jwt.verify(
    cookies.token,
    process.env.REFESH_TOKEN_SECRER,
    async (err,decoded)=>{
    if(err){return res.status(403).json({message:"Forbidden"})}
    const finduser= await Usermodul.User.findById(decoded.userinfo.id).exec();
    if(!finduser)
    {
        return res.status(401).json({message:"UnAuthorized"}) 
    }
     // generate token from user
     const accessToken = jwt.sign({
        userinfo: {
         id: finduser._id,
        },
    },process.env.ACCESS_TOKEN_SECRET_KET,{expiresIn: "15m"},)
    res.json({accessToken:accessToken})
})

}














///////////////////////////////////(get singin page)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
exports.getSignin = (req, res, next) => {
    res.render("Signin");
}
///////////////////////////////////(logout from website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
exports.logout=(req,res,next)=>{
const cookie= req.cookies;
if(!cookie?.token) return res.sendStatus(204);//not content

res.clearCookie("token",{
    httpOnly:true,
    sameSite:true,
    secure:true,
})
res.json({mes:"success logout"})


}