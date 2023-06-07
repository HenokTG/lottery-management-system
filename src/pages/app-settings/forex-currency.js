import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import CreateCurrency from '../../components/currency/create-currency-form';
import { CurrencyList } from '../../components/currency/currency-list-results';

const ManageCurrency = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Manage Currency Settings">
      {modalKey && <CreateCurrency setModalKey={setModalKey} />}
      {modalKey === false && <CurrencyList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageCurrency;
