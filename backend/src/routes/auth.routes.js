import { Router } from "express";
import {Login, Logout} from "../controllers/auth.controller.js"
import authorisation from "../middlewares/auth.middleware.js";
import authorizeAdmin from "../middlewares/role.middleware.js";

const authRoute = Router();

authRoute.post("/login", Login);
authRoute.post("/logout", Logout);
authRoute.get("/profile", authorisation, authorizeAdmin, (req, res) => {
    res.status(200).json({
        message: "profile page"
    })
})

export default authRoute;
