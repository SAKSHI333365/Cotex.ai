import { getModel } from "../config/llmModels.js";

const VALID_AGENTS = ["chat", "search", "coding", "pdf", "ppt", "vision"];

export const router = async (state = {}) => {
    const promptText = typeof state?.prompt === "string" ? state.prompt.trim() : "";
    const llm = getModel("router");

    const prompt = [
        "You are the routing agent for a multi-agent AI platform.",
        "Select the single best agent for the user request.",
        `Available agents: ${VALID_AGENTS.join(", ")}.`,
        "Return only one agent name and nothing else.",
        `User request: ${promptText || "General assistance"}`,
    ].join("\n");

    if (!promptText) {
        return {
            ...state,
            agent: "chat",
            aiResponse: "No prompt was provided. Falling back to the chat agent.",
            prompt: "",
        };
    }

    if (!llm) {
        return {
            ...state,
            agent: "chat",
            aiResponse: "No LLM API key configured. Falling back to chat routing.",
            prompt: promptText,
        };
    }

    try {
        const response = await llm.invoke(prompt);
        const selectedAgent = String(response?.content ?? "")
            .trim()
            .toLowerCase()
            .replace(/[^a-z]/g, "");

        const finalAgent = VALID_AGENTS.includes(selectedAgent) ? selectedAgent : "chat";

        return {
            ...state,
            agent: finalAgent,
            aiResponse: response?.content ?? finalAgent,
            prompt: promptText,
        };
    } catch (error) {
        return {
            ...state,
            agent: "chat",
            aiResponse: error?.message || "Routing failed; defaulting to chat.",
            prompt: promptText,
        };
    }
};

export default router;