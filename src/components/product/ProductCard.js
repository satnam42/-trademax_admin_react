import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DraggableDialog from "../DraggableDialog";
import ViewImage from "./ViewImage";
import { useEffect, useState } from "react";
import { orderBy } from "lodash-es";
const ProductCard = ({
  product,
  setProductId,
  setProductName,
  setDelOpen,
  setEditFormOpen,
  setProductData,
  ...rest
}) => {
  const [openImagePopUp, setOpenImagePopUp] = useState(false);
  const [imageData, setImageData] = useState(false);
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    if (product.productFiles[0]) {
      setImageLink(product.productFiles[0].url);
    } else {
      setImageLink(
        "https://www.cureuppharma.in/wp-content/uploads/2018/06/dummy.jpg"
      );
    }
  }, []);

  const openImage = (image) => {
    setOpenImagePopUp(true);
    setImageData(image);
  };

  const handleDelOpen = (id, name) => {
    setDelOpen(true);
    setProductId(id);
    setProductName(name);
  };

  const handleEditOpen = (product) => {
    setEditFormOpen(true);
    setProductData(product);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between " }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditOpen(product)}
              size="small"
              startIcon={<EditIcon />}
            ></Button>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDelOpen(product._id, product.name)}
              startIcon={<DeleteIcon />}
            ></Button>
          </Grid>
        </Grid>
      </Box>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <img alt="Product" src={imageLink} height="150px" width="200px" />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.description}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <b>Price:</b> {product.price}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <b>Variation:</b> {product.variation.key}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            overflowX: "scroll",
            width: "100%",
            height: "100px",
          }}
        >
          {product.productFiles.map((image) => {
            return (
              <div
                style={{ width: "50%", display: "flex", flexDirection: "row" }}
              >
                <img
                  src={image.url}
                  width="120px"
                  onClick={() => openImage(image)}
                  height="80px"
                  alt="image"
                />
              </div>
            );
          })}
        </Grid>
      </Box>
      <DraggableDialog
        open={openImagePopUp}
        title="View Image"
        component={ViewImage}
        imageData={imageData}
        setOpen={setOpenImagePopUp}
      />
    </Card>
  );
};

export default ProductCard;
