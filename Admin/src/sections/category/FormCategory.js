import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
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
import { createCategory, updateCategory, deleteCategory } from "src/services/category.service";

const FormCategory = ({ brand, onSubmitSuccess, type }) => {
  const [values, setValues] = useState(brand);
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
        type === "create" ? createCategory(values) : updateCategory(values._id, values),
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
      const res = deleteCategory(id);
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

    [onSubmitSuccess],
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

export default FormCategory;
