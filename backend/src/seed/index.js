import mongoose from "mongoose";
import createAdmin from "./seed.admin.js";
import dotenv from "dotenv"
dotenv.config()

const db = process.env.MONGODB_URL
mongoose.connect(db)
.then( async () => {
    await createAdmin();
    console.log("seeding done")
    process.exit()
})
.catch((err) => {
    console.log(err)
    process.exit(1)
})
