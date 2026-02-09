import { Router } from "express";
import { Login } from "../controllers/auth.controller.js";
// import {Login, Logout} from "../controllers/auth.controller.js"
import authorisation from "../middlewares/auth.middleware.js";

const authRoute = Router();

authRoute.post("/login", authorisation, Login);
// authRoute.post("/logout", Logout);
// authRoute.get("/profile", authorisation, (req, res) => {
//     res.status(200).json({
//         message: "profile page"
//     })
// })

export default authRoute;
