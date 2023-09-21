const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, isAgent, tag, isAssigned } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
    isAgent,
    tag,
    isAssigned,
  });
  if (!user.isAgent) {
    User.findOne({ isAgent: true, $sample: { size: 1 } }).then((agent) => {
      if (agent._id) {
        var data = {
          chatName: "sender",
          users: [user._id, agent._id],
        };
        Chat.findOne({ users: [user._id, agent._id] }, (err, chat) => {
          if (!chat) {
            Chat.create(data).then((chat) => {
              var newMessage = {
                sender: user._id,
                content: "Hey,",
                chat: chat._id,
              };
              Message.create(newMessage);
              Chat.findByIdAndUpdate(chat._id, {
                latestMessage: newMessage,
              });
            });
            return;
          } else {
            var newMessage = {
              sender: user._id,
              content: "Hello!",
              chat: chat._id,
            };
            Message.create(newMessage);
          }
        });
      }
    });
  }
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      tag: user.tag,
      token: generateToken(user._id),
      isAgent: user.isAgent,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      tag: user.tag,
      isAgent: user.isAgent,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  if (req.query.search === "") {
    const users = await User.find({ isAgent: false });
    res.send(users);
    return;
  } else {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
            { tag: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // find users with isAgent: false and _id not equal to the logged in user
    const users = await User.find({
      ...keyword,
      isAgent: false,
      isAssigned: false,
    });
    res.send(users);
  }
});

module.exports = { registerUser, authUser, allUsers };
