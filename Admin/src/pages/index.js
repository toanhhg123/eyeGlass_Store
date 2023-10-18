import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useEffect, useState } from "react";
import { getReport } from "../services/report";
import { ExportToExcel } from "../components/ExportToExcel";

const now = new Date();

const Page = () => {
  const [report, setReport] = useState({
    products: [],
    users: [],
    orders: [],
  });

  const priceProduct = report.products.reduce((total, { price }) => total + price, 0);
  const priceOrder = report.orders.reduce((total, { price }) => total + price, 0);

  console.log(report.orders);

  useEffect(() => {
    getReport().then(({ data }) => {
      setReport(data.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Overview | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, margin: 1 }}>
          <ExportToExcel text={"export user"} apiData={report.users} fileName={"users"} />
          <ExportToExcel text={"export product"} apiData={report.products} fileName={"product"} />
          <ExportToExcel text={"export order"} apiData={report.orders} fileName={"orders"} />
        </Box>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={`$${priceOrder / 1000}k`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={report.users.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value={`$${priceProduct / 1000}k`} />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={report.products.slice(0, 5).map(({ _id, images, name }) => ({
                  id: _id,
                  image: images[0],
                  name,
                  updatedAt: subHours(now, 6).getTime(),
                }))}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={report.orders.slice(0, 10).map(({ _id, user, shipping, color }) => ({
                  id: _id,
                  ref: color,
                  amount: 32.54,
                  customer: {
                    name: user.user_name,
                  },
                  createdAt: 1554670800000,
                  status: shipping?.status,
                }))}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
