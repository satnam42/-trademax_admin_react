import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  getAlertTitleUtilityClass,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useGetSetPost } from "src/services/services";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ProductListToolbar = ({setSubcatId,setAddFormOpen,...rest}) => {
  const classes = useStyles();
  const [cats, setCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [catsData, setCatsData] = useState({ cat: "", subCat: "" });
  const { postApi, loading } = useGetSetPost();

  useEffect(() => {
    const catSucccesActions = (data) => {
      setCats(data);
    };
    postApi("categories/getCategories", {}, catSucccesActions);
  }, []);

  const selectCat = (id) => {
    const subCatSucccesActions = (data) => {
      setSubCats(data);
    };
    postApi(
      "categories/getCategories",
      { category_id: id },
      subCatSucccesActions
    );
  };

  const getAll = () => {
    setSubcatId("");
    setCatsData({ cat: "", subCat: "" });
  };

  const catClick = (e) => {
    setCatsData({ ...catsData, cat: e.target.value });
  };

  const subCatClick = (e) => {
    setCatsData({ ...catsData, subCat: e.target.value });
  };

  return (
    <Box {...rest}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => setAddFormOpen(true)}
        >
          Add Product
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => getAll()}
              >
                Get All Products
              </Button>
              <Typography variant="h5" color="primary">
                Get Products By Catagories
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Main Catagory</InputLabel>
                <Select
                  defaultValue=""
                  value={catsData.cat}
                  onChange={(e) => catClick(e)}
                  id="grouped-select"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {cats.map((item) => (
                    <MenuItem
                      value={item._id}
                      onClick={() => selectCat(item._id)}
                    >
                     
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Sub Catagory</InputLabel>
                <Select
                  defaultValue=""
                  value={catsData.subCat}
                  onChange={(e) => subCatClick(e)}
                  id="grouped-select"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subCats.map((item) => (
                    <MenuItem
                      value={item._id}
                      onClick={() => setSubcatId(item._id)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
