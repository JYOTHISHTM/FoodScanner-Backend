import { Request, Response } from "express";
import { getProductByBarcodeService } from "../application/product.service";

export const getProductByBarcodeController = async (
    req: Request,
    res: Response
) => {
    try {
        const { productId } = req.params as { productId: string };
        const { userId } = req.query as { userId: string };
        
        const result = await getProductByBarcodeService(productId,userId);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
};