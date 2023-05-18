// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/layout/Page';
import { PaymentDistributionResults } from '../../components/payment-report/payment-distributions';

const PaymentDistributionReport = () => (
  <Page title="Payment Distribution Report">
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
            Payment Distribution Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <PaymentDistributionResults />
        </Box>
      </Container>
    </Box>
  </Page>
);
export default PaymentDistributionReport;
