import PropTypes from "prop-types";

import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";

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
        <Stack sx={{ mt: 3 }}>
          <TextField
            fullWidth
            name="range"
            type="text"
            color={iconBg}
            InputProps={{
              style: {
                border: `1px solid ${theme.palette[`${iconBg}`].main}`,
                color: theme.palette[`${iconBg}`].main,
              },
            }}
            defaultValue={7}
            size="small"
            select
          >
            <MenuItem value={7}>7 Days</MenuItem>
            <MenuItem value={30}>30 Days</MenuItem>
            <MenuItem value={1}>a Year</MenuItem>
          </TextField>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotals.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
