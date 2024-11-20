import mongoose  from "mongoose";
export const connectDB= async()=>{
    try {
        
        const connect = await mongoose.connect(process.env.MONGO_LINK)
        console.log(`MONGODB CONNECTED: ${connect.connection.host}`);
    } catch (error) { 
        console.log(`Error :${error.message}`);
        process.exit(1);
    }
}