import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/layout/Page';
import CreateRole from '../../components/roles/create-role-form';
import { RoleListResults } from '../../components/roles/roles-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const RoleManagnment = () => {
  const [modalKey, setModalKey] = useState(false);
  const { loggedIn } = useGlobalContext();

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
    <Page title="Role Managnment">
      {modalKey && <CreateRole setModalKey={setModalKey} />}
      {modalKey === false && <RoleListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default RoleManagnment;
