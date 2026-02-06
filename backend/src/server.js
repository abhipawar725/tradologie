import express from "express"
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("home page")
})

connectDb().then(()=>{
    app.listen(PORT, () => console.log(PORT, "app is connected"))
})