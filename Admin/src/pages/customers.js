import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Loading from "src/components/loading";
import { useSelection } from "src/hooks/use-selection";
import useFetch from "src/hooks/useFetch";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormUser from "src/sections/customer/Form-Customer";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { CustomersTable } from "src/sections/customer/customers-table";
import FormChangePassword from "src/sections/customer/form-changePassword";
import { getAllUser } from "src/services/user.service";

const now = new Date();

const Page = () => {
  const customersSelection = useSelection("");
  const [userPage, setUserPage] = useState(initUserPage);
  const [form, setForm] = useState({});
  const { fetch, status } = useFetch();

  const router = useRouter();
  const pageIndex = Number(router.query?.pageIndex || 1);
  const search = router.query?.search || "";

  const handlePageChange = useCallback((event, value) => {}, []);

  const handleRowsPerPageChange = useCallback((event) => {}, []);

  const getInitUser = useCallback(() => {
    fetch(() => getAllUser({ pageIndex, search })).then(({ res, error }) => {
      if (res) {
        setUserPage(res.data.data);
      }
    });
  }, [fetch, pageIndex, search]);

  const handleChangePage = (event, page) => {
    router.push({
      pathname: router.pathname,
      query: {
        pageIndex: page,
        search,
      },
    });
  };

  const handleSearch = (search) => {
    router.push({
      pathname: router.pathname,
      query: {
        pageIndex: pageIndex,
        search,
      },
    });
  };

  const showFormChangePassword = (user) => {
    setForm({
      type: "changePassword",
      dataForm: user,
    });
  };

  useEffect(() => {
    getInitUser();
  }, [getInitUser]);

  return (
    <>
      <Head>
        <title>Customers</title>
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
          {form.dataForm && (form.type === "create" || form.type === "edit") && (
            <FormUser user={form.dataForm} type={form.type} onSubmitSuccess={getInitUser} />
          )}

          {form.dataForm && form.type === "changePassword" && (
            <FormChangePassword user={form.dataForm} onSubmitSuccess={getInitUser} />
          )}
        </SwipeableDrawer>

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Customers</Typography>
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
            <CustomersSearch onSubmit={handleSearch} />
            {status.loading && <Loading />}

            <CustomersTable
              count={userPage.total}
              items={userPage.users}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={pageIndex}
              selected={customersSelection.selected}
              onClickChangePassword={showFormChangePassword}
              onClickActionEdit={({ password, __v, ...user }) =>
                setForm({ type: "edit", dataForm: user })
              }
            />
            <Pagination
              onChange={handleChangePage}
              count={Math.ceil(userPage.total / userPage.limit)}
              size="small"
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const initUserPage = {
  search: "",
  users: [],
  pageIndex: 1,
  limit: 1,
  total: 0,
};

const initUser = {
  user_name: "",
  email: "",
  password: "",
  address: "",
  role: "user",
};

export default Page;
