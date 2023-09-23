import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Unstable_Grid2 as Grid,
  ImageList,
  ImageListItem,
  Snackbar,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useCallback, useEffect, useState } from "react";
import useFetch from "src/hooks/useFetch";
import ButtonUpload from "./uploadCloudinary";
import { updateProduct } from "src/services/product.service";

const FormProductUpload = ({ product }) => {
  const [values, setValues] = useState({
    ...product,
    brand: product.brand ? product.brand._id : "",
    category: product.category ? product.category._id : "",
  });

  const [snackBar, setSnackBar] = useState();
  const { fetch, status } = useFetch();

  const handleCloseSnackBar = () => {
    setSnackBar(undefined);
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
    },

    [],
  );

  const handleUploadSuccess = async (url) => {
    const newState = { ...values, images: [url, ...values.images] };
    const { res } = await fetch(() => updateProduct(values._id, newState));
    setValues(newState);
    if (res) {
      setSnackBar({
        type: "success",
        message: "upload success",
      });
    }
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
      <Card sx={{ p: 1 }}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <div>
              <ButtonUpload onUploadSuccess={handleUploadSuccess} />
            </div>
            <Grid container spacing={3}>
              <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {values.images.map((item) => (
                  <ImageListItem key={item}>
                    <img src={item} alt={item} loading="lazy" />
                  </ImageListItem>
                ))}
              </ImageList>
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

export default FormProductUpload;
