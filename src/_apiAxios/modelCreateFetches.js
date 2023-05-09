import { axiosInstance } from '../utils/axios';

export const fetchOperatorIDs = (fetchAPI, setOperatorIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let operatorIDs = [];

      if (res.data.data.length !== 0) {
        operatorIDs = res.data.data.map((operator) => {
          return {
            id: operator.id,
            operatorName: operator.name,
          };
        });
      }
      setOperatorIDs(operatorIDs);
    })
    .catch((error) => {
      console.log(error);
      setOperatorIDs([]);
    });
};

export const fetchRoleIDs = (fetchAPI, setRoleIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let RoleIDs = [];

      if (res.data.data.length !== 0) {
        RoleIDs = res.data.data.map((role) => {
          return {
            id: role.id,
            roleName: role.name,
          };
        });
      }

      setRoleIDs(RoleIDs);
    })
    .catch((error) => {
      console.log(error);
      setRoleIDs([]);
    });
};

export const fetchCountryIDs = (fetchAPI, setCountryIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let CountryIDs = [];

      if (res.data.data.length !== 0) {
        CountryIDs = res.data.data.map((counrty) => {
          return {
            id: counrty.id,
            countryName: counrty.name,
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
