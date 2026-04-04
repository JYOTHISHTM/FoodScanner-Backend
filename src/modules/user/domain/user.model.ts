
export interface IUser {
  _id?: string;
  name: string;
  email: string;

  age?: number;
  gender?: "male" | "female" | "other";
  weight?: number;
  height?: number;

  allergies?: string[];

  createdAt?: Date;
}

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    age: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    weight: Number,
    height: Number,

    allergies: [String],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);