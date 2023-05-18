import { axiosInstance } from '../utils/axios';

export const statusIDs = () => [
  {
    id: 'bet',
    name: 'Bet',
  },
  {
    id: 'pending',
    name: 'Pending',
  },
  {
    id: 'won',
    name: 'Won',
  },
  {
    id: 'lost',
    name: 'Lost',
  },
  {
    id: 'cancelled',
    name: 'Cancelled',
  },
  {
    id: 'refunded',
    name: 'Refunded',
  },
];

export const bettingTypeIDs = () => [
  {
    id: 'online',
    name: 'Online',
  },
  {
    id: 'offline',
    name: 'Offline',
  },
];

export const boolianIDs = () => [
  {
    id: 'true',
    name: 'Active',
  },
  {
    id: 'false',
    name: 'Inactive',
  },
];

export const tnxTypeIDs = () => [
  {
    id: 'bet',
    name: 'Bet',
  },
  {
    id: 'payout',
    name: 'Payout',
  },
  {
    id: 'refund',
    name: 'Refund',
  },
  {
    id: 'cancel',
    name: 'Cancel',
  },
];

export const fetchCurrencyIDs = (fetchAPI, setCurrencyIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let CurrencyIDs = [];

      if (res.data.data && res.data.data.length !== 0) {
        CurrencyIDs = res.data.data.map((currency) => {
          const newCurrencyID = {
            id: currency.id,
            name: currency.code,
          };

          return newCurrencyID;
        });
      }

      setCurrencyIDs(CurrencyIDs);
    })
    .catch((error) => {
      console.log(error);
      setCurrencyIDs([]);
    });
};

export const fetchPaymentMethodIDs = (fetchAPI, setPaymentMethodIDs) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      let PaymentMethodIDs = [];

      if (res.data.data && res.data.data.length !== 0) {
        PaymentMethodIDs = res.data.data.map((paymentMethod) => {
          const newPaymentMethod = {
            id: paymentMethod.id,
            name: paymentMethod.name,
          };

          return newPaymentMethod;
        });
      }

      setPaymentMethodIDs(PaymentMethodIDs);
    })
    .catch((error) => {
      console.log(error);
      setPaymentMethodIDs([]);
    });
};
