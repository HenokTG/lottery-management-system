import { axiosInstance } from '../utils/axios';

export const fetchOperatorIDs = (fetchAPI, setOperatorIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let operatorIDs = [];

      if (res.data.data && res.data.data.length !== 0) {
        operatorIDs = res.data.data.map((operator) => {
          const newOperatorID = {
            id: operator.id,
            name: operator.name,
          };

          return newOperatorID;
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

      
      if (res.data.data && res.data.data.length !== 0) {
        RoleIDs = res.data.data.map((role) => {
          const newRoleID = {
            id: role.id,
            name: role.name,
          };
          
          return newRoleID;
        });
      }
      
      console.log(RoleIDs);
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

      if (res.data.data && res.data.data.length !== 0) {
        CountryIDs = res.data.data.map((counrty) => {
          const newCountryID = {
            id: counrty.id,
            name: counrty.name,
          };

          return newCountryID;
        });
      }

      setCountryIDs(CountryIDs);
    })
    .catch((error) => {
      console.log(error);
      setCountryIDs([]);
    });
};
