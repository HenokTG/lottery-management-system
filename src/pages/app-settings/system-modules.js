import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/layout/Page';
import { SystemModulesList } from '../../components/system-modules-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const ManageSystemModules = () => {
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
    <Page title="Manage System Modules">{modalKey === false && <SystemModulesList setModalKey={setModalKey} />}</Page>
  );
};

export default ManageSystemModules;
