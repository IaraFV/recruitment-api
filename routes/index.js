const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const jobRoutes = require("./jobRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/jobs", jobRoutes);

module.exports = router;
