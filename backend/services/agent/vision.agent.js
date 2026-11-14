export const visionAgent = async (state = {}) => ({
    ...state,
    agent: "vision",
    aiResponse: state.aiResponse ?? "Vision agent handled the request.",
});

export default visionAgent;
