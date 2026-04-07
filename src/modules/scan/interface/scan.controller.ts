// modules/scan/interface/scan.controller.ts
import { Request, Response } from "express";
import { ScanService } from "../application/scan.service";

const service = new ScanService();

export const scanProduct = async (req: Request, res: Response) => {
  try {
    const { barcode } = req.body;
    const { userId } = req.body;

    if (!barcode) {
      return res.status(400).json({ message: "Barcode required" });
    }

    const result = await service.scan(barcode, userId);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Scan failed" });
  }
};