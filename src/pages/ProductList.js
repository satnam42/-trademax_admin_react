import { Helmet } from "react-helmet";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Pagination,
  Button,
  TablePagination,
} from "@material-ui/core";
import ProductListToolbar from "src/components/product/ProductListToolbar";
import ProductCard from "src/components/product//ProductCard";
import { LocalDining } from "@material-ui/icons";
import { useGetSetPost } from "src/services/services";
import { useEffect, useState } from "react";
import AddProduct from "src/components/product/AddProduct";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paperComponent: {
    width: "auto",
    height: "auto",
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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { loading, data, getApi } = useGetSetPost();
  const [delOpen, setDelOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [productData, setProductData] = useState({});
  const [subcatId, setSubcatId] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const successActions = (items) => {
    setProducts(items);
  };

  let query;
  useEffect(() => {
    query = `/products/getAllProducts?pageNo=${page}&pageSize=${rowsPerPage}`;

    if (subcatId) {
      query = `/products/productsBySubCategories?pageNo=${page}&pageSize=${rowsPerPage}&subCategoryId=${subcatId}`;
    }

    getApi(query, successActions);
  }, [refresh, page, subcatId]);

  const delProduct = async () => {
    setLoading1(true);
    const query = `http://13.54.226.124:4604/api/products/deleteProduct/${productId}`;
    const config = {
      headers: {
        "x-access-token": localStorage.token,
      },
    };

    try {
      const res = await axios.delete(query, config);
      setRefresh(!refresh);
      setLoading1(false);
      setDelOpen(false);
    } catch (err) {
      if (err.response) {
        setLoading1(false);
        setDelOpen(false);
        return alert(err.response.data.message);
      }
      alert(err);
    }
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    const query = `/products/getAllProducts?pageNo=${page}&pageSize=${rowsPerPage}`;

    const successActions = (data) => {
      setProductData(data);
    };

    getApi(query, successActions);
  };

  return (
    <>
      <Helmet>
        <title>Products | TradeMax</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar
            setSubcatId={setSubcatId}
            setAddFormOpen={setAddFormOpen}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "300px",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
              {!loading &&
                products.map((product) => (
                  <Grid item key={product.id} lg={4} md={6} xs={12}>
                    <ProductCard
                      product={product}
                      setDelOpen={setDelOpen}
                      setEditFormOpen={setEditFormOpen}
                      setProductId={setProductId}
                      setProductName={setProductName}
                      setProductData={setProductData}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              count={10}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Container>
      </Box>
      <Dialog
        open={addFormOpen}
        onClose={() => setAddFormOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        ></DialogTitle>
        <DialogContent>
          <AddProduct
            refresh={refresh}
            setRefresh={setRefresh}
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
        </DialogActions>
      </Dialog>
      <Dialog
        open={editFormOpen}
        onClose={() => setEditFormOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        ></DialogTitle>
        <DialogContent>
          <AddProduct
            refresh={refresh}
            setRefresh={setRefresh}
            setEditFormOpen={setEditFormOpen}
            productData={productData}
            edit={true}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setEditFormOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        ></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You sure Delete {productName} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDelOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => delProduct()} color="primary">
            {!loading1 ? "Delete" : <CircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductList;
