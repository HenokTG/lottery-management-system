import { axiosInstance } from '../utils/axios';

export const fetchPaymentMethods = (fetchAPI, setLoading, setPaymentMethodList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const PAYMENTMETHODS =
        res.data.data !== undefined
          ? res.data.data.map((payMethod) => {
              const newPaymentMethod = {
                id: payMethod.id,
                method: payMethod.name,
                description: payMethod.description,
                status: payMethod.is_active ? 'APPROVED' : 'NOT APPROVED',
                createdBy: `${payMethod.created_by.first_name} ${payMethod.created_by.last_name}`,
                createdAt: new Date(payMethod.created_at),
              };

              return newPaymentMethod;
            })
          : [];

      setLoading(false);
      setPaymentMethodList(PAYMENTMETHODS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setPaymentMethodList([]);
    });
};

export const paymentMethodUpdateFetch = (fetchAPI, setPaymentMethod, setLoading) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaymentMethod({
        paymentMethod: res.data.name ? res.data.name : '',
        paymentCode: res.data.code ? res.data.code : '',
        description: res.data.description ? res.data.description : '',
      });
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

export const paymentDistributionsFetch = (fetchAPI, setLoading, setPaymentDistributionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      const PAYMENTDISTRIBUTIONS =
        res.data.data !== undefined
          ? res.data.data.map((payDist) => {
              const newPayDistrb = {
                id: payDist.id,
                operatorName: payDist.operator ? payDist.operator.name : '',
                comName: payDist.operator ? payDist.operator.company_name : '',
                payMethod: payDist.payment_method ? payDist.payment_method.name : '',
                totalAmount: payDist.total_amount,
              };

              return newPayDistrb;
            })
          : [];

      setLoading(false);
      setPaymentDistributionsList(PAYMENTDISTRIBUTIONS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setPaymentDistributionsList([]);
    });
};

export const paymentTransactionsFetch = (fetchAPI, setLoading, setPaymentTransactionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data.data);

      const PAYMENTTRANSACTIONS =
        res.data.data !== undefined
          ? res.data.data.map((paymentTnx) => {
              const newPaymentTnx = {
                id: paymentTnx.id,
                transactionID: paymentTnx.payment_id,
                operatorName: paymentTnx.operator.name,
                PaymentMethod: paymentTnx.payment_method.name,
                currencyCode: paymentTnx.currency.code,
                ticketType: paymentTnx.ticket_type,
                paymentType: paymentTnx.transaction_type,
                amount: paymentTnx.amount,
                tnxFee: paymentTnx.transaction_fee,
                createdAt: new Date(paymentTnx.created_at),
                paymentStatus: paymentTnx.transaction_status,
              };

              return newPaymentTnx;
            })
          : [];
      setLoading(false);
      setPaymentTransactionsList(PAYMENTTRANSACTIONS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setPaymentTransactionsList([]);
    });
};

export const bonusTransactionsFetch = (fetchAPI, setLoading, setBonusTransactionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      if (typeof setPaginationProps === 'function') {
        setPaginationProps(res.data.pagination === undefined ? null : res.data.pagination);
      }

      console.log(res.data.data);
      const BONUSTRANSACTIONS =
        res.data.data !== undefined
          ? res.data.data.map((bonusTnx) => {
              const newBonusTnx = {
                id: bonusTnx.id,
                operatorName: bonusTnx.operator.name,
                playerID: bonusTnx.player_id,
                bonusID: bonusTnx.bonus.name, // `${bonusTnx.bonus.id} ${bonusTnx.bonus.code} - ${bonusTnx.bonus.name}`,
                paymentMethod: bonusTnx.payment_method.name,
                amount: bonusTnx.amount,
                status: bonusTnx.transaction_status, // bonusTnx.transaction_status ? 'Valid Bonus' : 'Expired Bonus',
                remark: 'Terms and Conditions',
                remarkDetail: bonusTnx.bonus.description,
              };

              return newBonusTnx;
            })
          : [];
      setLoading(false);
      setBonusTransactionsList(BONUSTRANSACTIONS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setBonusTransactionsList([]);
    });
};
