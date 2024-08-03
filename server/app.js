const express=require("express");
const app=express();
const cookieParser=require("cookie-parser")
const mainRouter=require("./routes/index.routes")
const cors=require('cors');

const corsOptions = {
    origin: 'https://my-app-client.onrender.com',
    optionsSuccessStatus: 200
  };
  
app.use(cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",mainRouter);


module.exports={app};