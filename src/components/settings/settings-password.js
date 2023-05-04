import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Grid container md={6} sx={{ ml: 5 }}>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
              color="warning"
            />
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
              variant="outlined"
              color="warning"
            />
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            p: 2,
            ml: 5,
          }}
        >
          <Button color="warning" size="large" variant="contained" sx={{ width: "15rem" }}>
            Send OTP
          </Button>
        </Box>
      </Card>
    </form>
  );
};
