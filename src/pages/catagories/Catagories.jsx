import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Catagory from "./Catagory";
import Subcatagory from "./Subcatagory";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
  },
}));

const Catagories = () => {
  const classes = useStyles();

  const [id, setId] = useState("");
  const [catagoryName, setCatagoryName] = useState("");

  return (
    <>
      <Grid container maxwidth={false}>
        <Grid container justify="center" className={classes.header}>
          <Grid item xs lg={12} maxWidth="sm" justify="center">
            <Paper elevation="3">
              <Typography variant="h1" mt={2} py={2} component="h2">
                Catagories
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ display: "flex" }}>
        <Catagory
          setId={setId}
          catagoryName={catagoryName}
          id={id}
          setCatagoryName={setCatagoryName}
        />
        <Subcatagory
          setId={setId}
          catagoryName={catagoryName}
          id={id}
          setCatagoryName={setCatagoryName}
        />
      </div>
    </>
  );
};

export default Catagories;
