const {app}=require("./app");
const {connectDB}=require("./db/connect")
const dotenv=require("dotenv")
dotenv.config({path:"./.env"})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||4001,()=>console.log("Server is working at 4001"));
})
.catch((err)=>{
    console.log("Server and DB connection is failed!!!")
})