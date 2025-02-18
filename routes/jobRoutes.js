const express = require("express");
const { fetchJobs } = require("../controllers/jobController");

const router = express.Router();

router.get("/", fetchJobs);

module.exports = router;
