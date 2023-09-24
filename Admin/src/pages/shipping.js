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
import { CustomersSearch } from "src/sections/customer/customers-search";
import FormShipping from "src/sections/shipping/formShipping";
import { TableShipping } from "src/sections/shipping/shipping-table";
import { getAllShipping as getShippings } from "src/services/shipping.service";

const now = new Date();

const Page = () => {
  const [shippings, setShippings] = useState([]);
  const [form, setForm] = useState({});

  const { fetch, status } = useFetch();

  const getAllShipping = useCallback(() => {
    fetch(getShippings).then(({ res, error }) => {
      if (res) {
        setShippings(res.data.data);
      }
    });
  }, [fetch]);

  useEffect(() => {
    getAllShipping();
  }, [getAllShipping]);

  return (
    <>
      <Head>
        <title>Quản lí dơn vận</title>
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
            <FormShipping
              shipping={form.dataForm}
              type={form.type}
              onSubmitSuccess={getAllShipping}
            />
          )}
        </SwipeableDrawer>

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Quản lí trạng thái đơn hàng</Typography>
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
                  onClick={() => setForm({ type: "create", dataForm: initUser })}
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

            <TableShipping
              items={shippings}
              onClickActionEdit={({ __v, ...brand }) => setForm({ type: "edit", dataForm: brand })}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const initUser = {
  status: "",
  desc: "",
};

export default Page;
