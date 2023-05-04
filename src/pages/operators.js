import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../components/Page';
import { OperatorListResults } from '../components/operators/operators-list-results';
import { CreateOperator } from '../components/operators/create-operator-form';
// context and modules
import { useGlobalContext } from '../context';

const Operators = () => {
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
    <Page title="Operators">
      {modalKey && <CreateOperator setModalKey={setModalKey} />}
      {modalKey === false && <OperatorListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default Operators;
