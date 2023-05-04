// @mu
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import { PaymentTransactionsResults } from '../../components/payment-report/payment-transactions';

const PaymentTransactionsReport = () => (
  <Page title="Payment Transactions Report">
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
            Payment Transactions Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <PaymentTransactionsResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default PaymentTransactionsReport;
