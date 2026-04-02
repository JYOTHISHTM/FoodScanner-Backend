import express from "express";
import { googleLogin,getProductByBarcode } from "../controllers/authController";

const router = express.Router();

router.post("/google", googleLogin);


//dashboard route :create seperate router file later



export default router;