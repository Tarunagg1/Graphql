import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})