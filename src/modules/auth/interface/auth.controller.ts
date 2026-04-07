import { Request, Response } from "express";
import { googleLoginService } from "../application/auth.service";
import { sendOtpService,verifyOtpService } from "../application/auth.service";

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const data = await googleLoginService(token);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Google login failed" });
  }
};

export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const data = await sendOtpService(email);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const data = await verifyOtpService(email, otp);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: "Invalid OTP" });
  }
};