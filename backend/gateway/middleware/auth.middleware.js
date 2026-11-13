import { createConnection } from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session;

        if (!sessionId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const session = await createConnection().get(`session:${sessionId}`);

        if (!session) {
            return res.status(401).json({ message: "Session expired" });
        }
        req.user = JSON.parse(session);
        return next();

    } catch (error) {
        console.error("Authentication failed:", error.message);
        return res.status(500).json({ message: "Authentication failed" });
    }
};

export default protect;