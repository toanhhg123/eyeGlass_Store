import { LoadingButton } from "@mui/lab";
import { Alert, Box, Link, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

import useFetch from "src/hooks/useFetch";
import * as Yup from "yup";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const {
    status: { loading },
    fetch,
  } = useFetch();
  const formik = useFormik({
    initialValues: {
      user_name: "admin",
      password: "Password123!",
      submit: null,
    },
    validationSchema: Yup.object({
      user_name: Yup.string()
        .min(3, "tên đăng nhập quá ngắn")
        .max(255)
        .required("bắt buốc phải nhập"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      const { error, data } = await fetch(() => auth.signIn(values.user_name, values.password));
      console.log({ error, data });
      if (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error });
        helpers.setSubmitting(false);
        return;
      }

      router.push("/");
    },
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/");
    }
  }, [auth.isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Login | Devias Kit</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.user_name && formik.errors.user_name)}
                  fullWidth
                  helperText={formik.touched.user_name && formik.errors.user_name}
                  label="user name"
                  name="user_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.user_name}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <LoadingButton
                fullWidth
                loading={loading}
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Login
              </LoadingButton>

              <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                <div>
                  You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                </div>
              </Alert>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
