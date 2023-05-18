import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/layout/Page';
import CreateCurrency from '../../components/currency/create-currency-form';
import { CurrencyList } from '../../components/currency/currency-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const ManageCurrency = () => {
  const { loggedIn } = useGlobalContext();
  const [modalKey, setModalKey] = useState(false);

  const navigate = useNavigate();
  const prevLocation = useLocation();

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Page title="Manage Currency Settings">
      {modalKey && <CreateCurrency setModalKey={setModalKey} />}
      {modalKey === false && <CurrencyList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageCurrency;
