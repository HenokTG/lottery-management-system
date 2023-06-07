import { useState } from 'react';

// components
import Page from '../components/layout/Page';
import { OperatorListResults } from '../components/operators/operators-list-results';
import CreateOperator from '../components/operators/create-operator-form';

const Operators = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Operators">
      {modalKey && <CreateOperator setModalKey={setModalKey} />}
      {modalKey === false && <OperatorListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default Operators;
