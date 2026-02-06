import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const db = process.env.MONGODB_URL

if(!db) throw new Error ("mongodb url is not defined in env")

const connectDb = async () => {
    try {
        await mongoose.connect(db)
        console.log("Database is connected")
    } catch (error) {
        console.error(error, "Database connection is failed") 
        process.exit(1)       
    }
}    

export default connectDb;