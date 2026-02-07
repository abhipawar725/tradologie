import express from "express"
import connectDb from "./config/db.js";
import categoryRouter from "./routes/category.routes.js";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api", rateLimit)
app.use("/api/category", categoryRouter)

connectDb().then(()=>{
    app.listen(PORT, () => console.log(PORT, "app is connected"))
})