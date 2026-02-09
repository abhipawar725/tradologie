import { Router } from "express";
import { Create, Delete, Fetch, Update } from "../controllers/user.controller.js";

const userRoutes = Router()

userRoutes.get("/", Fetch)
userRoutes.post("/", Create)
userRoutes.put("/:id", Update)
userRoutes.delete("/:id", Delete)

export default userRoutes