const jwt=require("jsonwebtoken")
const { asyncHandler } = require("../utils/asyncHandler")
const { User } = require("../models/user.model")

const authMiddleware=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.token;
        if(!token)
        throw new Error("Unauthorized request")

        const decodedToken=await jwt.verify(token,process.env.SECRET_KEY);

        const user=await User.findById(decodedToken.userId);
        if(!user)
        return res.status(403).json({});
        
        req.userId=decodedToken.userId;
        next();

    } catch (error) {
        throw new Error(error.message)
    }
    

})

module.exports={authMiddleware}