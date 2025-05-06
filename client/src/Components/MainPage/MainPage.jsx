import React, { useState, useEffect } from "react";
import "./mainPage.css";
import axios from "axios";
import banner from "../../assets/banner.jpeg";
import liked from "../../assets/heart-removebg-preview.png";
import notLiked from "../../assets/love.png";
import Download from "../../assets/download.png";
import search from "../../assets/search.png";
import Loading from "../../assets/Loading.gif";

function MainPage() {
  const [images, setImages] = useState([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [PreKeyWord, setPreKeyWord] = useState("Wallpapers");
  const [KeyWord, setKeyWord] = useState("Wallpapers");
  const [likedImages, setLikedImages] = useState({});

  const Endpoint = import.meta.env.VITE_BACKEND_LINK;

  useEffect(() => {
    const controller = new AbortController();

    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${Endpoint}/api/images?query=${KeyWord}&page=${page}`,
          { signal: controller.signal }
        );

        setImages((prev) => (page === 1 ? res.data : [...prev, ...res.data]));

        setIsImagesLoaded(true);
        if (page === 1) setKeyWord("");
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching images:", error);
        }
      }
    };

    if (KeyWord) fetchImages();

    return () => controller.abort();
  }, [KeyWord, page]);

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
            onChange={(e) => setPreKeyWord(e.target.value)}
          />
          <img
            src={search}
            alt="Search"
            className="SearchIcon"
            onClick={() => setKeyWord(PreKeyWord)}
          />
        </div>
        {isImagesLoaded ? (
          <div className="Container2">
            {images.map((img, index) => {
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
                    alt="Download"
                    className="Icon IconSide"
                    onClick={() =>
                      downloadImage(img.src.original, img.photographer)
                    }
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="LoadingDiv">
            <img src={Loading} alt="Loading" className="LoadingGif" />
          </div>
        )}

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
