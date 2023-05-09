import { axiosInstance } from '../utils/axios';

export const appConfigFetch = (fetchAPI, setLoading, setAppConfigList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      // setPaginationProps(res.data.pagination);
      // const APPCONFIGS = res.data.data.map((appConfig) => {
      //   return {
      //     id: appConfig.id,
      //     key: appConfig.operator,
      //     value: appConfig.company,
      //     description: appConfig.online,
      //   };
      // });

      const APPCONFIGS = [];
      setLoading(false);
      setAppConfigList(APPCONFIGS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setAppConfigList([]);
    });
};

export const systemModulesFetch = (fetchAPI, setLoading, setSystemModulesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const SYSTEMMODULES = res.data.data.map((sysModules) => {
        return {
          id: sysModules.id,
          name: sysModules.name,
          description: sysModules.online,
          status: sysModules.is_active ? 'Active' : 'Inactive',
          createdBy: sysModules.created_by,
          createdAt: new Date(sysModules.created_at),
        };
      });

      setLoading(false);
      setSystemModulesList(SYSTEMMODULES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setSystemModulesList([]);
    });
};

export const operatorAppsFetch = (fetchAPI, setLoading, setOperatorAppsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const OPERATORAPP = res.data.data.map((opertorApp) => {
        return {
          id: opertorApp.id,
          name: opertorApp.name,
          operatorName: opertorApp.operator.name,
          status: opertorApp.is_active ? 'Active' : 'Inactive',
          createdBy: opertorApp.created_by,
          createdAt: new Date(opertorApp.created_at),
        };
      });

      setLoading(false);
      setOperatorAppsList(OPERATORAPP);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setOperatorAppsList([]);
    });
};

export const currencyFetch = (fetchAPI, setLoading, setCurrencyList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const CURRENCY = res.data.data.map((currency) => {
        return {
          id: currency.id,
          name: currency.name,
          code: currency.code,
          status: currency.is_active ? 'Active' : 'Inactive',
          createdBy: currency.created_by,
          createdAt: new Date(currency.created_at),
        };
      });

      setLoading(false);
      setCurrencyList(CURRENCY);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setCurrencyList([]);
    });
};

export const countryFetch = (fetchAPI, setLoading, setCountryList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const COUNTRY = res.data.data.map((country) => {
        return {
          id: country.id,
          name: country.name,
          code: country.code,
          status: country.is_active ? 'Active' : 'Inactive',
          createdBy: country.created_by,
          createdAt: new Date(country.created_at),
        };
      });

      setLoading(false);
      setCountryList(COUNTRY);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setCountryList([]);
    });
};

export const regionsFetch = (fetchAPI, setLoading, setRegionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const APPCONFIGS = res.data.data.map((region) => {
        return {
          id: region.id,
          name: region.name,
          code: region.code,
          countryName: region.country.name,
          status: region.is_active ? 'Active' : 'Inactive',
          createdBy: region.created_by,
          createdAt: new Date(region.created_at),
        };
      });

      setLoading(false);
      setRegionsList(APPCONFIGS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setRegionsList([]);
    });
};
