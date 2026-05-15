import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import config from '../config/config.js';
import ApiError from "../utils/ApiError.js";
import { createAccessToken, createRefreshToken, REFRESH_TOKEN_OPTIONS } from "../utils/tokens.js";
import sessionModel from "../models/session.model.js";
import bcrypt from 'bcrypt';
import hash from "../utils/hash.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    const existedUser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (existedUser) {
        throw new ApiError(409, 'User with this username or email already exists');
    }

    const user = await userModel.create({ username, email, password });

    const refreshToken = createRefreshToken({ userId: user._id });
    const refreshTokenHash = hash(refreshToken);

    const session = await sessionModel.create({
        user: user._id, refreshTokenHash, ip: req.ip, userAgent: req.headers["user-agent"]
    });

    const accessToken = createAccessToken({ userId: user._id, sessionId: session._id });

    res.cookie('refreshToken', refreshToken, REFRESH_TOKEN_OPTIONS);

    return ApiResponse.success(res, {
        accessToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    }, 'User registered successfully', 201);
}

export async function login(req, res) {
    const { usernameOrEmail, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new ApiError(401, "Invalid credentials");
    }

    const refreshToken = createRefreshToken({ userId: user._id });
    const refreshTokenHash = hash(refreshToken);

    const session = await sessionModel.create({ user: user._id, refreshTokenHash, ip: req.ip, userAgent: req.headers['user-agent'] });

    const accessToken = createAccessToken({ userId: user._id, sessionId: session._id });

    res.cookie('refreshToken', refreshToken, REFRESH_TOKEN_OPTIONS);

    return ApiResponse.success(res, {
        accessToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    }, "User logged in successfully");
}

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        const refreshTokenHash = hash(refreshToken);

        const session = await sessionModel.findOne({
            refreshTokenHash, isRevoked: false
        });

        if (session) {
            session.isRevoked = true;
            await session.save();
        }
        res.clearCookie('refreshToken', REFRESH_TOKEN_OPTIONS);
    }

    return ApiResponse.success(res, null, 'User logged out successfully');
}

export async function me(req, res) {
    return ApiResponse.success(res, { user: req.user }, 'User fetched successfully')
}

export async function refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new ApiError(401, 'Refresh token not found');
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token");
    }

    const refreshTokenHash = hash(refreshToken);

    const session = await sessionModel.findOne({ user: decode.userId, refreshTokenHash, isRevoked: false });

    if (!session) {
        throw new ApiError(401, 'Invalid refresh token');
    }

    session.isRevoked = true;
    await session.save();

    const user = await userModel.findById(decoded.userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const newRefreshToken = createRefreshToken({ userId: user._id });

    const newRefreshTokenHash = hash(newRefreshToken);

    const newSession = await sessionModel.create({ user: user._id, refreshTokenHash: newRefreshTokenHash, ip: req.ip, userAgent: req.headers['user-agent'] });

    const accessToken = createAccessToken({ userId: user._id, sessionId: newSession._id });

    res.cookie('refreshToken', newRefreshToken, REFRESH_TOKEN_OPTIONS);

    return ApiResponse.success(res, { accessToken }, 'Access token refreshed successfully');
}

