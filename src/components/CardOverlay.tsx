"use client";
import React, { useRef, useState } from "react";
import "./CardOverlay.css";
import image from "../assets/person.jpeg";
import { Coffee, Heart, AtSign, ArrowUpRight } from "lucide-react";

const CardOverlay = () => {
  const [style, setStyle] = useState({});
  const [imageStyle, setImageStyle] = useState({}); 
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - (width / 2); 
    const y = e.clientY - top - (height / 2);

    const xOffset = (x / width) * 60;
    const yOffset = -(y / height) * 60;

    const xImgPercent = (x / width) * 60; 
    const yImgPercent = (y / height) * 60;
    const translateX = -50 + xImgPercent;
    const translateY = -50 - 30 + yImgPercent;

    setStyle({
      transform: `rotateX(${yOffset}deg) rotateY(${xOffset}deg) rotateZ(0deg)`,
      transition: "none",
    });

    setImageStyle({
      transform: `translate(${translateX}%, ${translateY}px) scale(1.2)`,
      transition: "none",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "none",
      transition: "transform 0.5s",
    });

    setImageStyle({
      transform: "translate(-50%, -50%)",
      transition: "transform 0.5s",
    });
  };
  return (
    <div
      className="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      ref={cardRef} 
    >
      <div className="efecto-glassmorphism">
        <div className="content-icons">
          <div className="icon-container">
            <Heart />
          </div>
          <div className="icon-container">
            <Coffee />
          </div>
          <div className="icon-container">
            <AtSign />
          </div>
        </div>
      </div>
      <div className="imagen-container" style={imageStyle}>
        <img
          src={image.src}
          alt="Descripción de la imagen"
          className="imagen-sobre"
        />
      </div>
      <div className="contenido-blanco">
        <div className="texto">
          <h2>A Large Heading</h2>
          <p>
            Quam sed mus sed gravida at quis maecenas duis. Id nunc, et cras
            pretium nullam nunc nec, massa accumsan.
          </p>
        </div>
        <div className="btn-container">
          <div className="btn-text">ENTER</div>
          <ArrowUpRight />
        </div>
      </div>
    </div>
  );
};

export default CardOverlay;
