


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../modules/user/domain/user.model";

export const authMiddleware = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("AUTH HEADER 👉", req.headers.authorization);

        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        // 🔍 get user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // 🚨 BLOCK CHECK
        if (user.isBlocked) {
            return res.status(403).json({
                message: "Your account has been blocked by admin",
            });
        }

        req.user = user; // attach user
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};