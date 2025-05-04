const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
