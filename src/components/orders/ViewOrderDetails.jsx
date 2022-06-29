import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef, useEffect, useState } from "react";
import { useGetSetPost } from "src/services/services";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input ": {
      width: "80%",
      margin: "20px",
    },
    formControl: {
      margin: theme.spacing(1),
      Width: "800px",
    },
  },
  select: {
    color: "red",
  },
  dynamicFormContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  dynamicFormToolbar: {
    display: "flex",
  },
}));


const ViewOrderDetails = (order) => {


  const [orderDetails, setOrderDetails] = useState(order);
  console.log('orderDetails', orderDetails)
  const [imageData, setImageData] = useState();

  const openImage = async (data) => {
    await setImageData(data);
    console.log("image showed", imageData)

  };

  return (
    <>

      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md" spacing={2}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                <Typography color="textPrimary" variant="h3">
                  Address Details:-
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  <b>Address: </b>{orderDetails?.order?.address?.address}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  <b>City: </b>{orderDetails?.order?.address?.city}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  <b>Country: </b>{orderDetails?.order?.address?.country}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  <b>Full Name: </b>{orderDetails?.order?.address?.fullName}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  <b>State: </b>{orderDetails?.order?.address?.state}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  <b>ZipCode: </b>{orderDetails?.order?.address?.zipCode}
                </Typography>
                <Typography color="textPrimary" variant="h3">
                  Ordered Products:-
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    pb: 3,
                  }}
                >
                </Box>

                <Box sx={{ p: 2 }}>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      justifyContent: "space-between",
                      display: "flex",
                      flex: 1,
                      flexDirection: "row",
                      // overflowX: "scroll",
                      width: "100%",
                      // height: "130px",
                    }}
                  >
                    {
                      orderDetails.order.cart.map((value, index) => {
                        return (
                          <>
                            <div style={{
                              width: "100%", borderTop: "1px solid #00000040", display: "flex",
                              columnGap: "15px"
                            }}>
                              <div>
                                <img
                                  src={value.cartId.product?.productFiles[0].url}
                                  width="120px"
                                  // border="1px solid grey"
                                  onClick={() => {
                                    openImage(value.cartId);
                                  }}
                                  style={{ objectFit: 'contain' }}
                                  height="80px"
                                  alt="image"
                                />
                              </div>
                              <div>
                                <Typography color="textPrimary" variant="body1">
                                  <b>Product Name: </b> {value.cartId.product.name}
                                </Typography>
                                <Typography color="textPrimary" variant="body1">
                                  <b>Product Price: </b>  {value.cartId.product.price}
                                </Typography>
                                <Typography color="textPrimary" variant="body1">
                                  <b>Quantity: </b>  {value.cartId.product.units}
                                </Typography><Typography color="textPrimary" variant="body1">
                                  <b>Size: </b>
                                  {/* {value.cartId.product.size} */}
                                  {value?.cartId?.product?.variation?.items[index]?.value}
                                </Typography>
                              </div>
                            </div>
                            <br />
                          </>
                        )
                      })
                    }
                  </Grid>
                </Box>

                {/* <div >
                  <Typography color="textPrimary" variant="body1">
                    <b>Product Name: </b> {imageData?.product.name}
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    <b>Product Price: </b>  {imageData?.product.price}
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    <b>Quantity: </b>  {imageData?.quantity}
                  </Typography>
                </div> */}

              </div>
            </Grid>
          </div>
        </Container>
      </Box >
    </>
  );
};

export default ViewOrderDetails;