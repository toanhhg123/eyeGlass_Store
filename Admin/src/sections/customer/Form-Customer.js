import React, { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useFetch from "src/hooks/useFetch";
import { createuser, deleteUser, updateUser } from "src/services/user.service";

const FormUser = ({ user, onSubmitSuccess, type }) => {
  const [values, setValues] = useState(user);
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
      const { res, error } = await fetch(() =>
        type === "create" ? createuser(values) : updateUser(values._id, values),
      );
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

    [fetch, onSubmitSuccess, type, values],
  );

  const handleDelete = useCallback(
    async (id) => {
      const { res, error } = await fetch(() => deleteUser(id));
      if (res) {
        setSnackBar({
          type: "success",
          message: "xoá thành công",
        });
        onSubmitSuccess();
      } else if (error) {
        setSnackBar({
          type: "error",
          message: error,
        });
      }
    },

    [fetch, onSubmitSuccess],
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
              {Object.keys(values).map((key) => {
                if (key === "role") {
                  return (
                    <Grid key={key} xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          label={key}
                          name={key}
                          onChange={handleChange}
                          required
                          value={values[key]}
                        >
                          <MenuItem value={"user"}>User</MenuItem>
                          <MenuItem value={"admin"}>Admin</MenuItem>
                          <MenuItem value={"employee"}>employee</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                }
                return (
                  <Grid key={key} xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={key}
                      name={key}
                      onChange={handleChange}
                      required
                      value={values[key]}
                      disabled={key === "_id" || key === "__v"}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
          {values._id && (
            <Button onClick={() => handleDelete(values._id)} color="error" variant="contained">
              delete
            </Button>
          )}
          <LoadingButton loading={status.loading} type="submit" variant="contained">
            Save details
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FormUser;
