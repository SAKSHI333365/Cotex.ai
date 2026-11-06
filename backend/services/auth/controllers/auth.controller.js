import { randomUUID } from "node:crypto";
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import { createConnection } from "../../../shared/redis/redis.js";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export const login = async (req, res) => {
    const { token } = req.body ?? {};

    if (typeof token !== "string" || token.length === 0) {
        return res.status(400).json({ message: "A Firebase ID token is required" });
    }

    try {
        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({ firebaseUid: decoded.uid });

        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            });
        }

        const sessionId = randomUUID();
        await createConnection().set(
            `session:${sessionId}`,
            JSON.stringify({
                userId: user._id.toString(),
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }),
            "EX",
            SESSION_TTL_SECONDS
        );

        const secureCookie = process.env.NODE_ENV === "production";
        res.cookie("session", sessionId, {
            secure: secureCookie,
            httpOnly: true,
            sameSite: secureCookie ? "none" : "lax",
            maxAge: SESSION_TTL_SECONDS * 1000
        });

        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        if (error?.code?.startsWith("auth/")) {
            return res.status(401).json({ message: "Invalid or expired Firebase ID token" });
        }

        console.error("Login failed:", error.message);
        return res.status(503).json({ message: "Login service is temporarily unavailable" });
    }
};
