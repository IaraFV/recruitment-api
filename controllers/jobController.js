const JobApplication = require("../models/jobApplication");
const { getJobs } = require("../services/jobServices");

async function fetchJobs(req, res) {
  return getJobs(req, res);
}

async function applyJob(req, res) {
  try {
    const { jobTitle, company, jobUrl } = req.body;
    const application = new JobApplication({
      userId: req.user.id,
      jobTitle,
      company,
      jobUrl,
    });
    await application.save();
    res.json({ message: "Candidatura salva", jobUrl });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar candidatura" });
  }
}

async function getApplications(req, res) {
  const applications = await JobApplication.find({ userId: req.user.id });
  res.json(applications);
}

module.exports = { fetchJobs, applyJob, getApplications };
