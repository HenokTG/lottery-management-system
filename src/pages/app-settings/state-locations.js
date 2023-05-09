import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/Page';
import { CreateRegion } from '../../components/regions/create-region-form';
import { RegionList } from '../../components/regions/regoins-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const ManageRegionalLocations = () => {
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
    <Page title="Manage Locations: Region">
      {modalKey && <CreateRegion setModalKey={setModalKey} />}
      {modalKey === false && <RegionList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageRegionalLocations;
