import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  SvgIcon,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Loading from "src/components/loading";
import useFetch from "src/hooks/useFetch";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormUploadBlog from "../sections/blog/FormUploadBlog";
import { BlogCard } from "../sections/blog/blog-card";
import FormBlog from "../sections/blog/form-blog";
import { getAllBlog } from "../services/blog";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const { fetch, status } = useFetch();
  const [form, setForm] = useState({});

  const router = useRouter();
  const pageIndex = Number(router.query?.pageIndex || 1);
  const search = router.query?.search || "";

  const handleOnClickCard = (product) => {
    setForm({ type: "edit", dataForm: product });
  };

  const handleSubmitSuccess = () => {
    setForm({});
    getBlogInit();
  };

  const getBlogInit = useCallback(() => {
    fetch(() => getAllBlog()).then(({ res, error }) => {
      if (res) {
        setBlogs(res.data.data);
      }
    });
  }, [fetch]);

  const handleShowFormUpload = (product) => {
    setForm({ type: "edit", dataUpload: product });
  };

  useEffect(() => {
    getBlogInit();
  }, [getBlogInit]);

  return (
    <>
      <SwipeableDrawer
        onClose={() => setForm({})}
        onOpen={() => {}}
        anchor={"left"}
        open={form.type ? true : false}
      >
        <Box
          onClick={() => setForm({})}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            p: 1,
            ":hover": { transform: "scale(1.2)" },
            transition: "linear",
            cursor: "pointer",
          }}
        >
          <ChevronRightIcon width={20} />
        </Box>
        {form.dataForm && (
          <FormBlog onSubmitSuccess={handleSubmitSuccess} type={form.type} blog={form.dataForm} />
        )}

        {form.dataUpload && <FormUploadBlog blog={form.dataUpload} />}
      </SwipeableDrawer>
      <Head>
        <title>Blog | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Blog</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={getBlogInit}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowPathIcon />
                    </SvgIcon>
                  }
                  variant="outlined"
                  sx={{ mx: 1 }}
                >
                  Reload
                </Button>
                <Button
                  onClick={() => setForm({ type: "create", dataForm: initBlog })}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {status.loading && <Loading />}
            <Grid container spacing={3}>
              {blogs.map((blog) => (
                <Grid xs={12} md={6} lg={4} key={blog._id}>
                  <BlogCard
                    onClickupLoad={handleShowFormUpload}
                    onClickCard={handleOnClickCard}
                    blog={blog}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

const initBlog = {
  title: "",
  subtitle: "",
  content: "",
};
