import express from "express";
import { getProductByBarcodeController } from "./product.controller";

const router = express.Router();

router.get("/:barcode", getProductByBarcodeController);

export default router;