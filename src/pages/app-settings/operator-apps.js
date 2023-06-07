import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import CreateOperatorApp from '../../components/operator-apps/create-operator-app-form';
import { OperatorsAppList } from '../../components/operator-apps/operators-app-list-results';

const ManageOperatorApps = () => {
  const [modalKey, setModalKey] = useState(false);


  return (
    <Page title="Manage Operator Apps">
      {modalKey && <CreateOperatorApp setModalKey={setModalKey} />}
      {modalKey === false && <OperatorsAppList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageOperatorApps;
