import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { axiosInstance } from '../utils/axios';

export const revenueSummary = (fetchAPI, setSummaryData) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setSummaryData({
        totalRevenue: res.data.total_sale,
        totalTax: res.data.total_tax,
      });
    })
    .catch((error) => {
      console.log(error);
      setSummaryData({
        totalRevenue: '-',
        totalTax: '-',
      });
    });
};

export const revenuesFetch = (fetchAPI, setLoading, setRevenuesList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const REVENUES =
        res.data.data !== undefined
          ? res.data.data.map((revenue, idx) => {
              console.log(res.data.data);
              const newRevenue = {
                id: `${revenue.operator.name} ${revenue.operator.game} - ${idx}`,
                operatorName: revenue.operator.name,
                comName: revenue.operator.company_name,
                gameName: revenue.game.name,
                licenceCatagory: revenue.game.license.name,
                sells: revenue.total_sale.toFixed(2),
                tax: revenue.total_tax.toFixed(2),
              };

              return newRevenue;
            })
          : [];
      setLoading(false);
      setRevenuesList(REVENUES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setRevenuesList([]);
    });
};

export const offlineBettingsFetch = (fetchAPI, setLoading, setBettingTransactionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data.data);

      const BETTINGTRANSACTIONS =
        res.data.data !== undefined
          ? res.data.data.map((bettingTnx) => {
              const newBettingTnx = {
                id: bettingTnx.id,
                playerID: `${bettingTnx.operator_reference_number}: ${bettingTnx.branch_id}`,
                gameName: bettingTnx.game.name,
                licenceCatagory: bettingTnx.game.license,
                operatorName: bettingTnx.operator.name,
                transactionID: bettingTnx.reference_number,
                paymentMethod: bettingTnx.payment_method.name,
                currency: bettingTnx.currency.code,
                amount: bettingTnx.stake,
                status: bettingTnx.status,
                winAmount: bettingTnx.estimated_payout,
                refundAmount: '',
                createdAt: new Date(bettingTnx.bet_timestamp),
              };

              return newBettingTnx;
            })
          : [];
      setLoading(false);
      setBettingTransactionsList(BETTINGTRANSACTIONS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setBettingTransactionsList([]);
    });
};

export const onlineBettingsFetch = (fetchAPI, setLoading, setBettingTransactionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res);

      const BETTINGTRANSACTIONS =
        res.data.data !== undefined
          ? res.data.data.map((bettingTnx) => {
              const newBettingTnx = {
                id: bettingTnx.id,
                playerID: `${bettingTnx.operator_reference_number}: ${bettingTnx.player_id}`,
                gameName: bettingTnx.game.name,
                licenceCatagory: bettingTnx.game.license,
                operatorName: bettingTnx.operator.name,
                transactionID: bettingTnx.reference_number,
                paymentMethod: bettingTnx.payment_method.name,
                currency: bettingTnx.currency.code,
                amount: bettingTnx.stake,
                status: bettingTnx.status,
                winAmount: bettingTnx.estimated_payout,
                refundAmount: '',
                createdAt: new Date(bettingTnx.bet_timestamp),
              };

              return newBettingTnx;
            })
          : [];
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
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data.data);

      const WINNINGTICKETLIST =
        res.data.data !== undefined
          ? res.data.data.map((winTcKt) => {
              const newWinTckt = {
                id: winTcKt.id,
                playerId: winTcKt.player_id ? winTcKt.player_id : winTcKt.branch_id,
                ticketRef: winTcKt.ticket_id,
                operatorName: winTcKt.operator && winTcKt.operator.name,
                gameName: winTcKt.game && winTcKt.game.name,
                paymentMethod: winTcKt.payment_method && winTcKt.payment_method.name,
                currency: winTcKt.currency && winTcKt.currency.code,
                ticketType: winTcKt.ticket_type,
                tnxStatus: winTcKt.transaction_status,
                betAmount: winTcKt.amount,
                winAmount: winTcKt.estimated_payout,
                createdAt: new Date(winTcKt.created_at),
              };

              return newWinTckt;
            })
          : [];
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
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data);

      const OPERATORSWALLET =
        res.data.data !== undefined
          ? res.data.data.map((operWall) => {
              const newOperWall = {
                id: uuid(),
                playerID: operWall.player_id,
                operatorName: operWall.operator.name,
                comName: operWall.operator.company_name,
                currency: operWall.currency.code,
                currentBalance: operWall.current_balance,
                debit: operWall.debit_amount,
                credit: operWall.credit_amount,
                walletStatus: operWall.status,
                closingBalance: operWall.closing_balance,
                openningBalance: operWall.opening_balance,
              };

              return newOperWall;
            })
          : [];
      setLoading(false);
      setOperatorsWalletList(OPERATORSWALLET);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setOperatorsWalletList([]);
    });
};
