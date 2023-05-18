import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/layout/Page';
import CreatePaymentMethod  from '../../components/payment-method/create-payment-method-form';
import { PaymentMethodList } from '../../components/payment-method/payment-methods-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const ManagePaymentMethod = () => {
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
    <Page title="Manage Payment Method">
      {modalKey && <CreatePaymentMethod setModalKey={setModalKey} />}
      {modalKey === false && <PaymentMethodList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManagePaymentMethod;
