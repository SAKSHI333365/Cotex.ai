import { graph } from "../graph/graph.js";

export const runAgent = async (req, res) => {
    const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
    if (!prompt) {
        return res.status(400).json({ message: "A non-empty prompt is required" });
    }

    try {
        const result = await graph.invoke({ prompt });
        return res.status(200).json({
            agent: result.agent,
            aiResponse: result.aiResponse,
        });
    } catch (error) {
        console.error("Agent execution failed:", error.message);
        return res.status(500).json({ message: "Unable to process agent request" });
    }
};

export default runAgent;