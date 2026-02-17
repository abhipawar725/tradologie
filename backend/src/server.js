import express from "express"
import connectDb from "./config/db.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoute from "./routes/auth.routes.js";
import { limiter } from "./middlewares/rateLimit.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import CategoryTree from "./utils/categoryTree.js";

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))
app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.use("/", authRoute)
app.use("/api", limiter)
app.use("/api/category", categoryRouter)
app.use("/api/product", productRouter)
app.use("/api/user", userRoutes)

CategoryTree()

connectDb().then(()=>{
    app.listen(PORT, () => console.log(PORT, "app is connected"))
})