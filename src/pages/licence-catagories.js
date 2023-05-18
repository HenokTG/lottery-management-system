import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../components/layout/Page';
import CreateLicenceCatagory from '../components/licence-catagory/create-licence-catagory-form';
import { LicenceCatagoryList } from '../components/licence-catagory/licence-catagories-list-results';
// context and modules
import { useGlobalContext } from '../context';

const LicenceCatagory = () => {
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
    <Page title="Licence Catagory">
      {modalKey && <CreateLicenceCatagory setModalKey={setModalKey} />}
      {modalKey === false && <LicenceCatagoryList setModalKey={setModalKey} />}
    </Page>
  );
};

export default LicenceCatagory;
