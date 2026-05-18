import React, { useEffect } from "react";
import sound from "../release/cta.mp3"

export const WallcraftRelease: React.FC = () => {
  useEffect(() => {
    const audio = new Audio(sound);
    audio.volume = 0.6;

    audio.play().catch(() => {
      console.log("Autoplay prevented by browser");
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap');

          @keyframes swipeFlash {
            0% { left: -60%; }
            100% { left: 140%; }
          }

          body {
            margin: 0;
          }
        `}
      </style>

      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          background:
            "radial-gradient(circle at center, #2b1f14 0%, #1a120c 60%, #0e0a07 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e6d3a3",
          fontFamily: "'Cinzel', 'Times New Roman', serif",
          overflow: "hidden",
        }}
      >
        {/* Light swipe effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-60%",
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(to right, transparent 0%, rgba(255, 215, 120, 0.15) 50%, transparent 100%)",
            transform: "skewX(-20deg)",
            animation: "swipeFlash 6s ease-in-out infinite",
          }}
        />

        {/* Parchment panel */}
        <div
          style={{
            background: "linear-gradient(180deg, #3a2a1c, #2a1e14)",
            border: "3px solid #8b6b2e",
            boxShadow: "0 0 40px rgba(255, 215, 120, 0.15)",
            padding: "60px 80px",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              margin: 0,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#ffd100",
              textShadow:
                "0 0 6px rgba(255, 209, 0, 0.5), 0 0 2px #000",
            }}
          >
            Coming Soon
            <span
              style={{
                fontSize: "1.2rem",
                verticalAlign: "super",
                marginLeft: "6px",
              }}
            >
              ™
            </span>
            <span
              style={{
                marginLeft: "6px",
                color: "#c69b3c",
              }}
            >
              *
            </span>
          </h1>

          <p
            style={{
              marginTop: "20px",
              fontSize: "1.1rem",
              color: "#cbb37e",
              letterSpacing: "1px",
            }}
          >
            The gates remain closed… for now.
          </p>

          <p
            style={{
              marginTop: "40px",
              fontSize: "0.9rem",
              fontStyle: "italic",
              color: "#a88c4f",
            }}
          >
            * 2 more weeks
          </p>
        </div>
      </div>
    </>
  );
};