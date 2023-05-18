import { axiosInstance } from '../utils/axios';

const bgColors = [
  '#3F51B5',
  '#c094d6',
  '#6ac460',
  '#e53935',
  '#a6cade',
  '#c2eb91',
  '#FB8C00',
  '#3F51B5',
  '#c094d6',
  '#6ac460',
  '#e53935',
  '#a6cade',
  '#c2eb91',
  '#FB8C00',
  '#3F51B5',
  '#c094d6',
  '#6ac460',
  '#e53935',
  '#a6cade',
  '#c2eb91',
  '#FB8C00',
];

export const fetchDashboardOverview = (fetchAPI, setLoading, setSummaryData) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setSummaryData({
        totalRevenue: res.data.data.total_sale === '' ? '-' : res.data.data.total_sale,
        totalTax: res.data.data.total_tax === '' ? '-' : res.data.data.total_tax,
        totalDeposit: res.data.data.total_deposit === '' ? '-' : res.data.data.total_deposit,
        totalWithdrawal: res.data.data.total_payout === '' ? '-' : res.data.data.total_payout,
        totalPayout: res.data.data.total_payout === '' ? '-' : res.data.data.total_payout,
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setSummaryData({
        totalRevenue: '-',
        totalTax: '-',
        totalDeposit: '-',
        totalWithdrawal: '-',
        totalPayout: '-',
      });
      setLoading(false);
    });
};

export const fetchSalesByGamesCatagory = (gameCataAPI, setLoading, setGameSalesData) => {
  axiosInstance
    .get(gameCataAPI)
    .then((res) => {
      const titleArray = [];
      const valueArray = [];
      res.data.data.map((gameSales) => {
        titleArray.push(gameSales.game_name);
        valueArray.push(gameSales.total_sale);

        return {};
      });

      const GAMESALES = {
        title: titleArray,
        value: valueArray,
      };
      setLoading(false);
      setGameSalesData(GAMESALES);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setGameSalesData({
        title: [],
        value: [],
      });
    });
};

export const fetchOverviewPaymentDistributions = (payDistribAPI, setLoading, setPayDistribData) => {
  axiosInstance
    .get(payDistribAPI)
    .then((res) => {
      const titleArray = [];
      const valueArray = [];
      const bgColorArray = [];
      res.data.data.map((payment, idx) => {
        titleArray.push(payment.payment_method);
        valueArray.push(payment.total_sale);
        bgColorArray.push(bgColors[idx]);

        return {};
      });

      const PAYDISTRIB = {
        title: titleArray,
        value: valueArray,
        bgColorCode: bgColorArray,
      };
      setLoading(false);
      setPayDistribData(PAYDISTRIB);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setPayDistribData({
        title: [],
        value: [],
        bgColorCode: [],
      });
    });
};

export const fetchOperatorSalesDetail = (topOperatorsAPI, setLoading, setOperatorSalesData) => {
  axiosInstance
    .get(topOperatorsAPI)
    .then((res) => {
      const TOPOPERATORS = res.data.data.map((topOperator) => {
        const newtTopOperator = {
          id: topOperator.operator_name,
          operatorName: topOperator.operator_name,
          sales: topOperator.total_sale,
          tax: topOperator.total_tax,
        };

        return newtTopOperator;
      });
      setLoading(false);
      setOperatorSalesData(TOPOPERATORS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setOperatorSalesData([]);
    });
};

export const fetchHighestWinningTicketes = (highestWinningsAPI, setLoading, setTopWinsData) => {
  axiosInstance
    .get(highestWinningsAPI)
    .then((res) => {
      const TOPWINS = res.data.data.map((topWin, idx) => {
        const newTopWin = {
          id: `${idx}: ${topWin.operator}-${topWin.ticket_reference}`,
          operatorName: topWin.operator,
          gameName: topWin.game,
          ticketRef: topWin.ticket_reference,
          winAmount: topWin.total_winning,
        };
        return newTopWin;
      });
      setLoading(false);
      setTopWinsData(TOPWINS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setTopWinsData([]);
    });
};
