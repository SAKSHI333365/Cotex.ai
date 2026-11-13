import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "node:url";
import { getCurrentUser } from "./controller/user.controller.js";
import protect from "./middleware/auth.middleware.js";
import proxyWithHeader from "./utils/proxyWithHeader.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const port = process.env.PORT || 8000;
const authServiceUrl = process.env.AUTH_SERVICE_URL;
const chatServiceUrl = process.env.CHAT_SERVICE_URL || process.env.CHAT_SERVICES;

if (!authServiceUrl) {
    throw new Error("AUTH_SERVICE_URL is not set");
}
if (!chatServiceUrl) {
    throw new Error("CHAT_SERVICE_URL is not set");
}

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());

app.use("/auth", proxy(authServiceUrl));
app.use("/chat", protect, proxyWithHeader(chatServiceUrl));
app.get("/me", protect, getCurrentUser);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});