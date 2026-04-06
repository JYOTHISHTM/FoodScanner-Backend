import express from "express";
import { getProductByBarcodeController } from "./product.controller";

const router = express.Router();

router.get("/:productId", getProductByBarcodeController);

export default router;