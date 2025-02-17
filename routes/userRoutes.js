const express = require("express");
const {
  updateProfile,
  uploadResume,
  getUserProfile,
  getResume,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.put("/profile", authMiddleware, updateProfile);
router.post(
  "/upload-resume",
  authMiddleware,
  uploadMiddleware.single("resume"),
  uploadResume
);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/resume/:userId", authMiddleware, getResume);
module.exports = router;
