const express = require("express");
const router = express.Router();
const { accessChat, fetchChats, createGroupChat } = require("../Controller/chatController");
const { sendMessage } = require("../Controller/messageController");
const { protect } = require("../Middleware/AuthMiddleware");

router.post("/accessChat", protect, accessChat);
router.get("/fetchChats", protect, fetchChats);
router.post("/sendMessage", protect, sendMessage);
router.post("/createGroupChat", protect, createGroupChat)

module.exports = router 
