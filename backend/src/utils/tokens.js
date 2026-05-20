import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRE,
    });
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRE,
    });
}

export const REFRESH_TOKEN_OPTIONS = {
    httpOnly: true,
    secure: config.ENVIRONMENT == 'production',
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const sendRefreshTokenCookie = (res, token) => {
    res.cookie("refreshToken", token, REFRESH_TOKEN_OPTIONS);
}
