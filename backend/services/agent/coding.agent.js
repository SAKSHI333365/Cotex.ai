export const codingAgent = async (state = {}) => ({
    ...state,
    agent: "coding",
    aiResponse: state.aiResponse ?? "Coding agent handled the request.",
});

export default codingAgent;
