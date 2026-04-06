// interface/scan.controller.ts
import { Request, Response } from "express";
import { HistoryService } from "../application/history.service";

const service = new HistoryService();

export const getHistory = async (req: Request, res: Response) => {
  try {
     const { userId } = req.query as { userId: string };
    const result = await service.getHistory(userId, req.query);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Error fetching scans" });
  }
};