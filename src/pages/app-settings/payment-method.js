import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import CreatePaymentMethod from '../../components/payment-method/create-payment-method-form';
import { PaymentMethodList } from '../../components/payment-method/payment-methods-list-results';

const ManagePaymentMethod = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Manage Payment Method">
      {modalKey && <CreatePaymentMethod setModalKey={setModalKey} />}
      {modalKey === false && <PaymentMethodList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManagePaymentMethod;
