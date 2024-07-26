const {Account}=require("../models/accounts.model");
const { User } = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const mongoose=require("mongoose")

const findBalance=asyncHandler(async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    const user=await User.findOne({
        _id:req.userId
    })
    user.password=undefined;
    res.json({ 
        user,
        balance: account.balance
    })
})

 const moneyTransfer=asyncHandler(async(req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const {amount, toUser}=req.body;

    const account=await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(401).json({
         message:"Insufficient balance"})
    }

   const toAccount=await Account.findOne({
    userId: toUser
   }).session(session);

   
   if(!toAccount){
      await session.abortTransaction();
       return res.status(400).json({
        message:"Invalid account"     
    })
   }

   await Account.updateOne({
    userId : req.userId
   },{
      $inc :{
        balance:-amount
      }
   }).session(session)

   await Account.updateOne({
    userId : toUser
   },{
    $inc :{
        balance:amount
    }
   }).session(session)

   await session.commitTransaction();

   res.status(200).json({
    message:"Transaction successful"
   })
 })

module.exports={findBalance,moneyTransfer}