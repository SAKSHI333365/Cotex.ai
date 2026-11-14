import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const createGroqModel = () => {
    if (!process.env.GROQ_API_KEY) {
        return null;
    }

    return new ChatGroq({
        model: "openai/gpt-oss-120b",
        temperature: 0,
        maxRetries: 2,
    });
};

const createGeminiModel = () => {
    if (!process.env.GOOGLE_API_KEY) {
        return null;
    }

    return new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        temperature: 0,
    });
};

export const getModel = (agent = "router") => {
    const key = String(agent ?? "router").toLowerCase();

    if (["chat", "search", "coding", "pdf", "ppt", "vision"].includes(key)) {
        return createGeminiModel();
    }

    return createGroqModel();
};

export default getModel;