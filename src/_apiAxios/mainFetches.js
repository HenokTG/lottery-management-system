import { axiosInstance } from '../utils/axios';

export const operatorsFetch = (fetchAPI, setLoading, setOperatorsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      const randomAvator = `/static/images/avatars/avatar_${Math.floor(Math.random() * 10) + 1}.png`;

      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const OPERATORS =
        res.data.data !== undefined
          ? res.data.data.map((operator) => {
              const newOperator = {
                id: operator.id,
                address: `${operator.address}, ${operator.state.name}, ${operator.country.name}`,
                createdBy: `${operator.created_by.first_name} ${operator.created_by.last_name}`,
                createdAt: new Date(operator.created_at),
                name: operator.name,
                comName: operator.company_name,
                avatarUrl: operator.contact_persons.length !== 0 ? operator.contact_persons[0].photo_url : randomAvator,
                contactName:
                  operator.contact_persons.length !== 0
                    ? `${operator.contact_persons[0].first_name} ${operator.contact_persons[0].last_name}`
                    : '',
                email: operator.contact_persons.length !== 0 ? operator.contact_persons[0].email : '',
                phone: operator.contact_persons.length !== 0 ? operator.contact_persons[0].phone : '',
                status: operator.is_active ? 'Active' : 'Inactive',
                noGameCatagory: operator.games,
              };

              return newOperator;
            })
          : [];

      setLoading(false);
      setOperatorsList(OPERATORS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setOperatorsList([]);
    });
};

export const operatorUpdateFetch = (fetchAPI, setOperator) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) =>
      setOperator({
        email: res.data.contact_persons.length !== 0 ? res.data.contact_persons[0].email : '',
        photo: res.data.contact_persons.length !== 0 ? res.data.contact_persons[0].photo_url : '',
        firstName: res.data.contact_persons.length !== 0 ? res.data.contact_persons[0].first_name : '',
        lastName: res.data.contact_persons.length !== 0 ? res.data.contact_persons[0].last_name : '',
        phoneNumber: res.data.contact_persons.length !== 0 ? res.data.contact_persons[0].phone : '',
        operatorName: res.data.name ? res.data.name : '',
        companyName: res.data.company_name ? res.data.company_name : '',
        about: res.data.description ? res.data.description : '',
        address: res.data.address ? res.data.address : '',
        country: res.data.country ? res.data.country.id : '',
        region: res.data.state ? res.data.state.id : '',
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const fetchLicenceCatagories = (fetchAPI, setLoading, setLicenceCatagoryList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const CATAGORY =
        res.data.data !== undefined
          ? res.data.data.map((liceCat) => {
              const newLiceCata = {
                id: liceCat.id,
                licenceCatagory: liceCat.name,
                description: liceCat.description,
                createdBy: `${liceCat.created_by.first_name} ${liceCat.created_by.last_name}`,
                createdAt: new Date(liceCat.created_at),
                status: liceCat.is_active ? 'Active' : 'Inactive',
              };

              return newLiceCata;
            })
          : [];

      setLoading(false);
      setLicenceCatagoryList(CATAGORY);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setLicenceCatagoryList([]);
    });
};

export const licenceCatagoryUpdateFetch = (fetchAPI, setLicenceCatagory) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) =>
      setLicenceCatagory({
        licenceCatagory: res.data.name ? res.data.name : '',
        description: res.data.description ? res.data.description : '',
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const fetchGames = (fetchAPI, setLoading, setGamesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const GAMES =
        res.data.data !== undefined
          ? res.data.data.map((game) => {
              const newGame = {
                id: game.id,
                logo: game.photo_url,
                createdAt: new Date(game.created_at),
                gameName: game.name,
                licenceCatagory: game.license.name,
                description: game.description,
                totalSales: game.total_salas,
                status: game.is_active ? 'Active' : 'Inactive',
                noOperators: game.no_operators,
              };

              return newGame;
            })
          : [];

      setLoading(false);
      setGamesList(GAMES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setGamesList([]);
    });
};

export const gameUpdateFetch = (fetchAPI, setGame) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) =>
      setGame({
        gameName: res.data.name ? res.data.name : '',
        gameCode: res.data.code ? res.data.code : '',
        gameIconURL: res.data.photo_url ? res.data.photo_url : '',
        licenceCatagory: res.data.license ? res.data.license.id : '',
        description: res.data.description ? res.data.description : '',
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
