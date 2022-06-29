import { Helmet } from 'react-helmet';
import { Box, Container, Pagination } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import { useState } from 'react';



const CustomerList = () => {

  const [page, setPage] = useState(1)

  const handleChangePage = (e,newPage)=>{

    setPage(newPage)
    
  }

  return(
    <>
      <Helmet>
        <title>Customers | Trade Max</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
       
          <Box sx={{ pt: 3 }}>
            <CustomerListResults page={page} />
            <Box sx={{ pt: 3,display:"flex", justifyContent:"center" }}>
            <Pagination  count={10} onChange={handleChangePage} color="primary" />
            </Box>
          </Box> 
        </Container>
        
      </Box>
      
    </>
  )
};

export default CustomerList;
