import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import axios from 'axios'
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

const EditForm = ({editRecord,refreshData,setEditOpen}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)


  const editSubmit = async(values) => {
     setLoading(true)
    const body = {
     fullname: values.fullname,
     city:values.city,
     phoneNumber:values.phoneNumber

    }
    
    const config = {
      headers:{
        'x-access-token':localStorage.token
      }
    }

    try{

    const res = await  axios.put(`http://13.54.226.124:4604/api/users/update/${editRecord.id}`,body,config)
    setLoading(false)
    refreshData.setRefresh(!refreshData.refresh)
    setEditOpen(false)
  }
  catch(err){
   if(err.response){
     return alert(err.response.data.message)
   }
   alert(err)
   setLoading(false)
   setEditOpen(false)
  }

}

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
              phoneNumber: editRecord.phoneNumber||'',
              fullname: editRecord.fullname||'',
              city: editRecord.city||''
              
            }}

            validationSchema={
              Yup.object().shape({
                
                fullname: Yup.string().max(255).required('First name is required'),
              
                city: Yup.string().max(255).required('City is required'),

                phoneNumber: Yup.string()
                .required("Phone number is required")
                .matches(
                /^[789]\d{9}$/g,
                  "Invalid phone number" 
                )
              })
            }
           
            onSubmit={(values) => {
              // navigate('/app/dashboard', { replace: true });
             editSubmit(values)
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
                    Edit User Details
                  </Typography>
                  
                </Box>
                <TextField
                  error={Boolean(touched.fullname && errors.fullname)}
                  fullWidth
                  helperText={touched.fullname && errors.fullname}
                  label="Fullname"
                  margin="normal"
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  variant="outlined"
                />
                
                <TextField
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  fullWidth
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  label="Phone"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.phoneNumber}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.city && errors.city)}
                  fullWidth
                  helperText={touched.city && errors.city}
                  label="City"
                  margin="normal"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.city}
                  variant="outlined"
                />
                
              
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                   {loading ? <CircularProgress style={{color:"white"}}/>:"Update"}
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

export default EditForm;
