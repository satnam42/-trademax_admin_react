import { useState, useEffect } from 'react';
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
import AddNewForm from './AddNewForm';
import getInitials from 'src/utils/getInitials';
import { useGetSetPost } from 'src/services/services';
import EditForm from './EditForm';
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
  Typography
} from '@material-ui/core';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paperComponent: {
    width: 'auto',
    height: 'auto'
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

const CustomerListResults = ({ cust, page, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const { loading, getApi, postApi, apiError, data } = useGetSetPost();
  const [customers, setCustomers] = useState([]);
  const [delOpen, setDelOPen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [editRecord, setEditRecord] = useState({});

  const handleClickOpen = (id) => {
    setId(id);
    setDelOPen(true);
  };

  const handleDelClose = () => {
    setDelOPen(false);
  };

  const handleEditButton = (record) => {
    setEditRecord(record);
    setEditOpen(true);
  };

  useEffect(() => {
    const successActions = (data) => {
      setCustomers(data);
    };

    const query =  `/users/getUsers?pageNo=${page}&pageSize=15`

    getApi(query, successActions);
  }, [refresh,page]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };


  const delUser = async () => {
    setLoading1(true);
    const query = `http://13.54.226.124:4604/api${apiLinks.DELETE}/${id}`;
    const config = {
      headers: {
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
        return alert(err.response.data.error);
      }
      alert(err);
    }
  };

  return (
    <>
      <Card {...rest}>
        <Box>
           <div style={{display:"flex", justifyContent:"space-between",flexDirection:"row",alignItems:"center"}}>
             <Typography style={{marginLeft:"300px",marginTop:"30px"}} variant="h2" color="primary">Customers </Typography>
            <Button
              style={{ marginRight: '70px',marginTop:"30px" }}
              color="primary"
              variant="contained"
              onClick={() => setAddFormOpen(true)}
            >
              Add User
            </Button>
            </div>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  loading && <div style={{display:"flex", marginLeft:"500px", maxWidth:"600px", alignItems:"center",minHeight:"450px"}}>
                 <CircularProgress/>
                  </div>
                }
                {(!loading && data) && data.map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar src={customer.avatar} sx={{ mr: 2 }}>
                          {getInitials(customer.fullname)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {customer.fullname}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: '10px' }}
                        startIcon={<EditIcon />}
                        onClick={() => handleClickOpen(customer.id)}
                        onClick={() => handleEditButton(customer)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleClickOpen(customer.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        
      </Card>
      <Dialog
        open={delOpen}
        onClose={handleDelClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Delete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are You sure Delete this User ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => delUser()} color="primary">
            {loading1 ? <CircularProgress /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={addFormOpen}
        onClose={handleDelClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Add New User
        </DialogTitle>
        <DialogContent>
          <AddNewForm
            refreshData={{
              refresh,
              setRefresh
            }}
            setAddFormOpen={setAddFormOpen}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setAddFormOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => setAddFormOpen(false)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Edit User
        </DialogTitle>
        <DialogContent>
          <EditForm
            editRecord={editRecord}
            refreshData={{
              refresh,
              setRefresh
            }}
            setEditOpen={setEditOpen}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setEditOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setEditOpen(false)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default CustomerListResults;
