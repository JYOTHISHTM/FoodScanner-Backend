import mongoose, { Document, Schema } from "mongoose";

interface INutrition {
  calories: number;
  sugar: number;
  fat: number;
  protein: number;
}

export interface IProduct extends Document {
  name: string;
  brand: string;
  ingredients: string[];
  nutrition: INutrition;
  isHealthy: boolean;
}

const nutritionSchema = new Schema<INutrition>({
  calories: Number,
  sugar: Number,
  fat: Number,
  protein: Number,
});

const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String },
    ingredients: [{ type: String }],
    nutrition: nutritionSchema,
    isHealthy: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);