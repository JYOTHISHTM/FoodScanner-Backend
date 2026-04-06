import { Router } from "express";

import authRoutes from "../modules/auth/interface/auth.routes";
import productRoutes from "../modules/product/interface/product.routes";
import userProfile from "../modules/user/interface/user.routes"
import historyRoutes from "../modules/history/interface/history.routes";
import favoriteRoutes from "../modules/favorite/interface/favorite.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/profile",userProfile)
router.use("/history", historyRoutes);
router.use("/favorites", favoriteRoutes);


export default router;