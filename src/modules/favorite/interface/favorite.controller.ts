import { Request, Response } from "express";
import { FavoriteService } from "../application/favorite.service";

const service = new FavoriteService();

export const toggleFavorite = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const result = await service.toggle(userId, productId);
  res.json(result);
};

export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const page = Number(req.query.page) || 1;
  const sort = (req.query.sort as string) || "";
  const search = (req.query.search as string) || "";

  const data = await service.getFavorites(userId, page, sort, search);
  res.json(data);
};

export const checkFavorite = async (req: Request, res: Response) => {
  const { userId, productId } = req.query;
  const data = await service.check(userId as string, productId as string);
  res.json(data);
};