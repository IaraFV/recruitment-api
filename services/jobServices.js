const axios = require("axios");

exports.getJobs = async (req, res) => {
  try {
    const query = req.query.query || "developer";
    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${query}&page=1&num_pages=1&country=us&date_posted=all`;

    const options = {
      method: "GET",
      url: apiUrl,
      headers: {
        "x-rapidapi-key": process.env.JOB_API_KEY,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    res.json(response.data);
  } catch (error) {
    console.error(
      "❌ Erro ao buscar vagas:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Erro ao buscar vagas de emprego" });
  }
};
