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
import { TableOrder } from "src/sections/order/tableOrder";
import { getAllOrder } from "src/services/order.service";
import FormOrder from "src/sections/order/form-order";

const now = new Date();

const Page = () => {
  const [orderPage, setOrderPage] = useState(initOrder);
  const [form, setForm] = useState({});

  const { fetch, status } = useFetch();

  const getInitOrder = useCallback(() => {
    fetch(() => getAllOrder({})).then(({ res, error }) => {
      if (res) {
        setOrderPage(res.data.data);
      }
    });
  }, [fetch]);

  const handleSubmitSuccess = () => {
    getInitOrder();
  };

  useEffect(() => {
    getInitOrder();
  }, [getInitOrder]);

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
            <FormOrder
              order={form.dataForm}
              type={form.type}
              onSubmitSuccess={handleSubmitSuccess}
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
            </Stack>
            <CustomersSearch />
            {status.loading && <Loading />}

            <TableOrder
              items={orderPage.record}
              onClickActionEdit={({ __v, ...order }) => setForm({ type: "edit", dataForm: order })}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const initOrder = {
  record: [],
  pageIndex: 1,
  limit: 12,
  total: 1,
};

export default Page;
