export const pdfAgent = async (state = {}) => ({
    ...state,
    agent: "pdf",
    aiResponse: state.aiResponse ?? "PDF agent handled the request.",
});

export default pdfAgent;
