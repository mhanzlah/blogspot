import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import config from "../config/config.js";

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "blog-covers",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 1280, height: 720, crop: "fill" }],
    },
});

const upload = multer({ storage });

export default upload;
