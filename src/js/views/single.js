import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const { type, id } = useParams();
  const [data, setData] = useState({});
  const [stringProps, setStringProps] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () => {
    let response;
    switch (type) {
      case "character":
        response = await actions.loadSpecificCharacter(id);
        break;
      case "planet":
        response = await actions.loadSpecificPlanet(id);
        break;
      case "vehicle":
        response = await actions.loadSpecificVehicle(id);
        break;
      default:
        break;
    }
    if (response && response.message === "ok") {
      setName(response.result.properties.name);
      setData(response.result.properties);
      extractStringProps(response.result.properties);
    }
  };

  const extractStringProps = (data) => {
    const stringProperties = Object.entries(data)
      .filter(([key, value]) => typeof value === "string")
      .map(([key, value]) => {
        const formattedKey = key.split("_").join(" ");
        return [formattedKey, value];
      })
      .slice(0, 5);
    setStringProps(stringProperties);
  };

  useEffect(() => {
    fetchData();
  }, [type, id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 d-flex justify-content-center">
          <img
            src="https://via.placeholder.com/800x600"
            className="w-75 h-auto"
          />
        </div>
        <div className="col-6">
          <h1 className="text-start">{name}</h1>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum,
            exercitationem, modi dolore at culpa ex, commodi vitae aliquam
            repellendus eligendi labore delectus facilis praesentium repudiandae
            fugiat dolores ad laboriosam. Voluptate.
          </p>
        </div>
      </div>
      <div className="row mt-4 pt-1 border-top"></div>
      <div className="row mt-3">
        <div className="col-12 d-flex justify-content-center align-items-center flex-column gap-2">
          <div className="grid-container">
            <ul class="list-group list-group-horizontal gap-2 white-border grid-item">
              {stringProps.map(([key], index) => (
                <li
                  key={index}
                  className="list-group-item flex-fill white-border text-center text-capitalize"
                  style={{ color: "red" }}
                >
                  {key}
                </li>
              ))}
            </ul>
            <ul class="list-group list-group-horizontal gap-2 grid-item">
              {stringProps.map(([key, value], index) => (
                <li
                  key={index}
                  className="list-group-item flex-fill white-border text-center text-capitalize"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
