// infra/scan.model.ts
import mongoose from "mongoose";

// domain/scan.entity.ts
export interface Scan {
  userId: string;
  name: string;
  brand?: string;
  image?: string;
  score: number;
  createdAt: Date;
}

const scanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  brand: String,
  image: String,
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

export const ScanModel = mongoose.model("Scan", scanSchema);