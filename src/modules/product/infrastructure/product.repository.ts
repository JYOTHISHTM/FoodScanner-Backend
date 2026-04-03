import axios from "axios";

export const fetchProductFromAPI = async (barcode: string) => {
  const response = await axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );

  return response.data.product;
};