import React from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

export const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    ".css-1y6f8wu-MuiDialogContent-root":{
        overflowY:"none"
    },
    ".css-hz1bth-MuiDialog-container":{
        height:"500px"
    }
  }));

const ViewImage = ({ imageData }) => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: blue[600],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  const classes = useStyles();
  return (
    
    <div style={{width:"500px" ,height:"300px"}}>
      <Grid item xs={12} sm={12} md={12}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={imageData.url}
            title="Image title"
          />
        </Card>
      </Grid>
      </div>
    
  );
};

export default ViewImage;
