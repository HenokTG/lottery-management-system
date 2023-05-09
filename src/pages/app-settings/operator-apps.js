import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/Page';
import { CreateOperatorApp } from '../../components/operator-apps/create-operator-app-form';
import { OperatorsAppList } from '../../components/operator-apps/operators-app-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const ManageOperatorApps = () => {
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
    <Page title="Manage Operator Apps">
      {modalKey && <CreateOperatorApp setModalKey={setModalKey} />}
      {modalKey === false && <OperatorsAppList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageOperatorApps;
