import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState(store.favorites);

  useEffect(() => {
    setFavorites(store.favorites);
  }, [store.favorites]);

  const handleDelete = (uid) => {
    actions.removeFavorite(uid);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-dark dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Favorites
        <span
          className="badge bg-light text-dark"
          style={{ marginLeft: "10px" }}
        >
          {favorites.length}
        </span>
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
        style={{ width: "100px" }}
      >
        {favorites.length === 0 ? (
          <li style={{ margin: "0 5px 0 10px" }}>
            <p className="">No favorites have been picked yet.</p>
          </li>
        ) : (
          favorites.map((item, index) => (
            <li key={item.uid}>
              <div className="dropdown-item d-flex justify-content-around align-items-center">
                <p
                  className=""
                  style={{
                    margin: "15px",
                    maxWidth: "80%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}{" "}
                </p>
                <span className="">
                  <button
                    onClick={() => {
                      handleDelete(item.uid);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
