const mongoose=require("mongoose")
const { User } = require("./user.model")

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Account=mongoose.model("Account",accountSchema);

module.exports={Account}