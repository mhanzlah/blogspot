import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import config from '../config/config.js';

export default async function guestMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next();
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, config.ACCESS_SECRET);
        return next(new ApiError(403, "You are already authenticated"));
    } catch {
        next();
    }
}
