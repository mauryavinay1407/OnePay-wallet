const express=require("express");
const app=express();
const cookieParser=require("cookie-parser")
const mainRouter=require("./routes/index.routes") 

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",mainRouter);


module.exports={app};