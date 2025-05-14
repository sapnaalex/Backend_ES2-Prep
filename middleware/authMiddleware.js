const jwt=require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({mesage:"Missing token"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.username=decoded.username;
        next();
    }catch(err){
        return res.status(403).json({message:"Invalid token"});
    }
};
module.exports=authenticateToken;