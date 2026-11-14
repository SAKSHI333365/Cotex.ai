import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import connectDB from "./config/db.js";
import { runAgent } from "./controllers/agent.controller.js";


dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const port = process.env.PORT || 8002;
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello chat");
});
app.post("/run", runAgent);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Chat service is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start chat service:", error.message);
        process.exit(1);
    }
};

startServer();
