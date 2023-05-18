// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/layout/Page';
import { BonusTransactionsResults } from '../../components/payment-report/bonus-transactions';

const BonusTransactionsReport = () => (
  <Page title="Bonus Transactions Report">
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Box>
          <Typography sx={{ m: 1, mb: 4 }} variant="h4">
            Bonus Transactions Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <BonusTransactionsResults />
        </Box>
      </Container>
    </Box>
  </Page>
);
export default BonusTransactionsReport;
