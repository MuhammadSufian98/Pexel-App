const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pexelsRoutes = require("./routes/PexelApi.js");
const favoriteImgRoute = require("./routes/favoriteImg.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_DB_COMPASS_LINK)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Welcome to the Pexels API server!");
});

app.use("/api", pexelsRoutes);
app.use("/api/favorite", favoriteImgRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
