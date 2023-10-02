import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Unstable_Grid2 as Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useCallback, useState } from "react";
import useFetch from "src/hooks/useFetch";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { createBlog, removeBlog, updateBlog } from "../../services/blog";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const FormBlog = ({ blog, onSubmitSuccess, type }) => {
  const [values, setValues] = useState({
    ...blog,
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
        const { error } = await fetch(() => createBlog(values));
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
        const { error } = await fetch(() => updateBlog(values._id, values));

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

  const handleDelete = async () => {
    const { error } = await fetch(() => removeBlog(values._id));

    if (error) {
      setSnackBar({
        type: "error",
        message: error,
      });
      return;
    }

    setSnackBar({
      type: "success",
      message: "xoá thành công",
    });

    onSubmitSuccess();
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
                if (key === "image") return <React.Fragment key={key}></React.Fragment>;

                if (key === "content")
                  return (
                    <QuillEditor
                      style={{
                        padding: "10px",
                        margin: "2rem 0",
                      }}
                      key={key}
                      value={values.content}
                      onChange={(content) => {
                        console.log(content);
                        setValues({
                          ...values,
                          content,
                        });
                      }}
                      modules={quillModules}
                      formats={quillFormats}
                      className="w-full h-[70%] mt-10 bg-white"
                    />
                  );
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
          {type === "edit" && (
            <LoadingButton
              loading={status.loading}
              onClick={handleDelete}
              variant="contained"
              color="error"
            >
              delete
            </LoadingButton>
          )}

          <LoadingButton loading={status.loading} type="submit" variant="contained">
            Save details
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }],
    ["code-block"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
  "code-block",
];

export default FormBlog;
