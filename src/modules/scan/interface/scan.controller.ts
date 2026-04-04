// interface/scan.controller.ts
import { Request, Response } from "express";
import { ScanService } from "../application/scan.service";

const service = new ScanService();

export const getScans = async (req: Request, res: Response) => {
  try {
    const userId = "demoUser"; // replace with auth later
    const result = await service.getScans(userId, req.query);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Error fetching scans" });
  }
};