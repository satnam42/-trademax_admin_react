import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios'
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useState } from 'react';

const AddNewForm = ({refreshData,setAddFormOpen}) => {
  const navigate = useNavigate();
   
  const [loading, setLoading] = useState(false)

  const submitAddNew = async(values)=>{
    setLoading(true)
    const body = {
      email:values.email,
    fullname:values.fullname,
     password:values.password
  }
   
 
   const res = await axios.post("http://13.54.226.124:4604/api/users/register",body)
   setLoading(false)
   refreshData.setRefresh(!refreshData.refresh)
   setAddFormOpen(false)

  }

  return (
    <>
 
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
              email: '',
              fullname: '',
             
              password: '',
            
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                fullname: Yup.string().max(255).required('First name is required'),
              
                password: Yup.string().max(255).required('password is required'),
              })
            }

            onSubmit={(values) => {
              // navigate('/app/dashboard', { replace: true });
              console.log(values)
              submitAddNew(values)
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
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Full Name"
                  margin="normal"
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  variant="outlined"
                />
                
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
               
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                   {loading?<CircularProgress/>:"Add User"}
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

export default AddNewForm;
