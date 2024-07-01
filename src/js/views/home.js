import React, { useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Carousel } from "../component/carousel";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Characters</h1>
          <Carousel entities={store.characters} type="character" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <h1>Vehicles</h1>
          <Carousel entities={store.vehicles} type="vehicle" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <h1>Planets</h1>
          <Carousel entities={store.planets} type="planet" />
        </div>
      </div>
    </div>
  );
};
