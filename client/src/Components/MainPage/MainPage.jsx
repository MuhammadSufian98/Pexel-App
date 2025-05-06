import React, { useState, useEffect } from "react";
import "./mainPage.css";
import axios from "axios";
import banner from "../../assets/banner.jpeg";
import liked from "../../assets/heart-removebg-preview.png";
import notLiked from "../../assets/love.png";
import Download from "../../assets/download.png";

function MainPage() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [KeyWord, setKeyWord] = useState("Wallpapers");
  const [likedImages, setLikedImages] = useState({});

  const Endpoint = import.meta.env.BACKEND_LINK;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${Endpoint}/api/images?query=${KeyWord}&page=${page}`
        );

        const dataArray = Array.isArray(res.data) ? res.data : [];

        setImages((prevImages) =>
          page === 1 ? dataArray : [...prevImages, ...dataArray]
        );
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      }
    };

    fetchImages();
  }, [KeyWord, page]);

  const handleKeyDown = (e) => {
    const Value = e.target.value;
    setKeyWord(Value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFavoriteClick = (index, img) => {
    const newFavoriteStatus = !likedImages[index];

    setLikedImages((prev) => ({
      ...prev,
      [index]: newFavoriteStatus,
    }));

    axios.post(`${Endpoint}/api/favorite/save`, {
      imageUrl: img.src.medium,
      isFavorite: newFavoriteStatus,
      // userId: "your-user-id"
    });
  };

  async function downloadImage(imageUrl, fileName = "pexels-image.jpg") {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  }

  return (
    <>
      <div className="BodyDiv">
        <div className="MainDiv">
          <div className="Container1">
            <h1>Where Ideas Find Real Image</h1>
            <div className="KeyWordsDiv">
              <h2 className="KeyWords" onClick={() => setKeyWord("Cars")}>
                Cars
              </h2>
              <h2 className="KeyWords" onClick={() => setKeyWord("Galaxy")}>
                Galaxy
              </h2>
              <h2 className="KeyWords" onClick={() => setKeyWord("Coding")}>
                Coding
              </h2>
              <h2 className="KeyWords" onClick={() => setKeyWord("Minimalism")}>
                Minimalism
              </h2>
            </div>
            <img src={banner} alt="Banner" className="Banner" />
          </div>
        </div>
        <div className="TagLine">
          <input
            type="text"
            placeholder="Search for images..."
            className="SearchBar"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="Container2">
          {Array.isArray(images) &&
            images.map((img, index) => {
              const isLiked = likedImages[index];

              return (
                <div className="Container2Div" key={index}>
                  <img
                    src={img.src.medium}
                    alt={img.photographer}
                    className="GridImages"
                  />
                  <img
                    src={img.src.medium}
                    alt={img.photographer}
                    className="GridImagesBack"
                  />

                  <img
                    src={isLiked ? liked : notLiked}
                    alt={isLiked ? "liked" : "not liked"}
                    className="Icon displayBlock"
                    onClick={() => handleFavoriteClick(index, img)}
                  />
                  <img
                    src={Download}
                    alt={"Download"}
                    className="Icon IconSide"
                    onClick={() =>
                      downloadImage(img.src.original, img.photographer)
                    }
                  />
                </div>
              );
            })}
        </div>
        <div className="BTNContainer">
          <button className="BTN" onClick={handleLoadMore}>
            Load More.
          </button>
        </div>
      </div>
    </>
  );
}

export default MainPage;
