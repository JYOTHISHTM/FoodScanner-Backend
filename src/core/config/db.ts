import mongoose from "mongoose";

export const connectDB=async ():Promise<void>=>{
    try{
        const connect =await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`DB connected :${connect.connection.host}`)
    }catch(err){
        console.error("DataBase Connection Failed",err)
        
    }
} 