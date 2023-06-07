import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import CreateCountry from '../../components/country/create-country-form';
import { CountryList } from '../../components/country/country-list-results';

const ManageCountryLocations = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Manage Locations: Country">
      {modalKey && <CreateCountry setModalKey={setModalKey} />}
      {modalKey === false && <CountryList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageCountryLocations;
