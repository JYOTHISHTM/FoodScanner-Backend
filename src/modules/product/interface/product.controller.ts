import { Request, Response } from "express";
import { getProductByBarcodeService } from "../application/product.service";

export const getProductByBarcodeController = async (
    req: Request,
    res: Response
) => {
    try {
        const { barcode } = req.params as { barcode: string };

        const result = await getProductByBarcodeService(barcode);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
};