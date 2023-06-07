import { useState } from 'react';
// components
import Page from '../../components/layout/Page';
import CreateRegion from '../../components/regions/create-region-form';
import { RegionList } from '../../components/regions/regoins-list-results';

const ManageRegionalLocations = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Manage Locations: Region">
      {modalKey && <CreateRegion setModalKey={setModalKey} />}
      {modalKey === false && <RegionList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageRegionalLocations;
