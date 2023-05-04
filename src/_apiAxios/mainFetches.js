import { axiosInstance } from '../utils/axios';

export const operatorsFetch = (fetchAPI, setLoading, setOperatorsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const OPERATORS = res.data.data.map((operator) => {
        return {
          id: operator.id,
          address: `${operator.address}, ${operator.state}, ${operator.country}`,
          avatarUrl: `/static/images/avatars/avatar_${Math.floor(Math.random() * 10) + 1}.png`,
          createdBy: operator.created_by,
          createdAt: new Date(operator.created_at),
          email: operator.email,
          name: operator.name,
          comName: operator.company_name,
          phone: operator.phone,
          status: operator.is_active ? 'Active' : 'Inactive',
          noGameCatagory: operator.games,
        };
      });

      setLoading(false);
      setOperatorsList(OPERATORS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setOperatorsList([]);
    });
};

export const fetchLicenceCatagories = (fetchAPI, setLoading, setLicenceCatagoryList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const CATAGORY = res.data.data.map((liceCat) => {
        return {
          id: liceCat.id,
          licenceCatagory: liceCat.name,
          description: liceCat.description,
          createdBy: liceCat.created_by,
          createdAt: new Date(liceCat.created_at),
          status: liceCat.is_active ? 'Active' : 'Inactive',
        };
      });

      setLoading(false);
      setLicenceCatagoryList(CATAGORY);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setLicenceCatagoryList([]);
    });
};

export const fetchGames = (fetchAPI, setLoading, setGamesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const GAMES = res.data.data.map((game) => {
        return {
          id: game.id,
          logo: game.photo_url,
          createdAt: new Date(game.created_at),
          gameName: game.name,
          licenceCatagory: game.licence,
          description: game.description,
          totalSales: game.total_salas,
          status: game.is_active ? 'Active' : 'Inactive',
          noOperators: game.no_operators,
        };
      });

      console.log(res.data, GAMES);

      setLoading(false);
      setGamesList(GAMES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setGamesList([]);
    });
};
