import { FavoriteModel } from "./favorite.model";

export class FavoriteRepository {
  async add(userId: string, productId: string) {
    return await FavoriteModel.create({ userId, productId });
  }

  async remove(userId: string, productId: string) {
    return await FavoriteModel.findOneAndDelete({ userId, productId });
  }

  async find(userId: string, productId: string) {
    return await FavoriteModel.findOne({ userId, productId });
  }

  async getAll(userId: string, page: number, limit: number, sort: any, search: string) {
    const query: any = { userId };

    const favorites = await FavoriteModel.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await FavoriteModel.countDocuments(query);

    return {
      favorites,
      total,
      pages: Math.ceil(total / limit),
    };
  }
}