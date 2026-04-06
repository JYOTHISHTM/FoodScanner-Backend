import { FavoriteRepository } from "../infrastructure/favorite.repository";
import { HistoryModel } from "../../history/domain/history.model";

const repo = new FavoriteRepository();

export class FavoriteService {
  async toggle(userId: string, productId: string) {
    const exists = await repo.find(userId, productId);

    if (exists) {
      await repo.remove(userId, productId);
      return { message: "removed" };
    } else {
      await repo.add(userId, productId);
      return { message: "added" };
    }
  }

  async getFavorites(userId: string, page: number, sort: string, search: string) {
    let sortOption: any = { createdAt: -1 };

    if (sort === "az") sortOption = { productId: 1 };
    if (sort === "za") sortOption = { productId: -1 };

    const result = await repo.getAll(userId, page, 6, sortOption, search);

    // ✅ Get product details from History instead of external API
    const favoritesWithDetails = await Promise.all(
      result.favorites.map(async (fav: any) => {
        const historyItem = await HistoryModel.findOne({ userId, productId: fav.productId });

        return {
          ...fav.toObject(),
          name: historyItem?.name || 'Unknown Product',
          image: historyItem?.image || '',
          brand: historyItem?.brand || '',
        };
      })
    );

    return {
      ...result,
      favorites: favoritesWithDetails,
    };
  }

  async check(userId: string, productId: string) {
    const exists = await repo.find(userId, productId);
    return { isFavorite: !!exists };
  }
}