import axios from "axios";

export const fetchProductFromAPI = async (productId: string) => {
  const response = await axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${productId}.json`
  );

  

  return response.data.product;
};