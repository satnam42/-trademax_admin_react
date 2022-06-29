import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormHelperText,
  Link,
  Select,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel
} from '@material-ui/core';
import ImageUpload from '../../components/product/ImagesUpload';
import { useGetSetPost } from 'src/services/services';
import { useState, useEffect } from 'react';
import { Refresh } from '@material-ui/icons';
import { useStyles } from 'src/components/product/ViewImage';



const AddCatForm = ({ refresh, setRefresh, setAddCatOpen, title, id }) => {
  const navigate = useNavigate();
  const { loading, postApi, data } = useGetSetPost();
  const [imageRaw, setImageRaw] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [catagoryName, setCategoryName] = useState("");

  // useEffect(() => {
  //   // Update the document
  //    title using the browser API
  //   // document.title = `You clicked ${count} times`;
  // });
  const onChangeFiles = (e) => {
    if (e.target.files.length) {
      setImageRaw(e.target.files[0])
      // eslint-disable-next-line no-undef
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  };


  const successActions = () => {
    setAddCatOpen(false)
    setRefresh(!refresh)
  }

  const handleCatagory = (e) => {
    setCategoryName(e.target.value);
  };

  const SubmitForm = (values) => {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('name', values.firstName);
    formData.append('file', imageRaw);
    if (title === 'category') {
      postApi('/categories/createCategory', formData, successActions);
    } else {
      formData.append('parent_id', id);
      postApi('/categories/createSubCategory', formData, successActions);
    }
  };
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Register | TradeMax</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              firstName: ''
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .max(255)
                .required('First name is required')
            })}
            onSubmit={(values) => {

              // navigate('/app/dashboard', { replace: true });
              SubmitForm(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                

                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                
                <div style={{ display: "flex", width: "500px", justifyContent: "flex-end", flexDirection: "row-reverse" }}>
                  <input style={{ marginTop: "20px" }} type="file" onChange={(e) => onChangeFiles(e)} />
                  {imagePreview &&
                    <img src={imagePreview} width="50%" />
                  }
                </div>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                ></Box>

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {loading ? <CircularProgress /> : "Add Now"}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default AddCatForm;
