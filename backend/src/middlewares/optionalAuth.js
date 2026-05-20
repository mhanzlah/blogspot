import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/config.js";

export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next();
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decododed.id).select("-password -refreshToken");
    } catch {

    }
    next();
}
