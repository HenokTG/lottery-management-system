import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/Page';
import { CreateCountry } from '../../components/country/create-country-form';
import { CountryList } from '../../components/country/country-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const ManageCountryLocations = () => {
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
    <Page title="Manage Locations: Country">
      {modalKey && <CreateCountry setModalKey={setModalKey} />}
      {modalKey === false && <CountryList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageCountryLocations;
