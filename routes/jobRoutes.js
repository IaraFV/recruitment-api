const express = require("express");
const {
  fetchJobs,
  applyJob,
  getApplications,
} = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", fetchJobs);

router.post("/apply", authMiddleware, applyJob);
router.get("/applications", authMiddleware, getApplications);

module.exports = router;
