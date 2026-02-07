import {Router} from "express"
import { Create, Fetch, Update, Delete } from "../controllers/category.controller.js";

const categoryRouter = Router()

categoryRouter.get("/", Fetch)
categoryRouter.post("/", Create)
categoryRouter.put("/:id", Update)
categoryRouter.delete("/:id", Delete)

export default categoryRouter