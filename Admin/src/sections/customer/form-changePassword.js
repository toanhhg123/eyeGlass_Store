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
import { changePasswordUser } from "src/services/user.service";

const FormChangePassword = ({ user, onSubmitSuccess }) => {
  const [values, setValues] = useState({ _id: user._id, password: "" });
  const [snackBar, setSnackBar] = useState();
  const { fetch, status } = useFetch();

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const { res, error } = await fetch(() => changePasswordUser(user._id, values));

      if (res) {
        setSnackBar({
          type: "success",
          message: "chỉnh sửa thành công",
        });

        onSubmitSuccess();
      } else if (error) {
        setSnackBar({
          type: "error",
          message: error,
        });
      }
    },

    [fetch, onSubmitSuccess, user._id, values],
  );

  const handleCloseSnackBar = () => {
    setSnackBar(undefined);
  };

  return (
    <Box
      sx={{ h: "100%" }}
      component={"form"}
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
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
              <Grid>
                <TextField
                  fullWidth
                  label={"Mật khẩu mới"}
                  name={"password"}
                  onChange={handleChange}
                  required
                  value={values["password"]}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
          <LoadingButton loading={status.loading} type="submit" variant="contained">
            Save details
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FormChangePassword;
