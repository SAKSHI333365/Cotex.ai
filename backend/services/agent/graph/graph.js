import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../chat.agent.js";
import { searchAgent } from "../search.agent.js";
import { codingAgent } from "../coding.agent.js";
import { pdfAgent } from "../pdf.agent.js";
import { pptAgent } from "../ppt.agent.js";
import { visionAgent } from "../vision.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);
workflow.addNode("chat", chatAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("vision", visionAgent);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges("router", (state) => {
    switch (state?.agent) {
        case "chat":
            return "chat";
        case "search":
            return "search";
        case "coding":
            return "coding";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        case "vision":
            return "vision";
        default:
            return "chat";
    }
}, {
    chat: "chat",
    search: "search",
    pdf: "pdf",
    vision: "vision",
    ppt: "ppt",
    coding: "coding",
});

workflow.addEdge("chat", "__end__");
workflow.addEdge("search", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("vision", "__end__");

export const graph = workflow.compile();
export default graph;
