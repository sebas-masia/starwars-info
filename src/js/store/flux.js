// flux.js

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
      planets: [],
      vehicles: [],
      favorites: [],
    },
    actions: {
      loadCharacters: async () => {
        const response = await fetch("https://www.swapi.tech/api/people");
        const data = await response.json();
        setStore({ characters: data.results });
      },
      loadPlanets: async () => {
        const response = await fetch("https://www.swapi.tech/api/planets");
        const data = await response.json();
        setStore({ planets: data.results });
      },
      loadVehicles: async () => {
        const response = await fetch("https://www.swapi.tech/api/vehicles");
        const data = await response.json();
        setStore({ vehicles: data.results });
      },
      addFavorite: (name, uid) => {
        const store = getStore();
        if (!store.favorites.find((fav) => fav.uid === uid)) {
          const entity = { name: name, uid: uid };
          setStore({ favorites: [...store.favorites, entity] });
        }
      },
      removeFavorite: (uid) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter((fav) => fav.uid !== uid),
        });
      },
      loadSpecificCharacter: async (id) => {
        const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
        const data = await response.json();
        return data;
      },
      loadSpecificPlanet: async (id) => {
        const response = await fetch(
          `https://www.swapi.tech/api/planets/${id}`
        );
        const data = await response.json();
        return data;
      },
      loadSpecificVehicle: async (id) => {
        const response = await fetch(
          `https://www.swapi.tech/api/vehicles/${id}`
        );
        const data = await response.json();
        return data;
      },
    },
  };
};

export default getState;
