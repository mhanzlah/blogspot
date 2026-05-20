import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const guestOnly = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next();
        }

        const token = authHeader.split(" ")[1];
        jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        return res.status(403).json({ message: "You are already logged in" });

    } catch {
        next();
    }
}

