import {Router} from "express"
import { Create, Fetch, Update, Delete } from "../controllers/category.controller.js";
import upload from "../middlewares/upload.middleware.js";

const categoryRouter = Router()

categoryRouter.get("/", Fetch)
categoryRouter.post("/", upload.single('image'), Create)
categoryRouter.put("/:id",upload.single('image'), Update)
categoryRouter.delete("/:id", Delete)

export default categoryRouter