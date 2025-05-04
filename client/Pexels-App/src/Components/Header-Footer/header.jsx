import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

function header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="Header">
        <h1 onClick={() => navigate("/")}>Artifinity</h1>
        <div className="HeaderBtn">
          <button className="NavBTN" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="NavBTN" onClick={() => navigate("/favorite")}>
            Favorite
          </button>
          <button className="BTN">About</button>
        </div>
      </div>
    </>
  );
}

export default header;
