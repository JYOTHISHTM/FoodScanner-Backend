import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/user";
import axios from "axios";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const getProductByBarcode = async (req: Request, res: Response) => {
  try {
    const { barcode } = req.params;

    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    const product = response.data.product;

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract needed data
    const data = {
      name: product.product_name,
      ingredients: product.ingredients_text,
      nutrition: product.nutriments,
      additives: product.additives_tags,

      sugar: product.nutriments?.sugars,
      fat: product.nutriments?.fat,
      protein: product.nutriments?.proteins,
      calories: product.nutriments?.["energy-kcal"],

      nova: product.nutriments?.["nova-group"],
      image: product.image_url,

      // ✅ optional fields
      quantity: product.quantity,
      category: product.categories,
      brand: product.brands,
      packaging: product.packaging,

      // derived
      palmOil: product.ingredients_text?.toLowerCase().includes("palm"),
      veg:
        product.ingredients_analysis_tags?.includes("en:vegan") ||
        product.ingredients_analysis_tags?.includes("en:vegetarian"),
    };

    // simple score logic
    const score = calculateScore(data);
const insights = getHealthInsights(data);

    res.json({ data, score,insights });

  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

const getHealthInsights = (data: any) => {
  const insights: string[] = [];

  if (data.sugar > 25) insights.push("Not suitable for diabetics ⚠️");
  if (data.calories > 400) insights.push("May cause weight gain ⚠️");
  if (data.fat > 20) insights.push("High fat content ⚠️");
  if (data.nova === 4) insights.push("Highly processed food ❌");

  return insights;
};

const calculateScore = (data: any) => {
  let score = 100;

  if (data.sugar > 10) score -= 20;
  if (data.fat > 10) score -= 15;
  if (data.additives?.length > 3) score -= 25;

  return score;
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const { email, name } = payload;

    // Check user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    // Create JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Google login failed" });
  }
};
