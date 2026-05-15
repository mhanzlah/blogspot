import config from "../config/config.js";
import sessionModel from "../models/session.model.js";
import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, config.ACCESS_SECRET);
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token")
    }

    const session = await sessionModel.findById(decoded.sessionId);

    if (!session || session.isRevoked) {
        throw new ApiError(401, "Session expired")
    }

    const user = await userModel.findById(decoded.userId).select('-password');

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    req.user = user;
    req.session = session;
    req.token = token;

    next();
}
