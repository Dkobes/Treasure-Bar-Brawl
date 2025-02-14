import "nes.css/css/nes.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import TitleScreenImage from "../../assets/images/title-screen.jpg";

const TitleScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      className="title-screen"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${TitleScreenImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <button
        onClick={() => navigate("/start-menu")}
        style={{
          marginBottom: "50px",
          padding: "15px 30px",
          fontSize: "24px",
          fontWeight: "bold",
          backgroundColor: "#ffcc00",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        Start
      </button>
    </div>
  );
};

export default TitleScreen;