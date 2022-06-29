import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./AddProduct.css";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef, useEffect, useState, isValidElement } from "react";
import { useGetSetPost } from "src/services/services";
import ImagesUpload from "./ImagesUpload";

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

let isValid = false;

let InitialVariation = {
  value: "",
  price: "",
};

let initialValues = {};

const AddProduct = ({
  refresh,
  setRefresh,
  setAddFormOpen,
  edit,
  productData,
}) => {
  if (edit) {
    initialValues = {
      name: productData.name,
      units: productData.units,
      price: productData.price,
      description: productData.description,
      content: productData.content,
      status: productData.status,
      key: productData.variation.key,
    };
    InitialVariation = productData.variation.items;
  } else {
    initialValues = {};
    InitialVariation = [{}];
  }

  const navigate = useNavigate();
  const classes = useStyles();
  const [catagories, setCatagories] = useState([]);
  const [subCatagories, setSubCatagories] = useState([]);
  const [catRefresh, setCatRefresh] = useState(false);
  const { postApi, data, putApi, loading } = useGetSetPost();
  const [subCatId, setSubCatId] = useState("");
  const [variationItems, setVariationItems] = useState(InitialVariation);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [productAdded, setProductAdded] = useState(false);
  const [productId, setProductId] = useState("");
  let subcatId;
  const catSuccessActions = (data) => {
    setCatagories(data);
  };

  const subCatSuccessActions = (data) => {
    setSubCatagories(data);
  };

  const addVariationItem = () => {
    setVariationItems((variationItems) => [
      ...variationItems,
      InitialVariation,
    ]);
  };

  const delVariationItem = (index1) => {
    const updated = variationItems.filter((item, index) => index != index1);
    setVariationItems(updated);
  };

  const handleVariationInput = (e, index1) => {
    const { name, value } = e.target;
    const updatedArray = variationItems.map((item, index) => {
      if (index === index1) {
        item = { ...item, [name]: value };
      }
      return item;
    });

    setVariationItems(updatedArray);
  };

  const selectMainCat = (e) => {
    setSubCatId(e.target.value);
  };

  const selectSubCat = (e) => {
    subcatId = e.target.value;
    setValues((values) => ({ ...values, subCatagory: e.target.value }));
  };

  useEffect(() => {
    postApi("/categories/getCategories", {}, catSuccessActions);
  }, [catRefresh]);

  useEffect(() => {
    if (subCatId) {
      postApi(
        "/categories/getCategories",
        {
          category_id: subCatId,
        },
        subCatSuccessActions
      );
    }
  }, [subCatId]);

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
       case "status": {
        const regex = /^[a-zA-Z ]{2,30}$/;
        if (!value.length) {
          setErrors((errors) => ({
            ...errors,
            [name]: "Please select an option",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [name]: "" }));
        }
        break;
      }
    }
  };

 const setValidation = (body) => {
    console.log(body);
    if(!body.name){
      return alert('Please Enter a valid name');
    }else if (!body.status){
      return alert('Please Select a status');
    }else if (!body.units){
      return alert('Please Enter a units');
    }else if (!body.price){
      return alert('Please Enter a price');
    }else if (!body.subCategory){
      return alert('Please Select a subCategory');
    }else if (!body.content){
      return alert('Please Enter a content');
    }else if (!body.description){
      return alert('Please Enter a description');
    }else if (!body.variation.key){
      return alert('Please Select a Variation Name');
    }else if (!body.variation.items[0].value){
      return alert('Please Select a Varient Value');
    }else if (!body.variation.items[0].price){
      return alert('Please Select a Varient Price');
    }else {
      isValid = true;
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      name: values.name,
      units: values.units,
      content: values.content,
      description: values.description,
      status: values.status,
      price: values.price,
      subCategory: values.subCatagory,
      variation: {
        key: values.key,
        items: variationItems,
      },
    };

    // console.log(body);
    setValidation(body);

    const successActions = (data) => {
      setProductAdded(true);
      setRefresh(!refresh);
      setProductId(data._id);
    };

    if(isValid){
      if (edit) {
        return putApi(
          `/products/update/${productData._id}`,
          body,
          successActions
          );
        }
        postApi("/products/addProduct", body, successActions);
      }
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
              <Box sx={{ mb: 3 }}>
                <Typography color="textPrimary" variant="h2">
                  {edit ? "Edit Product" : "Add Product"}
                </Typography>
              </Box>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Grid item style={{ marginRight: "30px" }} xs={6}>
                  <TextField
                    error={Boolean(errors.name)}
                    fullWidth
                    helperText={errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={values.name}
                    variant="outlined"
                  />
                  <TextField
                    // error={Boolean(errors.units)}
                    fullWidth
                    // helperText={errors.units}
                    label="Units"
                    margin="normal"
                    name="units"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    value={values.units}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    margin="normal"
                    name="price"
                    onChange={(e) => handleChange(e)}
                    value={values.price}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
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
                       displayEmpty={Boolean(errors.status)}
                        native
                        defaultValue={values.status}
                        name="status"
                        onChange={(e) =>
                          setValues((values) => ({
                            ...values,
                            status: e.target.value,
                          }))
                        }
                        id="grouped-native-select"
                      >
                        <option aria-label="None" value="not selected">
                          Select Status
                        </option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="grouped-native-select">
                        Catagory
                      </InputLabel>
                      <Select
                        native
                        defaultValue=""
                        onChange={(e) => selectMainCat(e)}
                        id="grouped-native-select"
                      >
                        <option aria-label="None" value="not selected">
                          Select A catagory
                        </option>
                        {catagories.map((catagory) => {
                          return (
                            <option value={catagory._id}>
                              {catagory.name}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="grouped-native-select">
                        Sub-Catagory
                      </InputLabel>
                      <Select
                        name="subCatagory"
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        onChange={(e) => selectSubCat(e)}
                      >
                        <option aria-label="None" value="not selected">
                          Select A Subcatagory
                        </option>
                        {subCatagories.map((catagory) => {
                          return (
                            <option value={catagory._id}>
                              {catagory.name}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </div>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline={true}
                  label="Content"
                  margin="normal"
                  name="content"
                  value={values.content}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  rows="3"
                />

                <TextField
                  fullWidth
                  multiline={true}
                  label="Description"
                  margin="normal"
                  name="description"
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  value={values.description}
                  rows="3"
                />

                {/* <TextField
                  error={Boolean(errors.variation)}
                  fullWidth
                  helperText={errors.variation}
                  label="Variation Name"
                  margin="normal"
                  name="key"
                  onChange={(e) => handleChange(e)}
                  value={values.key}
                  variant="outlined"
                /> */}
                 <Select native className={'w-100'}
                        defaultValue=""
                        name="key"
                        // value=""
                        onChange={(e) => handleChange(e)}
                        id="grouped-native-select"
                      >
                        <option aria-label="None" value="not selected">
                          Select Variation Name
                        </option>
                        <option value="size">Size</option>
                        <option value="color">Color</option>
                      </Select>

                <Paper
                  elevation={2}
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    padding: "30px",
                    marginTop: "20px",
                  }}
                >
                  {variationItems.map((item, index) => {
                    return (
                      <>
                        <div
                          style={{ justifyContent: "space-between" }}
                          className={classes.dynamicFormContainer}
                        >
                          <Typography variant="subtitle1" color="initial">
                            Varient
                          </Typography>
                          <div className={classes.dynamicFormToolbar}>
                            <Button
                              onClick={() => delVariationItem(index)}
                              fullWidth
                            >
                              <DeleteForeverIcon style={{ color: "red" }} />
                            </Button>
                          </div>
                        </div>
                        <TextField
                          error={Boolean(errors.value)}
                          style={{ marginLeft: "30px", width: "80%" }}
                          helperText={errors.value}
                          label="Value"
                          margin="normal"
                          name="value"
                          onChange={(e) => handleVariationInput(e, index)}
                          value={item.value}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(errors.price)}
                          style={{ marginLeft: "30px", width: "80%" }}
                          helperText={errors.price}
                          label="Price"
                          margin="normal"
                          name="price"
                          onChange={(e) => handleVariationInput(e, index)}
                          value={item.price}
                          variant="outlined"
                        />
                      </>
                    );
                  })}
                </Paper>
                <div className={classes.dynamicFormContainer}>
                  <div className={classes.dynamicFormToolbar}>
                    <Button
                      onClick={() => addVariationItem()}
                      fullWidth
                      style={{ width: "300px" }}
                    >
                      <AddIcon />
                    </Button>
                  </div>
                </div>
              </Grid>
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={(e) => submitForm(e)}
                >
                  {!edit ? "Add Product Now" : "Update Details"}
                </Button>
              </Box>
            </form>
          )}
          {productAdded && (
            <ImagesUpload
              refresh={refresh}
              setRefresh={setRefresh}
              setAddFormOpen={setAddFormOpen}
              productId={productId}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default AddProduct;
