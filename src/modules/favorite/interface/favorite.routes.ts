import express from "express";
import { toggleFavorite, getFavorites, checkFavorite } from "./favorite.controller";

const router = express.Router();

router.post("/", toggleFavorite);
router.get("/", getFavorites);
router.get("/check", checkFavorite);

export default router;