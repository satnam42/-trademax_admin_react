import { useState, useEffect } from 'react';
import './subcatagory.css';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { Button } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as apiLinks from '../../services/apiLinks';
import Draggable from 'react-draggable';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import getInitials from 'src/utils/getInitials';
import { useGetSetPost } from 'src/services/services';
import Backdrop from '@material-ui/core/Backdrop';
import AddCatForm from './AddCatForm'
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paperComponent: {
    width: 'auto',
    height: 'auto'
  },
  root: {
    display: 'flex',
    justifyContent:"center",
    alignItems:"center",
    minWidth:"500px",
    minHeight:"400px",
  
    '& > * + *': {
      
    }
  }
}));

function PaperComponent(props) {
  const classes = useStyles();
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Subcatagory = ({ id,setId,catagoryName }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { loading, getApi, postApi, apiError } = useGetSetPost();
  const [subcatagory, setSubcatagory] = useState([]);
  const [delOpen, setDelOPen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [editRecord, setEditRecord] = useState({});
  const [addCatOpen, setAddCatOpen] = useState(false);
  const [subCatId, setSubCatId] = useState("")
  const [subCatName, setsubCatName] = useState("")




  
  const handleDelOpen = (id,name) => {
    setSubCatId(id);
    setsubCatName(name);
    setDelOPen(true);
  };


  const handleDelClose = () => {
    setDelOPen(false);
  };

  useEffect(() => {
    const successActions = (data) => {
      setSubcatagory(data);
    };

    if (id) {
      return postApi(
        '/categories/getCategories',
        { category_id: id },
        successActions
      );
    }
  }, [id,refresh]);

  const delCatagory = async () => {
    setLoading1(true);
    const query = `http://13.54.226.124:4604/api/categories/delete/${subCatId}`;
    const config = {
      headers: {
        // eslint-disable-next-line no-undef
        'x-access-token': localStorage.token
      }
    };

    try {
      const res = await axios.delete(query, config);
      setRefresh(!refresh);
      setLoading1(false);
      setDelOPen(false);
    } catch (err) {
      if (err.response) {
        setLoading1(false);
        setDelOPen(false);
        // eslint-disable-next-line no-undef
        return alert(err.response.data.message);
      }
      // eslint-disable-next-line no-undef
      alert(err);
    }
  }

  
  return (
    <>
      <Grid item xs lg={6} maxWidth="sm" justify="center">
        <Card>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                textAlign: 'center'
              }}
            >
              <Typography
                style={{ marginRight: '70px', marginTop: '40px' }}
                variant="h2"
                color="initial"
              >
                {catagoryName}
              </Typography>
              <Button
                style={{ marginTop: '40px' }}
                color="primary"
                variant="contained"
                onClick={() => setAddCatOpen(true)}
              >
                Add New
              </Button>
            </Box>
          </Box>
          <PerfectScrollbar>
            <Box>
               <div style={{ overflowY: 'scroll', maxHeight: '400px' }}></div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sub Catagory</TableCell>

                    {!loading&&<TableCell align="center">Action</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    id===""&&(<h1>No catagory Selected</h1>)
                    
                  }
                  {
                    (id!==""&&loading) && (<div className={classes.root}>
                      <CircularProgress />
                    </div>)
                  }
                  {
                    (id!==""&&!loading) && (
                      subcatagory.map((catagory) => (
                           
                        (
                         <TableRow
                         hover
                         key={catagory.id}
                         selected={selectedCustomerIds.indexOf(catagory.id) !== -1}
                       >
                         <TableCell>
                           <Box
                             sx={{
                               alignItems: 'center',
                               display: 'flex'
                             }}
                           >
                             <Avatar src={catagory.image} sx={{ mr: 2 }}>
                               {getInitials(catagory.name)}
                             </Avatar>
                             <Typography color="textPrimary" variant="body1">
                               {catagory.name}
                             </Typography>
                           </Box>
                         </TableCell>
                       
                         <TableCell align="center">
                         
                           <Button
                             variant="contained"
                             color="secondary"
                             size="small"
                             startIcon={<DeleteIcon />}
                             onClick={() => handleDelOpen(catagory._id,catagory.name)}
                           >
                             Delete
                           </Button>
                         </TableCell>
                       </TableRow>
                        )
                      
                     ))
                    )
                  }
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
      </Grid>
      <div>
        <Dialog
          open={delOpen}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are You sure Delete {subCatName} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDelClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => delCatagory()} color="primary">
              {!loading1 ? 'Delete' : <CircularProgress />}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={addCatOpen}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Add New Sub Catagory<br/><br/>
            <h3>{catagoryName}</h3>
          </DialogTitle>
          <DialogContent>
          
            <AddCatForm
            
              refresh={refresh}
              setAddCatOpen={setAddCatOpen}
              setRefresh={setRefresh}
              title={'subCategory'}
              id={id}
              
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => setAddCatOpen(false)}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Subcatagory;
