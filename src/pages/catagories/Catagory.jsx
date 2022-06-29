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
import getInitials from 'src/utils/getInitials';
import { useGetSetPost } from 'src/services/services';
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
import AddCatForm from './AddCatForm';

const useStyles = makeStyles((theme) => ({
  paperComponent: {
    width: 'auto',
    height: 'auto'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '500px',
    minHeight: '400px',

    '& > * + *': {}
  },
  tableRow: {
    backgroundColor: "green !important",
  },
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

const Catagory = ({ setId, id, catagoryName, setCatagoryName }) => {
  const classes = useStyles();
  <TableRow classes={{ root: classes.tableRow, }} />
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { loading, getApi, postApi, apiError } = useGetSetPost();
  const [catagories, setCatagories] = useState([]);
  const [delOpen, setDelOPen] = useState(false);
  const [addCatOpen, setAddCatOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [editRecord, setEditRecord] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('')
  const handleDelOpen = (id, name) => {
    setId(id);
    setCatagoryName(name);
    setDelOPen(true);
  };

  const hanldeSelectCat = (id, name) => {
    setId(id);
    setCatagoryName(name);
    setSelectedCategory(id)
  }

  const handleDelClose = () => {
    setDelOPen(false);
  };

  const handleRow = (value) => {
    console.log("check selected value", value)
    setSelectedCategory(value)
  }


  useEffect(() => {
    const successActions = (data) => {
      setCatagories(data);
      hanldeSelectCat(data[0]._id, data[0].name);
    };

    postApi('/categories/getCategories', {}, successActions);
  }, [refresh]);





  const delCatagory = async () => {
    setLoading1(true);
    const query = `http://13.54.226.124:4604/api/categories/delete/${id}`;
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
       
        return alert(err.response.data.message);
      }
     
      alert(err);
    }
  };

  return (
    <>
      <Grid item xs lg={6} maxWidth="sm" mr={5} justify="center">
        <Card>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                style={{ marginRight: '70px', marginTop: '40px' }}
                color="primary"
                variant="contained"
                onClick={() => setAddCatOpen(true)}
              >
                Add New
              </Button>
            </Box>
          </Box>

          <Box>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Catagory Name</TableCell>

                    {!loading && <TableCell align="center">Action</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && (
                    <div className={classes.root}>
                      <CircularProgress />
                    </div>
                  )}
                  {!loading &&
                    catagories.map((catagory) => (
                      <TableRow
                        hover
                        key={catagory.id}
                        onClick={() => {
                         
                          handleRow(catagory._id);
                        }}
                        selected={
                          selectedCustomerIds.indexOf(catagory._id) !== -1
                        }
                        style={{ backgroundColor: selectedCategory == catagory._id ? "#bdbdbd" : 'white' }}
                        
                      >
                        <TableCell
                          onClick={() => {
                            hanldeSelectCat(catagory._id, catagory.name);
                          }}
                        >
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
                            onClick={() =>
                              handleDelOpen(catagory._id, catagory.name)
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Box>
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
              Are You sure Delete {catagoryName} ?
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
            Add New Catagory
          </DialogTitle>
          <DialogContent>
            <AddCatForm
              refresh={refresh}
              setAddCatOpen={setAddCatOpen}
              setRefresh={setRefresh}
              title={'category'}
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

export default Catagory;
