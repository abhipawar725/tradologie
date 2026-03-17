import {Router} from "express"
import { Create, Fetch, Update, Delete, FetchById } from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js";

const productRouter = Router()

productRouter.get("/", Fetch)
productRouter.get("/:id", FetchById)
productRouter.post("/", upload.single('image'), Create)
productRouter.put("/:id",upload.single('image'), Update)
productRouter.delete("/:id", Delete)

export default productRouter