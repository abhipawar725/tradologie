import { Router } from "express";
import { Register, Login, Logout } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.post("/login", Login);
userRoute.post("/logout", Logout);
userRoute.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({
        message: "profile page"
    })
})

export default userRoute;
