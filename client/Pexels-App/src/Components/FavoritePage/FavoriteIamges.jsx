import React, { useState, useEffect } from "react";
import "./FavoriteImages.css";
import axios from "axios";
import liked from "../../assets/heart-removebg-preview.png";

function FavoriteImges() {
  const [favoriteImages, setFavoriteImages] = useState([]);

  const fetchFavoriteImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/favorite/getFav"
      );
      setFavoriteImages(response.data);
    } catch (error) {
      console.error("Error fetching favorite images:", error);
    }
  };
  const handleFavoriteClick = (img) => {
    const updatedImages = favoriteImages.map((image) =>
      image.imageUrl === img.imageUrl
        ? { ...image, isFavorite: !image.isFavorite }
        : image
    );

    setFavoriteImages(updatedImages);

    axios.post("http://localhost:5000/api/favorite/save", {
      imageUrl: img.imageUrl,
      isFavorite: !img.isFavorite,
    });
  };
  useEffect(() => {
    fetchFavoriteImages();
  }, []);
  return (
    <div>
      <div className="FavoriteDiv">
        <h1 className="glowing-text">Favorite Images</h1>
        <div className="Container2">
          {favoriteImages
            .filter((image) => image.isFavorite)
            .map((image) => (
              <div key={image.imageUrl} className="image-card">
                <img
                  src={image.imageUrl}
                  alt={image.photographer}
                  className="GridImages"
                />
                <img
                  src={image.imageUrl}
                  alt={image.photographer}
                  className="GridImagesBack"
                />
                <img
                  src={liked}
                  alt="liked"
                  className="heart displayBlock"
                  onClick={() => handleFavoriteClick(image)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FavoriteImges;
