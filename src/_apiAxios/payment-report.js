import { axiosInstance } from '../utils/axios';

export const fetchPaymentMethods = (fetchAPI, setLoading, setPaymentMethodList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      setPaginationProps(res.data.pagination);
      const PAYMENTMETHODS = res.data.data.map((payMethod) => {
        return {
          id: payMethod.id,
          method: payMethod.name,
          description: payMethod.description,
          status: payMethod.is_active ? 'APPROVED' : 'NOT APPROVED',
          createdBy: payMethod.created_by,
          createdAt: new Date(payMethod.created_at),
        };
      });

      setLoading(false);
      setPaymentMethodList(PAYMENTMETHODS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setPaymentMethodList([]);
    });
};
export const paymentDistributionsFetch = (fetchAPI, setLoading, setPaymentDistributionsList, setPaginationProps) => {
  axiosInstance
    .get(fetchAPI)
    .then((res) => {
      // setPaginationProps(res.data.pagination);
      // const PAYMENTDISTRIBUTIONS = res.data.data.map((payDist) => {
      //   return {
      //     id: payDist.id,
      //     operatorName: payDist.operator,
      //     comName: payDist.company,
      //     online: payDist.online,
      //     cash: payDist.cash,
      //     bank: payDist.bank,
      //     wallet: payDist.walllet,
      //   };
      // });

      const PAYMENTDISTRIBUTIONS = [];
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
      setPaginationProps(res.data.pagination);
      const PAYMENTTRANSACTIONS = res.data.data.map((paymentTnx) => {
        return {
          id: paymentTnx.id,
          transactionID: paymentTnx.id,
          operatorName: paymentTnx.operator,
          PaymentMethod: paymentTnx.payment_method,
          paymentType: paymentTnx.transaction_type,
          amount: paymentTnx.amount,
          tnxFee: paymentTnx.transaction_fee,
          createdAt: new Date(paymentTnx.created_at),
          paymentStatus: paymentTnx.transaction_status,
        };
      });
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
      setPaginationProps(res.data.pagination);
      const BONUSTRANSACTIONS = res.data.data.map((bonusTnx) => {
        return {
          id: bonusTnx.id,
          operatorName: bonusTnx.operator_reference_number,
          playerID: bonusTnx.player_id,
          bonusID: `${bonusTnx.bonus.id} ${bonusTnx.bonus.code} - ${bonusTnx.bonus.name}`,
          amount: bonusTnx.amount,
          status: bonusTnx.bonus.is_active ? 'Valid Bonus' : 'Expired Bonus',
          remark: 'Terms and Conditions',
          remarkDetail: bonusTnx.bonus.description,
        };
      });
      setLoading(false);
      setBonusTransactionsList(BONUSTRANSACTIONS);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setBonusTransactionsList([]);
    });
};
