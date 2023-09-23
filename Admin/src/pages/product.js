import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";

import Head from "next/head";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Pagination,
  Stack,
  SvgIcon,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import FormProduct from "src/components/FormProduct";
import FormProductUpload from "src/components/FormUploadProduct";
import Loading from "src/components/loading";
import useFetch from "src/hooks/useFetch";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { ProductCard } from "src/sections/companies/product-card";
import { getAllProduct } from "src/services/product.service";

const Page = () => {
  const [productPage, setProductPage] = useState();
  const { fetch, status } = useFetch();
  const [form, setForm] = useState({});

  let pageIndex = 1;
  let search = "";

  const handleOnClickCard = (product) => {
    setForm({ type: "edit", dataForm: product });
  };

  const handleSubmitSuccess = () => {
    getProductsInit();
  };

  const getProductsInit = useCallback(() => {
    fetch(() => getAllProduct({ pageIndex, search })).then(({ res, error }) => {
      if (res) {
        setProductPage(res.data.data);
      }
    });
  }, [fetch, pageIndex, search]);

  const handleShowFormUpload = (product) => {
    setForm({ type: "edit", dataUpload: product });
  };

  useEffect(() => {
    getProductsInit();
  }, [getProductsInit]);

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
          <FormProduct
            onSubmitSuccess={handleSubmitSuccess}
            type={form.type}
            product={form.dataForm}
          />
        )}

        {form.dataUpload && <FormProductUpload product={form.dataUpload} />}
      </SwipeableDrawer>
      <Head>
        <title>Companies | Devias Kit</title>
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
                <Typography variant="h4">Companies</Typography>
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
                  onClick={getProductsInit}
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
                  onClick={() => setForm({ type: "create", dataForm: initProduct })}
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
            <CompaniesSearch />
            {status.loading && <Loading />}
            <Grid container spacing={3}>
              {productPage?.record?.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product._id}>
                  <ProductCard
                    onClickupLoad={handleShowFormUpload}
                    onClickCard={handleOnClickCard}
                    product={product}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

const initProduct = {
  name: "",
  price: 0,
  rate: 0,
  colors: [],
  sizes: [],
  brand: "",
  category: "",
  quantity: 0,
  status: "default",
  discount: 0,
  images: [],
  desc: "",
};
