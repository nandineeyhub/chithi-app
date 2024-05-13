const asyncHandler = require("express-async-handler");
const chat = require("../Model/chatSchema");
const user = require("../Model/userSchema");
const message = require("../Model/messageSchema");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("userId not present");
  }

  var isChat = await chat
    .find({
      isGroupChat: false,
      $and: [
        { Users: { $elemMatch: { $eq: userId } } },
        { Users: { $elemMatch: { $eq: req.user._id } } },
      ],
    })
    .select("-latestMessage")
    .populate("Users", "-password");

  if (isChat.length > 0) {
    const messageList = await message.find({
      chat: isChat[0]?._id,
    }).select("-_id -__v -updatedAt -chat").populate("sender", "-password  -email -__v -updatedAt");
    res.json({
      status: true,
      data: {
        messages: messageList,
        chatDetails: isChat[0],
      },
    });
  } else {
    var chatData = {
      chatName: "private",
      isGroupChat: false,
      Users: [req.user._id, userId],
    };

    try {
      const createdChat = await chat.create(chatData);
      const FullChat = await chat
        .findOne({ _id: createdChat._id })
        .populate("Users", "-password");
      res.status(200).json({
        status: true,
        data: FullChat,
      });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
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
          status:true,
          data:results
        });
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = req.body.users

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

    res.status(200).json(fullGroupChat);
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
};
