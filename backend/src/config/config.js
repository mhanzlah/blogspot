import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || '10m',
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || '7d',
    BCRYPT_SALT: process.env.BCRYPT_SALT || 12,
};

if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables.');
}

if (!config.ACCESS_SECRET) {
    throw new Error('ACCESS_SECRET is not defined in environment variables.');
}

if (!config.REFRESH_SECRET) {
    throw new Error('REFRESH_SECRET is not defined in environment variables.');
}

export default config;
