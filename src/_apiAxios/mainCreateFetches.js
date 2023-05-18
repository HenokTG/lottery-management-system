import { axiosInstance } from '../utils/axios';

export const fetchLicenceCatIDs = (fetchAPI, setLicenceCatIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let licenceCatIDs = [];

      if (res.data.data && res.data.data.length !== 0) {
        licenceCatIDs = res.data.data.map((liceCat) => {
          const newLicence = {
            id: liceCat.id,
            name: liceCat.name,
          };

          return newLicence;
        });
      }
      setLicenceCatIDs(licenceCatIDs);
    })
    .catch((error) => {
      console.log(error);
      setLicenceCatIDs([]);
    });
};

export const fetchGameIDs = (fetchAPI, setGameIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let GameIDs = [];

      if (res.data.data && res.data.data.length !== 0) {
        GameIDs = res.data.data.map((game) => {
          const newGame = {
            id: game.id,
            name: game.name,
          };

          return newGame;
        });
      }

      setGameIDs(GameIDs);
    })
    .catch((error) => {
      console.log(error);
      setGameIDs([]);
    });
};

export const fetchCountryIDs = (fetchAPI, setCountryIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let CountryIDs = [];

      if (res.data.data && res.data.data.length !== 0) {
        CountryIDs = res.data.data.map((country) => {
          const newCountry = {
            id: country.id,
            name: country.name,
          };

          return newCountry;
        });
      }

      setCountryIDs(CountryIDs);
    })
    .catch((error) => {
      console.log(error);
      setCountryIDs([]);
    });
};

export const fetchStateIDs = (fetchAPI, setStateIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let StateIDs = [];

      if (res.data.data && res.data.data.length !== 0) {
        StateIDs = res.data.data.map((region) => {
          const newState = {
            id: region.id,
            name: region.name,
          };

          return newState;
        });
      }

      setStateIDs(StateIDs);
    })
    .catch((error) => {
      console.log(error);
      setStateIDs([]);
    });
};
