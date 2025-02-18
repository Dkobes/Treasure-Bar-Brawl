import "nes.css/css/nes.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import TitleScreenImage from "../../assets/images/title-screen.jpg";
import './TitleScreen.css';

const TitleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="title-screen">
      <button
        onClick={() => navigate("/start-menu")}>
        Start
      </button>
      </div>
  );
};

export default TitleScreen;