import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/config.js";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"]
    },
    refreshTokenHash: {
        type: String,
        required: [true, "Refresh token is required"]
    },
    ip: {
        type: String,
        required: [true, "IP address is required"]
    },
    userAgent: {
        type: String,
        required: [true, "User agent is required"],
    },
    isRevoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const sessionModel = mongoose.model("session", sessionSchema);

export default sessionModel;
