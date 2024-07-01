import React from "react";
import { Link } from "react-router-dom";
import { mockData } from "../../mockData";
import "../../styles/carousel.css";
import { Card } from "./card";

export const Carousel = ({ entities, type }) => {
  return (
    <div className="carousel-container">
      {entities.map((item) => (
        <div className="" key={item.uid}>
          <Card item={item} className="card" key={item.uid} type={type} />
        </div>
      ))}
    </div>
  );
};
