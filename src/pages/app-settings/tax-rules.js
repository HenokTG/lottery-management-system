import { useState } from 'react';

// components
import Page from '../../components/layout/Page';
import CreateTaxRule from '../../components/tax-rule/create-tax-rule-form';
import { TaxRulesList } from '../../components/tax-rule/tax-rule-list-results';

const ManageTaxRules = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Manage Operator Apps">
      {modalKey && <CreateTaxRule setModalKey={setModalKey} />}
      {modalKey === false && <TaxRulesList setModalKey={setModalKey} />}
    </Page>
  );
};

export default ManageTaxRules;
