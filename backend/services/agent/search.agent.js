export const searchAgent = async (state = {}) => ({
    ...state,
    agent: "search",
    aiResponse: state.aiResponse ?? "Search agent handled the request.",
});

export default searchAgent;
