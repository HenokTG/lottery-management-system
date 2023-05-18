// @mui
import { Container, Box, Typography } from '@mui/material';

// components
import Page from '../../components/layout/Page';
import { WinTicketResults } from '../../components/report/winning-ticket';

const WinningTicketReport = () => (
  <Page title="Winning Ticket Report">
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
            Winning Ticket Report
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <WinTicketResults />
        </Box>
      </Container>
    </Box>
  </Page>
);

export default WinningTicketReport;
