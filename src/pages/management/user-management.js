import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import CreateUser from '../../components/users/create-user-form';
import { UserListResults } from '../../components/users/users-list-results';

const UserManagnment = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="User Managnment">
      {modalKey && <CreateUser setModalKey={setModalKey} />}
      {modalKey === false && <UserListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default UserManagnment;
