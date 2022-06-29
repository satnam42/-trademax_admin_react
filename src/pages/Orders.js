import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useGetSetPost } from "src/services/services";
import { useEffect } from "react";
import React, { useState } from "react";
import DraggableDialog from "src/components/DraggableDialog";
import EditOrder from "src/components/orders/EditOrder";
import { Helmet } from "react-helmet";
import ViewOrderDetails from "src/components/orders/ViewOrderDetails";


const Orders = (props) => {
  
  const [openUpdateOrder, setOpenUpdateOrder] = useState(false);

  const [orderDetails, setOrderDetails] = useState({});

  const [viewDetails, setViewDetails] = useState({});
  const [OpenDetails, setOpenDetails] = useState(false);


  const { data:orders, apiError, getApi, loading } = useGetSetPost();

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getApi("orders/getAllOrders");

    console.log("hello");
  }, [refresh]);


  const clickToEdit = (orderData) => {
    setOpenUpdateOrder(true);
    setOrderDetails(orderData);
  };

  const clickToView = (orderDetails) => {
    setOpenDetails(true);
    setViewDetails(orderDetails);
  };
  

  return (
    <>
    <Helmet>
        <title>Orders | TradeMax</title>
      </Helmet>
      <Card {...props}>
        <CardHeader title=" Orders" />
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell sortDirection="desc">Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && (
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "500px",
                      maxWidth: "600px",
                      alignItems: "center",
                      minHeight: "300px",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                {orders &&
                  orders.map((order) => (
                    <TableRow hover key={order._id}>
                      <TableCell>{order.orderID}</TableCell>
                      <TableCell>{order.address.fullName}</TableCell>

                      <TableCell>
                        {order?.createdOn.slice(0, order.createdOn.indexOf("T"))}
                        
                      </TableCell>
                      <TableCell>
                        <Chip
                          color="primary"
                          label={order.status}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          color="primary"
                          label={order.paymentStatus}
                          size="small"
                        />
                      </TableCell>
                      <TableCell  align="center">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          style={{ marginRight: '10px' }}
                          onClick={(e) => clickToEdit(order)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={(e) => clickToView(order)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </Card>
      <DraggableDialog
        title="Update status"
        open={openUpdateOrder}
        setOpen={setOpenUpdateOrder}
        order={orderDetails}
        component={EditOrder}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <DraggableDialog
        title="Order Details"
        open={OpenDetails}
        setOpen={setOpenDetails}
        order={viewDetails}
        component={ViewOrderDetails}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default Orders;
