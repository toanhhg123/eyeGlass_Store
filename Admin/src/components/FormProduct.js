import React from "react";
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
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useCallback, useEffect, useState } from "react";
import {
  createProduct,
  getAllBrand,
  getAllCategory,
  updateProduct,
} from "src/services/product.service";
import useFetch from "src/hooks/useFetch";
import { LoadingButton } from "@mui/lab";

const FormProduct = ({ product, onSubmitSuccess, type }) => {
  const [values, setValues] = useState({
    ...product,
    brand: product.brand ? product.brand._id : "",
    category: product.category ? product.category._id : "",
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [choice, setChoice] = useState({
    color: "",
    size: "",
  });
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

      if (type === "create") {
        const { error } = await fetch(() => createProduct(values));
        if (error) {
          setSnackBar({
            type: "error",
            message: error,
          });
          return;
        }
        setSnackBar({
          type: "success",
          message: "thêm sản phẩm thành công",
        });
      } else if (type === "edit") {
        const { error } = await fetch(() => updateProduct(values._id, values));

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
      }

      onSubmitSuccess();
    },

    [fetch, onSubmitSuccess, type, values],
  );

  useEffect(() => {
    getAllBrand().then(({ data }) => {
      setBrands(data.data);
      if (data?.data?.length && !product.brand) {
        setValues((pre) => ({ ...pre, brand: data.data[0]._id }));
      }
    });

    getAllCategory().then(({ data }) => {
      setCategories(data.data);
      if (data?.data?.length && !product.category) {
        setValues((pre) => ({ ...pre, category: data.data[0]._id }));
      }
    });
  }, [product.brand, product.category]);

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
                if (key === "brand") {
                  return (
                    <Grid key={key} xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                        {brands.length && (
                          <Select
                            labelId="demo-simple-select-label"
                            label={key}
                            name={key}
                            onChange={handleChange}
                            required
                            value={values[key]}
                          >
                            <MenuItem value={""}>Bấm vào đây để chọn</MenuItem>
                            {brands.map((brand) => (
                              <MenuItem key={brand._id} value={brand._id}>
                                {brand.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </FormControl>
                    </Grid>
                  );
                }

                if (key === "colors") {
                  return (
                    <Grid key={key} xs={12} md={6}>
                      <TextField
                        type="color"
                        fullWidth
                        label={key}
                        onChange={(e) => {
                          setChoice((pre) => ({ ...pre, color: e.target.value }));
                        }}
                      />

                      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Box
                          sx={{ p: 1, border: "1px solid #eee", flex: 1, display: "flex", gap: 1 }}
                        >
                          {values.colors.map((color, index) => (
                            <Box
                              key={index}
                              sx={{ width: "30px", height: "30px", bgcolor: color }}
                            ></Box>
                          ))}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box sx={{ width: "30px", height: "30px", bgcolor: choice.color }}></Box>
                          <Button
                            onClick={() => {
                              if (choice.color.trim()) {
                                setValues({ ...values, colors: [...values.colors, choice.color] });
                              }
                            }}
                            variant="contained"
                            color="success"
                            size="small"
                          >
                            Thêm
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  );
                }

                if (key === "sizes") {
                  return (
                    <Grid key={key} xs={12} md={6}>
                      <TextField
                        type="text"
                        fullWidth
                        label={key}
                        name={key}
                        onChange={(e) => {
                          setChoice((pre) => ({ ...pre, size: e.target.value }));
                        }}
                      />

                      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Box
                          sx={{ p: 1, border: "1px solid #eee", flex: 1, display: "flex", gap: 1 }}
                        >
                          {values.sizes.map((size, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: "30px",
                                height: "30px",
                                border: "1px solid #333",
                                textAlign: "center",
                              }}
                            >
                              {size}
                            </Box>
                          ))}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: "30px",
                              height: "30px",
                              border: "1px solid #333",
                              textAlign: "center",
                            }}
                          >
                            {choice.size}
                          </Box>
                          <Button
                            onClick={() => {
                              if (choice.size.trim()) {
                                setValues({ ...values, sizes: [...values.sizes, choice.size] });
                              }
                            }}
                            variant="contained"
                            color="success"
                            size="small"
                          >
                            Thêm
                          </Button>
                        </Box>
                      </Box>
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
                          <MenuItem value={"default"}>mặc định</MenuItem>
                          <MenuItem value={"sales"}>sales</MenuItem>
                          <MenuItem value={"new"}>new</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                }

                if (key === "category") {
                  return (
                    <Grid key={key} xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{key}</InputLabel>
                        {categories.length && (
                          <Select
                            labelId="demo-simple-select-label"
                            label={key}
                            name={key}
                            onChange={handleChange}
                            required
                            value={values[key]}
                          >
                            {categories.map((category) => (
                              <MenuItem key={category._id} value={category._id}>
                                {category.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </FormControl>
                    </Grid>
                  );
                }

                if (key === "images") return <React.Fragment key={key}></React.Fragment>;

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
          <LoadingButton loading={status.loading} type="submit" variant="contained">
            Save details
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FormProduct;
