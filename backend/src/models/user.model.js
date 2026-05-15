import mongoose from "mongoose";
import PasswordHasher from "../utils/PasswordHasher.js";

export const ROLES = Object.freeze({
    USER: "user",
    AUTHOR: "author",
});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [30, "Username cannot exceed 30 characters"],
            match: [
                /^[a-zA-Z][a-zA-Z0-9_]{2,29}$/,
                "Username is invalid",
            ],
        },

        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Email address is invalid",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },

        role: {
            type: String,
            enum: {
                values: Object.values(ROLES),
                message: "{VALUE} is not a valid role",
            },
            default: ROLES.USER,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await PasswordHasher.hash(this.password);

});

const userModel = mongoose.model("User", userSchema);

export default userModel;
