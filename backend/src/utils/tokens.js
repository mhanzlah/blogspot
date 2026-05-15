import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export function createAccessToken(payload) {
    return jwt.sign(payload, config.ACCESS_SECRET, {
        expiresIn: config.ACCESS_EXPIRES_IN
    });
}

export function createRefreshToken(payload) {
    return jwt.sign(payload, config.REFRESH_SECRET, {
        expiresIn: config.REFRESH_EXPIRES_IN
    });
}

export const REFRESH_TOKEN_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
};
