import { axiosInstance } from '../utils/axios';

export const fetchLicenceCatIDs = (fetchAPI, setLicenceCatIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let licenceCatIDs = [];

      if (res.data.data.length !== 0) {
        licenceCatIDs = res.data.data.map((liceCat) => {
          return {
            id: liceCat.id,
            liceCatName: liceCat.name,
          };
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

      if (res.data.data.length !== 0) {
        GameIDs = res.data.data.map((game) => {
          return {
            id: game.id,
            gameName: game.name,
          };
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

      if (res.data.data.length !== 0) {
        CountryIDs = res.data.data.map((game) => {
          return {
            id: game.id,
            countryName: game.name,
          };
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

      if (res.data.data.length !== 0) {
        StateIDs = res.data.data.map((game) => {
          return {
            id: game.id,
            stateName: game.name,
          };
        });
      }

      setStateIDs(StateIDs);
    })
    .catch((error) => {
      console.log(error);
      setStateIDs([]);
    });
};
