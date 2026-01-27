import mongoose from "mongoose";

const DB_URL = process.env.MONGODB_URL

if(!DB_URL){
    throw new Error("please define mongodb url in env")
}

async function connectDB() {
    if(mongoose.connection.readyState >= 1) return;
    try {
       await mongoose.connect(DB_URL as string )
       console.log("Database is connected")
    } catch (error) {
       console.error( error , "Database connection is failed") 
    }
}

export default connectDB;