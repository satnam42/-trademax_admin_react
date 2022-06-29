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
      minWidth: "400px",
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




const EditOrder = ({ refresh, setRefresh , order}) => {


  const  initialValues = {
     
      status:order.status,
      
    }   
    
  const navigate = useNavigate();
  const classes = useStyles();
  const [catRefresh, setCatRefresh] = useState(false);
  const { postApi, data, putApi, loading } = useGetSetPost();
  const [subCatId, setSubCatId] = useState("")
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [productAdded, setProductAdded] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));

    switch (name) {
      case "name": {
        const regex = /^[a-zA-Z ]{2,30}$/;
        if (!regex.test(value)) {
          setErrors((errors) => ({
            ...errors,
            [name]: "Please Enter a valid name",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [name]: "" }));
        }
        break;
      }
      case "units": {
        const regex = /^[a-zA-Z ]{2,30}$/;
        if (!value >= 1 && value <= 1000) {
          setErrors((errors) => ({ ...errors, [name]: "Units are not valid" }));
        } else {
          setErrors((errors) => ({ ...errors, [name]: "" }));
        }
        break;
      }

      case "description": {
        const regex = /^[a-zA-Z ]{2,30}$/;
        if (!value.length) {
          setErrors((errors) => ({
            ...errors,
            [name]: "Please enter description",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [name]: "" }));
        }
        break;
      }
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      orderID:order.orderID,
      type:values.status
      
    };

    const successActions = (data) => {
    
      setRefresh(!refresh);
     
    };

    
    postApi("/orders/updateStatus", body, successActions);
  };

  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
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
          {!productAdded && (
            <form>
              
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="grouped-native-select">
                        Status
                      </InputLabel>
                      <Select
                        native
                        defaultValue={values.status.slice(0,1)}
                        name="status"
                        onChange={(e) =>
                          setValues((values) => ({
                            ...values,
                            status: e.target.value,
                          }))
                        }
                        id="grouped-native-select"
                      >
                        <option aria-label="None" value="Select Status">
                          Select Status
                        </option>
                        
                        <option value="S">Shipped</option>
                        <option value="D">Delivered</option>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </div>
             
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={(e) => submitForm(e)}
                >
                  Update Order
                </Button>
              </Box>
            </form>
          )}
         
        </Container>
      </Box>
    </>
  );
};

export default EditOrder;