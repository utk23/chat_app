const express = require("express");
const { accessChat, fetchChats } = require("../controllers/chatControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);

module.exports = router;
