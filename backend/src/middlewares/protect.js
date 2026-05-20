import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/config.js";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized - no token found" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decoded.id).select("-password -refreshToken");
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - user not found" })
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
