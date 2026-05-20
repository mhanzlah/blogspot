import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import config from "./config/config.js";
import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: config.ALLOWED_ORIGINS,
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("Blogspot service is up and running ;)")
});

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);

export default app;
