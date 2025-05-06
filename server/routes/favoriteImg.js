const express = require("express");
const router = express.Router();
const favoriteSchema = require("../mongoDb/favoriteImageSchema");

router.post("/save", async (req, res) => {
  try {
    const { imageUrl, isFavorite } = req.body;

    if (!imageUrl) {
      return res
        .status(400)
        .json({ message: "ImageUrl is required" });
    }

    const updatedFavorite = await favoriteSchema.findOneAndUpdate(
      { imageUrl },
      { isFavorite: isFavorite !== undefined ? isFavorite : true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      message: "Favorite image saved/updated successfully",
      favorite: updatedFavorite,
    });
  } catch (error) {
    console.error("Error saving favorite image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getFav", async (req, res) => {
  try {
    const favorites = await favoriteSchema.find({});
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorite images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
