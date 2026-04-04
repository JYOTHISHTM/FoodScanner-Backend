// routes/scanRoutes.ts
import express from "express";
import { getScans } from "../interface/scan.controller";

const router = express.Router();

router.get("/", getScans);

export default router;