const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  renameGroup,
} = require("../Controller/chatController");
const { sendMessage } = require("../Controller/messageController");
const { protect } = require("../Middleware/AuthMiddleware");

router.post("/accessChat", protect, accessChat);
router.get("/fetchChats", protect, fetchChats);
router.post("/sendMessage", protect, sendMessage);
router.post("/createGroupChat", protect, createGroupChat);
router.post("/addToGroup", protect, addToGroup);
router.post("/removeFromGroup", protect, removeFromGroup);
router.post("/renameGroup", protect, renameGroup);

module.exports = router;
