import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../infrastructure/auth.repository";
import { findOrCreateUser } from "../infrastructure/auth.repository";

import {
  generateOtp,
  saveOtp,
  verifyOtp,
  sendEmail,
} from "../infrastructure/auth.repository";

import User from "../../user/domain/user.model";




export const googleLoginService = async (token: string) => {
  const payload = await verifyGoogleToken(token);


  if (!payload || !payload.email || !payload.name) {
    throw new Error("Invalid token: Missing profile information");
  }


  const { email, name } = payload;

  const user = await findOrCreateUser(email, name);

  const jwtToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    token: jwtToken,
    user,
  };
};



// SEND OTP
export const sendOtpService = async (email: string) => {
  const otp = generateOtp();

  await saveOtp(email, otp);
  await sendEmail(email, otp);

  return { message: "OTP sent to email" };
};

// VERIFY OTP
export const verifyOtpService = async (email: string, otp: string) => {
  const isValid = await verifyOtp(email, otp);
  if (!isValid) throw new Error("Invalid or expired OTP");

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ 
      email, 
      name: email.split('@')[0]   // better default name
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};