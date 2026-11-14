export const pptAgent = async (state = {}) => ({
    ...state,
    agent: "ppt",
    aiResponse: state.aiResponse ?? "PPT agent handled the request.",
});

export default pptAgent;
