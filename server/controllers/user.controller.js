const {User}=require("../models/user.model")
const {Account}=require("../models/accounts.model")
const {asyncHandler}=require("../utils/asyncHandler")
const {signupSchema, updateUserSchema,loginSchema}=require("../utils/formatValidater")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const signupUser=asyncHandler(async(req,res)=>{
    try {
        const reqBody=req.body;
        const obj=signupSchema.safeParse(reqBody);
        if (!obj.success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }
        const user=await User.findOne({username:reqBody.username});
        if(user)
        return res.status(400).json({
    msg:"User already exists, kindly try login"
});


        const hashedPassword=await bcrypt.hash(reqBody.password,10);
       
        const savedUser=await User.create({
            username: reqBody.username,
            password: hashedPassword,
            firstname: reqBody.firstname,
            lastname: reqBody.lastname,
        })

        await Account.create({
            userId:savedUser._id,
            balance: 1 + Math.random()*10000 
        })

        const payload={
            userId:savedUser._id,
            username:savedUser.username
        }

         const token=await jwt.sign(payload,process.env.SECRET_KEY);

         const options={
            expire: new Date(Date.now()+1 * 24 * 60 * 60 * 1000),
            httpOnly:true,
            secure:true
         }

         res.cookie("token",token,options)
         res.status(200).json({
            msg:"User created successfully",
         })
        
    } catch (error) {
        console.log("Error while creating user")
        throw new Error(error)
    }
})

  const signinUser=asyncHandler(async(req,res)=>{
      try {
        const {success}=loginSchema.safeParse(req.body)
        
        if(!success){
            return res.status(411).json({
                error:"Incorrect inputs"
            })
        }

        const user=await User.findOne({username:req.body.username})

        if(!user)
        return res.status(401).json({
            error:"User doesn't exist"
        })

      const hashedPassword=await bcrypt.compare(req.body.password,user.password);
      if(!hashedPassword)
      return res.status(401).json({
       error:"You've entered wrong password!!!"
    })

    const payload={
        userId:user._id,
        username:user.username
    }

     const token=await jwt.sign(payload,process.env.SECRET_KEY);

     const options={
        expire: new Date(Date.now()+1 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        secure:true
     }

     res.cookie("token",token,options);
     res.status(200).json({
        message:"Signin successfully",

     })
    
    } catch (error) {
        console.log("Login failed!")
        throw new Error(error);
      }
  })

const updateUser=asyncHandler(async(req,res)=>{
    try {
        const reqBody=req.body;
        const {success}=updateUserSchema.safeParse(reqBody);
       if(!success)
       return res.json({
    msg:"You've entered wrong inputs!"})

    const hashedPassword=await bcrypt.hash(reqBody.password,10);
    reqBody.password=hashedPassword;

    await User.updateOne({ _id: req.userId }, {$set: reqBody});
	
    res.json({
        msg: "Updated successfully"
    })


    } catch (error) {
        throw new Error(error.message);
    }
})

const searchUser=asyncHandler(async(req,res)=>{
  try {
      const filter=req.query.filter || "";

      const users=await User.find({
            $or: [{
                firstname: {
                "$regex" : filter,
                "$options": "i"
                }
            },{
                lastname:{
                    "$regex" : filter,
                    "$options": "i"
                }
            }]
      })
    
       res.json({
          user:users.map(user=>({
              username:user.username,
              firstname:user.firstname,
              lastname:user.lastname,
              _id:user._id
          }))
       })
  } catch (error) {
    console.log(error)
  }
})

const logoutUser=asyncHandler(async(req,res)=>{
      const options={
        httpOnly:true,
        secure:false
      }
      res.status(200).clearCookie("token",options).json({
        msg:"logged out successfully"
      })
})

module.exports={signupUser,signinUser,updateUser,searchUser,logoutUser}