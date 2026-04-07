import { OAuth2Client } from "google-auth-library";
import User from "../../user/domain/user.model";
import Otp from "./otp.model";
import nodemailer from "nodemailer";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 🔹 verify google token
export const verifyGoogleToken = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  return ticket.getPayload();
};

// 🔹 find or create user
export const findOrCreateUser = async (email: string, name: string) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ name, email });
  }

  return user;
};


export const generateOtp = () =>
  Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

// save OTP
export const saveOtp = async (email: string, otp: string) => {
  await Otp.deleteMany({ email }); // remove old OTP

  await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });
};

// verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  const record = await Otp.findOne({ email, otp });

  if (!record) return false;
  if (record.expiresAt < new Date()) return false;

  await Otp.deleteMany({ email }); // cleanup
  return true;
};


export const sendEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"FoodScanner" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code - FoodScanner",
    html: `
      <h2>Your OTP is: <strong>${otp}</strong></h2>
      <p>This OTP will expire in 5 minutes.</p>
    `,
  });
};