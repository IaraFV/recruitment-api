const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { MONGO_URI } = require("./config");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", routes);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
