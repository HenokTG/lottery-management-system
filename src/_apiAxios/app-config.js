import { axiosInstance } from '../utils/axios';

export const appConfigFetch = (fetchAPI, setLoading, setAppConfigList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data.data);

      const APPCONFIGS =
        res.data.data !== undefined
          ? res.data.data.map((appConfig) => {
              const newConfig = {
                id: appConfig.id,
                key: appConfig.operator.name,
                value: appConfig.operator.company_name,
                description: appConfig.online,
              };

              return newConfig;
            })
          : [];

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
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const SYSTEMMODULES =
        res.data.data !== undefined
          ? res.data.data.map((sysModules) => {
              const newMolude = {
                id: sysModules.id,
                name: sysModules.name,
                description: sysModules.online,
                status: sysModules.is_active ? 'Active' : 'Inactive',
                statusBool: sysModules.is_active,
                createdAt: new Date(sysModules.created_at),
              };

              return newMolude;
            })
          : [];

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
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const OPERATORAPP =
        res.data.data !== undefined
          ? res.data.data.map((opertorApp) => {
              const newOperatorApp = {
                id: opertorApp.id,
                name: opertorApp.name,
                operatorName: opertorApp.operator.name,
                status: opertorApp.is_active ? 'Active' : 'Inactive',
                statusBool: opertorApp.is_active,
                createdBy: `${opertorApp.created_by.first_name} ${opertorApp.created_by.last_name}`,
                createdAt: new Date(opertorApp.created_at),
              };

              return newOperatorApp;
            })
          : [];

      setLoading(false);
      setOperatorAppsList(OPERATORAPP);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setOperatorAppsList([]);
    });
};

export const operatorAppUpdateFetch = (fetchAPI, setOperaroApp, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setOperaroApp({
        appName: res.data.name ? res.data.name : '',
        operatorName: res.data.operator ? res.data.operator.id : '',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

export const currencyFetch = (fetchAPI, setLoading, setCurrencyList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const CURRENCY =
        res.data.data !== undefined
          ? res.data.data.map((currency) => {
              const newCurrency = {
                id: currency.id,
                name: currency.name,
                code: currency.code,
                status: currency.is_active ? 'Active' : 'Inactive',
                statusBool: currency.is_active,
                createdBy: `${currency.created_by.first_name} ${currency.created_by.last_name}`,
                createdAt: new Date(currency.created_at),
              };

              return newCurrency;
            })
          : [];

      setLoading(false);
      setCurrencyList(CURRENCY);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setCurrencyList([]);
    });
};

export const currencyUpdateFetch = (fetchAPI, setCurrency, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setCurrency({
        currencyName: res.data.name ? res.data.name : '',
        currencyCode: res.data.code ? res.data.code : '',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

export const countryFetch = (fetchAPI, setLoading, setCountryList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const COUNTRY =
        res.data.data !== undefined
          ? res.data.data.map((country) => {
              const newCountry = {
                id: country.id,
                name: country.name,
                code: country.code,
                status: country.is_active ? 'Active' : 'Inactive',
                statusBool: country.is_active,
                createdBy: `${country.created_by.first_name} ${country.created_by.last_name}`,
                createdAt: new Date(country.created_at),
              };

              return newCountry;
            })
          : [];

      setLoading(false);
      setCountryList(COUNTRY);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setCountryList([]);
    });
};
export const countryUpdateFetch = (fetchAPI, setCountry, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setCountry({
        countryName: res.data.name ? res.data.name : '',
        countryCode: res.data.code ? res.data.code : '',
      });

      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

export const regionsFetch = (fetchAPI, setLoading, setRegionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const APPCONFIGS =
        res.data.data !== undefined
          ? res.data.data.map((region) => {
              const newRegion = {
                id: region.id,
                name: region.name,
                code: region.code,
                countryName: region.country.name,
                status: region.is_active ? 'Active' : 'Inactive',
                statusBool: region.is_active,
                createdBy: `${region.created_by.first_name} ${region.created_by.last_name}`,
                createdAt: new Date(region.created_at),
              };

              return newRegion;
            })
          : [];

      setLoading(false);
      setRegionsList(APPCONFIGS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setRegionsList([]);
    });
};

export const regionUpdateFetch = (fetchAPI, setRegion, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setRegion({
        regionName: res.data.name ? res.data.name : '',
        regionCode: res.data.code ? res.data.code : '',
        countryName: res.data.country ? res.data.country.id : '',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

export const taxRulesFetch = (fetchAPI, setLoading, setTaxRulesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const TAXRULES =
        res.data.data !== undefined
          ? res.data.data.map((taxRule) => {
              const newTaxRule = {
                id: taxRule.id,
                name: taxRule.name,
                countryName: taxRule.country.name,
                type: taxRule.tax_type,
                value: taxRule.tax_value,
                status: taxRule.is_active ? 'Active' : 'Inactive',
                statusBool: taxRule.is_active,
                createdBy: `${taxRule.created_by.first_name} ${taxRule.created_by.last_name}`,
                createdAt: new Date(taxRule.created_at),
              };

              return newTaxRule;
            })
          : [];

      setLoading(false);
      setTaxRulesList(TAXRULES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setTaxRulesList([]);
    });
};

export const taxRuleUpdateFetch = (fetchAPI, setTaxRule, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setTaxRule({
        taxName: res.data.name ? res.data.name : '',
        taxType: res.data.tax_type ? res.data.tax_type : '',
        taxValue: res.data.tax_value ? res.data.tax_value : '',
        countryName: res.data.country ? res.data.country.id : '',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};
