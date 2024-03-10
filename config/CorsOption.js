const { indexOf } = require('lodash')
const originas=require('./AllowOrigins')

const CorsOptions={
// bos ya sedy hna anta 3l4an tolh an url ale msmo7 beha dh tmm wla l2 
// fa bolh in ale if(originas.indexOf(origin)!==-1)
// hna dh m3nah an lw ale origin ale gyly l2toh gwa ale  originas ale msmo7 beha trg3ly true y3ne tmm d5loh

origin:(origin,callback)=>{
    if(originas.indexOf(origin)!==-1|| !origin)
    {
        callback(null,true)
    }
    else{
        callback(new Error ("not allowed by cors"),false)
    }
},
// bos ya sedy awl 7aga hwa ale credentials dh 3bara 3na ale data ale anta msmo7 tb3tha m3a req zy ale cookies fa lazm akon 3mlha true
credentials:true,
// hna dh ale status code anoh tmm
optionSuccessStatus:200
}

module.exports = CorsOptions;