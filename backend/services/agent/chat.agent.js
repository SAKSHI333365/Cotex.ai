export const chatAgent = async (state = {}) => ({
    ...state,
    agent: "chat",
    aiResponse: state.aiResponse ?? "Chat agent handled the request.",
});

export default chatAgent;
