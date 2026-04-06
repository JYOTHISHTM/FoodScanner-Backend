import { fetchProductFromAPI } from "../infrastructure/product.repository";
import { HistoryService } from "../../history/application/history.service";

export const getProductByBarcodeService = async (productId: string, userId: string) => {
  const product = await fetchProductFromAPI(productId);
  const historyService = new HistoryService();

  if (!product) {
    throw new Error("Product not found");
  }

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

    quantity: product.quantity,
    category: product.categories,
    brand: product.brands,
    packaging: product.packaging,

    palmOil: product.ingredients_text?.toLowerCase().includes("palm"),
    veg:
      product.ingredients_analysis_tags?.includes("en:vegan") ||
      product.ingredients_analysis_tags?.includes("en:vegetarian"),
  };

  const score = calculateScore(data);
  const insights = getHealthInsights(data);

  await historyService.saveScan({
    userId: userId,
    name: data.name,
    brand: data.brand,
    image: data.image,
    score: score,
    productId: productId,
    productData: data
  });

  return { data, score, insights };
};

// 🔹 helpers
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