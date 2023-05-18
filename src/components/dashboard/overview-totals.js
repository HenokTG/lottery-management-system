import PropTypes from 'prop-types';

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography, Box, CircularProgress } from '@mui/material';

export const OverviewTotals = (props) => {
  const { value, loading, title, icon, iconBg } = props;

  return (
    <Card>
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {title}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: `${iconBg}.main`,
                height: 50,
                width: 50,
                padding: 0,
              }}
            >
              <SvgIcon>{icon}</SvgIcon>
            </Avatar>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewTotals.propTypes = {
  loading: PropTypes.bool,
  value: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  iconBg: PropTypes.string,
};
