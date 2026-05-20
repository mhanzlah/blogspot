import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_OPTIONS, sendRefreshTokenCookie } from "../utils/tokens.js";
import config from "../config/config.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already taken" });
        }

        const user = await User.create({ username, email, password });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        sendRefreshTokenCookie(res, refreshToken);

        return res.status(201).json({
            accessToken, user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            $or: [
                { username },
                { email: username },
            ]
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        sendRefreshTokenCookie(res, refreshToken);

        return res.json({
            accessToken, user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - no token" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
        } catch (error) {
            return res.status(403).json({ message: "Forbidden - Invalid refresh token" });
        }

        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: "Forbidden - User not found" });
        }

        const newAccessToken = generateAccessToken(user._id);

        return res.json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            await User.findOneAndUpdate(
                { refreshToken: token },
                { refreshToken: null }
            );
        }

        res.clearCookie("refreshToken", REFRESH_TOKEN_OPTIONS);

        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const me = async (req, res) => {
    return res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
    });
};
