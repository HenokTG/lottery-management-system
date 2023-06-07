import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import { SystemModulesList } from '../../components/system-modules-list-results';

const ManageSystemModules = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Manage System Modules">{modalKey === false && <SystemModulesList setModalKey={setModalKey} />}</Page>
  );
};

export default ManageSystemModules;
