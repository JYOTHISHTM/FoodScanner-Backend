// modules/scan/interface/scan.routes.ts
import express from "express";
import { scanProduct } from "./scan.controller";

const router = express.Router();

router.post("/", scanProduct);

export default router;