import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { axiosInstance } from '../utils/axios';

export const revenuesFetch = (fetchAPI, setLoading, setRevenuesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      console.log(res.data);

      setPaginationProps(res.data.pagination);
      const REVENUES = res.data.data.map((revenue) => {
        return {
          id: uuid(),
          operatorName: revenue.operator,
          comName: faker.company.catchPhraseNoun(),
          gameName: '',
          licenceCatagory: '',
          sells: faker.finance.amount(50000, 1000000, 2, '$ ', true),
          tax: faker.finance.amount(8000, 130000, 2, '$ ', true),
        };
      });
      setLoading(false);
      setRevenuesList(REVENUES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setRevenuesList([]);
    });
};

export const bettingTransactionsFetch = (fetchAPI, setLoading, setBettingTransactionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      console.log(res.data);

      setPaginationProps(res.data.pagination);
      const BETTINGTRANSACTIONS = res.data.data.map((bettingTnx) => {
        return {
          id: uuid(),
          gameName: bettingTnx.game,
          licenceCatagory: '-',
          operatorName: bettingTnx.operator,
          transactionID: bettingTnx.reference_number,
          amount: bettingTnx.stake,
          transType: bettingTnx.status,
          winAmount: bettingTnx.estimated_payout,
          refundAmount: '$ -',
          createdAt: new Date(bettingTnx.created_at),
        };
      });
      setLoading(false);
      setBettingTransactionsList(BETTINGTRANSACTIONS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setBettingTransactionsList([]);
    });
};

export const winningTicketsFetch = (fetchAPI, setLoading, setWinningTicketsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      console.log(res.data);

      setPaginationProps(res.data.pagination);
      const WINNINGTICKETLIST = res.data.data.map((winTcKt) => {
        return {
          id: uuid(),
          operatorName: winTcKt.operator,
          gameName: faker.helpers.arrayElement(['Scratch']),
          ticketRef: faker.random.alpha({ count: 15, casing: 'upper' }),
          amount: faker.finance.amount(5000, 60000, 2, '$ ', true),
          paymentType: faker.helpers.arrayElement(['Bank', 'Wallet', 'Cash']),
          winAmount: faker.finance.amount(18000, 130000, 2, '$ ', true),
          createdAt: faker.date.betweens('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z', 1)[0],
        };
      });
      setLoading(false);
      setWinningTicketsList(WINNINGTICKETLIST);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setWinningTicketsList([]);
    });
};

export const operatorsWalletFetch = (fetchAPI, setLoading, setOperatorsWalletList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      console.log(res.data);
      setPaginationProps(res.data.pagination);
      const OPERATORSWALLET = res.data.data.map((operWall) => {
        return {
          id: uuid(),
          operatorName: operWall.operator.name,
          comName: operWall.operator.company_name,
          wallet: operWall.current_balance,
          credit: operWall.closing_balance,
          debit: operWall.opening_balance,
        };
      });
      setLoading(false);
      setOperatorsWalletList(OPERATORSWALLET);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setOperatorsWalletList([]);
    });
};
