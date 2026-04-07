import express from "express";
import { googleLoginController } from "./auth.controller";
import {
  sendOtpController,
  verifyOtpController,
} from "./auth.controller";

const router = express.Router();

router.post("/google", googleLoginController);



router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);


export default router;