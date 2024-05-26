const asyncHandler = require("express-async-handler");
const chat = require("../Model/chatSchema");
const user = require("../Model/userSchema");
const message = require("../Model/messageSchema");
const chatService = require("../Services/chatServices");

const accessChat = asyncHandler(async (req, res) => {
  const { userId, isGroupChat } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("Id not present");
  }

  let response;
  if (isGroupChat) {
    response = await chatService.groupChatAccess(req);
  } else response = await chatService.privateChatAcces(req);
  res.status(200).json(response);
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.body;

  const message = message.find({ _id: messageId });
  if (message.length == 0) {
    res.status(400);
    throw new Error("Message not found");
  } else {
    const newData = message.findByIdAndUpdate(
      messageId,
      {
        $push: { deletedBy: req.user },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: true,
      data: newData,
    });
  }
});

const forwardMessage = asyncHandler(async (req, res) => {
  const { messageId, chatId } = req.body;

  const message = message.find({ _id: messageId });

  if (message.length > 0) {
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
      forward:true
    };

  } else {
    res.status(400);
    throw new Error("Message not found");
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    chat
      .find({ Users: { $elemMatch: { $eq: req.user._id } } })
      .populate("Users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await user.populate(results, {
          path: "latestMessage.sender",
          select: "name profilePicture email",
        });
        res.status(200).json({
          status: true,
          data: results,
        });
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  var users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await chat.create({
      chatName: req.body.name,
      Users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await chat
      .findOne({ _id: groupChat._id })
      .populate("Users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({ data: fullGroupChat, status: true });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await chat
    .findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await chat
    .findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  // check if the requester is admin

  const added = await chat
    .findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  renameGroup,
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  deleteMessage,
  forwardMessage
};
