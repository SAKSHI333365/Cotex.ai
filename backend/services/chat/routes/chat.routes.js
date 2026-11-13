import express from "express";
import {
    createConversation,
    getConversations,
    getMessages,
    saveMessage,
    updateConversation
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/conversations", createConversation);
router.get("/conversations", getConversations);
router.patch("/conversations/:conversationId", updateConversation);
router.get("/conversations/:conversationId/messages", getMessages);
router.post("/conversations/:conversationId/messages", saveMessage);

export default router;
