import express from "express";
import { updateProfile } from "../interface/user.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";


const router = express.Router();

router.put("/:id",authMiddleware, updateProfile);

export default router;