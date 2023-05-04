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
