import { Router } from "express";
import { validateProduct } from "../middlewares/productValidation.js";
import * as productController from "../controllers/productController.js";

const router = Router();

// Routes: declare URLs and attach middlewares/controllers
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", validateProduct, productController.createProduct);
router.put("/:id", validateProduct, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;


