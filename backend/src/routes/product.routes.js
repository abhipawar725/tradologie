import {Router} from "express"
import { Create, Fetch, Update, Delete } from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js";

const productRouter = Router()

productRouter.get("/", Fetch)
productRouter.post("/", upload.array('image', 5), Create)
productRouter.put("/:id",upload.array('image', 5), Update)
productRouter.delete("/:id", Delete)

export default productRouter