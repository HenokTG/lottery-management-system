import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import CreateRole from '../../components/roles/create-role-form';
import { RoleListResults } from '../../components/roles/roles-list-results';

const RoleManagnment = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Role Managnment">
      {modalKey && <CreateRole setModalKey={setModalKey} />}
      {modalKey === false && <RoleListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default RoleManagnment;
