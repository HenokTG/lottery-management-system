import { useState } from 'react';

// components
import Page from '../components/layout/Page';
import CreateLicenceCatagory from '../components/licence-catagory/create-licence-catagory-form';
import { LicenceCatagoryList } from '../components/licence-catagory/licence-catagories-list-results';

const LicenceCatagory = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Licence Catagory">
      {modalKey && <CreateLicenceCatagory setModalKey={setModalKey} />}
      {modalKey === false && <LicenceCatagoryList setModalKey={setModalKey} />}
    </Page>
  );
};

export default LicenceCatagory;
