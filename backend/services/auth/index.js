import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
import { fileURLToPath } from "node:url";
import { createConnection } from "../../shared/redis/redis.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const port = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
    res.send("Hello auth");
});

const startServer = async () => {
    try {
        await createConnection().ping();
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to start auth service:", err.message);
        process.exit(1);
    }
};

startServer();