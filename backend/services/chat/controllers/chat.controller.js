import { Types } from "mongoose";
import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

const getUserId = (req) => req.headers["x-user-id"];

const isValidId = (id) => Types.ObjectId.isValid(id);

export const createConversation = async (req, res) => {
    const userId = getUserId(req);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const conversation = await Conversation.create({ userId });
        return res.status(201).json(conversation);
    } catch (error) {
        console.error("Create conversation failed:", error.message);
        return res.status(500).json({ message: "Unable to create conversation" });
    }
};

export const getConversations = async (req, res) => {
    const userId = getUserId(req);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const conversations = await Conversation.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(conversations);
    } catch (error) {
        console.error("Get conversations failed:", error.message);
        return res.status(500).json({ message: "Unable to retrieve conversations" });
    }
};

export const getMessages = async (req, res) => {
    const userId = getUserId(req);
    const { conversationId } = req.params;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!isValidId(conversationId)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
    }

    try {
        const conversation = await Conversation.findOne({ _id: conversationId, userId });
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
        return res.status(200).json(messages);
    } catch (error) {
        console.error("Get messages failed:", error.message);
        return res.status(500).json({ message: "Unable to retrieve messages" });
    }
};

export const updateConversation = async (req, res) => {
    const userId = getUserId(req);
    const { conversationId } = req.params;
    const { title } = req.body ?? {};
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!isValidId(conversationId)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
    }
    if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({ message: "A non-empty title is required" });
    }

    try {
        const conversation = await Conversation.findOneAndUpdate(
            { _id: conversationId, userId },
            { title: title.trim() },
            { new: true, runValidators: true }
        );
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        return res.status(200).json(conversation);
    } catch (error) {
        console.error("Update conversation failed:", error.message);
        return res.status(500).json({ message: "Unable to update conversation" });
    }
};

export const saveMessage = async (req, res) => {
    const userId = getUserId(req);
    const { conversationId } = req.params;
    const { role, content } = req.body ?? {};
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!isValidId(conversationId)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
    }
    if (!["user", "assistant"].includes(role) || typeof content !== "string" || !content.trim()) {
        return res.status(400).json({ message: "A valid role and non-empty message are required" });
    }

    try {
        const conversation = await Conversation.findOne({ _id: conversationId, userId });
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const message = await Message.create({
            conversationId,
            content: content.trim(),
            role
        });
        return res.status(201).json(message);
    } catch (error) {
        console.error("Save message failed:", error.message);
        return res.status(500).json({ message: "Unable to save message" });
    }
};
