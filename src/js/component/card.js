import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";

export const Card = ({ item, type }) => {
  const { store, actions } = useContext(Context);
  const initialLikedState = store.favorites.some(
    (favorite) => favorite.uid === item.uid
  );
  const [liked, setLiked] = useState(initialLikedState);
  const [info, setInfo] = useState({ fact1: "", fact2: "", fact3: "" });

  const toggleLike = () => {
    if (!liked) {
      actions.addFavorite(item.name, item.uid);
    } else {
      actions.removeFavorite(item.uid);
    }
    setLiked(!liked);
  };

  useEffect(() => {
    const isFavorite = store.favorites.some(
      (favorite) => favorite.uid === item.uid
    );
    setLiked(isFavorite);
  }, [store.favorites]);

  const fetchData = async () => {
    let result = null;

    switch (type) {
      case "character":
        result = await actions.loadSpecificCharacter(item.uid);
        if (result && result.message === "ok") {
          setInfo({
            fact1: `Height: ${result.result.properties.height}`,
            fact2: `Eye Color: ${result.result.properties.eye_color}`,
            fact3: `Mass: ${result.result.properties.mass}`,
          });
        }
        break;
      case "planet":
        result = await actions.loadSpecificPlanet(item.uid);
        if (result && result.message === "ok") {
          setInfo({
            fact1: `Climate: ${result.result.properties.climate}`,
            fact2: `Terrain: ${result.result.properties.terrain}`,
            fact3: `Population: ${result.result.properties.population}`,
          });
        }
        break;
      case "vehicle":
        result = await actions.loadSpecificVehicle(item.uid);
        if (result && result.message === "ok") {
          setInfo({
            fact1: `Manufacturer: ${result.result.properties.manufacturer}`,
            fact2: `Vehicle Class: ${result.result.properties.vehicle_class}`,
            fact3: `Cost in Credits: ${result.result.properties.cost_in_credits}`,
          });
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card">
      <img
        src="https://via.placeholder.com/400x200"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{info.fact1}</p>
        <p className="card-text">{info.fact2}</p>
        <p className="card-text">{info.fact3}</p>
        <div className="d-flex justify-content-between gap-3">
          <Link to={`/${type}/${item.uid}`} className="btn btn-outline-dark">
            Learn more!
          </Link>
          <button
            className={`btn btn-outline-danger ${
              liked ? "no-active-effect" : ""
            }`}
            onClick={toggleLike}
          >
            <i className={`${liked ? "fa-solid" : "fa-regular"} fa-heart`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};
