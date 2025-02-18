const { getJobs } = require("../services/jobServices");

async function fetchJobs(req, res) {
  return getJobs(req, res);
}

module.exports = { fetchJobs };
