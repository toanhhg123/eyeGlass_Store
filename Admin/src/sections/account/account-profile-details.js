import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import useFetch from "src/hooks/useFetch";
import { updateProfile } from "src/services/user.service";

export const AccountProfileDetails = ({ user: { password, role, ...userValue } }) => {
  const [values, setValues] = useState(userValue);
  const [snackBar, setSnackBar] = useState({});
  const { fetch, status } = useFetch();

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleCloseSnackBar = () => {
    setSnackBar(undefined);
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const { res, error } = await fetch(() => updateProfile(values));

      if (res) {
        setSnackBar({
          type: "success",
          message: "chỉnh sửa thành công",
        });
      } else if (error) {
        setSnackBar({
          type: "error",
          message: error,
        });
      }
    },
    [fetch, values],
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      {snackBar?.type && snackBar?.message && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackBar}>
          <Alert onClose={handleCloseSnackBar} severity={snackBar.type} sx={{ width: "100%" }}>
            {snackBar.message}
          </Alert>
        </Snackbar>
      )}
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="user name"
                  name="user_name"
                  onChange={handleChange}
                  required
                  value={values.user_name}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="role"
                  name="role"
                  onChange={handleChange}
                  required
                  disabled
                  value={values.role}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <LoadingButton loading={status.loading} variant="contained" type="submit">
            Save details
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};
