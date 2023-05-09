import PropTypes from 'prop-types';

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography, TextField, MenuItem, useTheme } from '@mui/material';

export const OverviewTotals = (props) => {
  const { value, title, icon, iconBg } = props;

  const theme = useTheme();

  return (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

OverviewTotals.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
