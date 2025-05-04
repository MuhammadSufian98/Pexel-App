import React from "react";
import "./footer.css";
import Instagram from "../../assets/instagram-removebg-preview.png";
import Linkedin from "../../assets/linkedin.png";
import GitHub from "../../assets/github-sign-removebg-preview.png";

function footer() {
  return (
    <div className="Footer">
      <div className="CopyRights">Copyright © 2025 Artifinity , Inc.</div>
      <div className="Logo">
        <h1 className="Name">Artifinity</h1>
      </div>
      <div className="IconDiv">
        <a href="#" className="IconsLink">
          <img src={Instagram} alt="IG" className="Icons" />
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-sufian-66a6bb32b/"
          className="IconsLink"
          target="_blank"
        >
          <img src={Linkedin} alt="linkedin" className="Icons" />
        </a>
        <a
          href="https://github.com/MuhammadSufian98"
          className="IconsLink"
          target="_blank"
        >
          <img src={GitHub} alt="GH" className="Icons" />
        </a>
      </div>
    </div>
  );
}

export default footer;
