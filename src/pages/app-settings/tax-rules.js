import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../../components/layout/Page';
import CreateTaxRule from '../../components/tax-rule/create-tax-rule-form';
import { TaxRulesList } from '../../components/tax-rule/tax-rule-list-results';
// context and modules
import { useGlobalContext } from '../../context';

const ManageTaxRules = () => {
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
    <Page title="Manage Operator Apps">
      {modalKey && <CreateTaxRule setModalKey={setModalKey} />}
      {modalKey === false && <TaxRulesList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageTaxRules;
