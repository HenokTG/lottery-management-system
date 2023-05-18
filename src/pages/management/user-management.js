import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/layout/Page';
import CreateUser from '../../components/users/create-user-form';
import { UserListResults } from '../../components/users/users-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const UserManagnment = () => {
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
    <Page title="User Managnment">
      {modalKey && <CreateUser setModalKey={setModalKey} />}
      {modalKey === false && <UserListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default UserManagnment;
