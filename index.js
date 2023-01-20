import express from "express";
import mongoose from "mongoose";

import cors from "cors";


const app = express();
app.use (cors({
    orgin:"*"
}))

const connect= async()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb+srv://vivek:vivek@crud.kfg1f02.mongodb.net/?retryWrites=true&w=majority");
        console.log("mongodb connected")
      } catch (error) {
        console.log(error);
      }
}

app.use(express.json())

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})
app.listen(process.env.PORT,()=>{connect()
console.log("server connecter")})