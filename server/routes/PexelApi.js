const express = require("express");
const axios = require("axios");
const router = express.Router();

const PexelApiKey = process.env.PEXELS_API_KEY;
const PexelsBaseUrl = process.env.PEXELS_BASE_URL;

router.get("/images", async (req, res) => {
  try {
    const query = req.query.query || "Wallpapers";
    const page = req.query.page || 1;
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 15,
        page,
      },
    });

    res.json(response.data.photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

module.exports = router;
