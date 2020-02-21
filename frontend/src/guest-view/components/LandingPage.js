import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../../app/Logo";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import CheckStatusIcon from "@material-ui/icons/Announcement";
import { Link } from "react-router-dom";
import { changeLanguage } from "../../shared/state/sharedActions";

const styles = theme => ({
  root: {
    margin: 20
  },
  button: {
    margin: theme.spacing.unit
  },
  cardContent: {
    minHeight: 200
  },
  icon: {
    marginTop: 30,
    fontSize: 40
  },
  cardText: {
    textAlign: "center"
  },
  hide: {
    display: "none",
  }
});

function HomePage(props) {
  const { classes } = props;
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
            <Logo />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(changeLanguage("si"))}
              className={classes.button}
            >
              {" "}
              Sinhala{" "}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(changeLanguage("ta"))}
              className={classes.button}
            >
              {" "}
              Tamil{" "}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(changeLanguage("en"))}
              className={classes.button}
            >
              {" "}
              English{" "}
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={24}
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
        className={classes.hide}
      >
        <Grid item xs={12} sm={6} md={3} >
          <Card className={classes.card}>
            <Link to="/report">
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    className={classes.cardText}
                    color="primary"
                  >
                    <FormattedMessage
                      id="eclk.incident.management.report.incidents"
                      defaultMessage={"Report an Incident"}
                    />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    className={classes.cardText}
                    color="primary"
                  >
                    <NoteAddIcon className={classes.icon} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <Link to="/">
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    className={classes.cardText}
                    color="primary"
                  >
                    <FormattedMessage
                      id="eclk.incident.management.check.incident.status"
                      defaultMessage={"Check Status on Incident"}
                    />
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    className={classes.cardText}
                    color="primary"
                  >
                    <CheckStatusIcon className={classes.icon} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={24}
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid xs={12}>
          <Typography
            variant="h5"
            component="h5"
            className={classes.cardText}
            color="primary"
          >
            Already registered user?
            <Button color="primary" className={classes.button} href="/sign-in">
              Sign In
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
