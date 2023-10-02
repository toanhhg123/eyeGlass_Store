import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
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
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useCallback, useEffect, useState } from "react";
import useFetch from "src/hooks/useFetch";
import { updateOrder } from "src/services/order.service";
import { getAllShipping } from "src/services/shipping.service";
import { deleteOrder } from "../../services/order.service";

const FormOrder = ({ order, onSubmitSuccess }) => {
  const [values, setValues] = useState({
    ...order,
    product: order.product ? order.product._id : "",
    user: order.user ? order.user._id : "",
    shipping: order.shipping ? order.shipping._id : "",
  });
  const [shippings, setShippings] = useState([]);

  const [snackBar, setSnackBar] = useState();
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

      const { error } = await fetch(() => updateOrder(values._id, values));

      if (error) {
        setSnackBar({
          type: "error",
          message: error,
        });
        return;
      }

      setSnackBar({
        type: "success",
        message: "chỉnh sửa thành công",
      });

      onSubmitSuccess();
    },

    [fetch, onSubmitSuccess, values],
  );

  const handleDelete = async () => {
    if (order._id) {
      const { error } = await fetch(() => deleteOrder(values._id));

      if (error) {
        setSnackBar({
          type: "error",
          message: error,
        });
        return;
      }

      setSnackBar({
        type: "success",
        message: "delete thành công",
      });

      onSubmitSuccess();
    }
  };

  useEffect(() => {
    getAllShipping().then(({ data }) => {
      setShippings(data.data);
    });
  }, []);

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
                if (key === "shipping") {
                  return (
                    <Grid key={key} xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                        {shippings.length && (
                          <Select
                            labelId="demo-simple-select-label"
                            label={key}
                            name={key}
                            onChange={handleChange}
                            required
                            value={values[key]}
                          >
                            <MenuItem value={""}>Bấm vào đây để chọn</MenuItem>
                            {shippings.map((shippings) => (
                              <MenuItem key={shippings._id} value={shippings._id}>
                                {shippings.status}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </FormControl>
                    </Grid>
                  );
                }

                if (key === "status") {
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
                          <MenuItem value={""}>Bấm vào đây để chọn</MenuItem>
                          {["ordered", "cart", "cancel"].map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                }

                if (key === "product") {
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
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <LoadingButton
            loading={status.loading}
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            delete
          </LoadingButton>

          <LoadingButton loading={status.loading} type="submit" variant="contained">
            Save details
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FormOrder;
