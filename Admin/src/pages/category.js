import ChevronRightIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, SwipeableDrawer, Typography } from "@mui/material";
import Loading from "src/components/loading";
import useFetch from "src/hooks/useFetch";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormBrand from "src/sections/brand/FormBrand";
import { TableBrand } from "src/sections/brand/brand-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { getAllCategory } from "src/services/product.service";

const now = new Date();

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});

  const { fetch, status } = useFetch();

  const getInitCategories = useCallback(() => {
    fetch(getAllCategory).then(({ res, error }) => {
      if (res) {
        setCategories(res.data.data);
      }
    });
  }, [fetch]);

  useEffect(() => {
    getInitCategories();
  }, [getInitCategories]);

  return (
    <>
      <Head>
        <title>Danh mục</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
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
            <FormBrand brand={form.dataForm} type={form.type} onSubmitSuccess={getInitCategories} />
          )}
        </SwipeableDrawer>

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Quản lí danh mục</Typography>
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
                  onClick={() => setForm({ type: "create", dataForm: initCategory })}
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
            <CustomersSearch />
            {status.loading && <Loading />}

            <TableBrand
              items={categories}
              onClickActionEdit={({ __v, ...category }) =>
                setForm({ type: "edit", dataForm: category })
              }
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const initCategory = {
  name: "",
  desc: "",
};

export default Page;
