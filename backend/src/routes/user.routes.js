import { Router } from "express";
import { Create, Delete, Fetch, Update, GetMe } from "../controllers/user.controller.js";
import authorisation from "../middlewares/auth.middleware.js";

const userRoutes = Router()

userRoutes.get("/me", authorisation, GetMe)
userRoutes.get("/", Fetch)
userRoutes.post("/", Create)
userRoutes.put("/:id", Update)
userRoutes.delete("/:id", Delete)

export default userRoutes