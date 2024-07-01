import React, { useContext } from "react";
import { Link } from "react-router-dom";
import dark from "../../img/dark.png";
import { Favorites } from "./favorites";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-light mb-3">
            <Link to="/" className="text-decoration-none">
              <div className="navbar-content d-flex align-items-center gap-3">
                <img src={dark} height={50} width={50} />
                <h1 className="navbar-brand text-dark text-decoration-none fw-bold">
                  Star Wars
                </h1>
              </div>
            </Link>
            <div className="ml-auto">
              <Favorites />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
