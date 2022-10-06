import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import ReCAPTCHA from "react-google-recaptcha";

import { fetchSignIn, toggleRememberUser } from "../shared/state/sharedActions";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    width: 45,
    height: 45,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  recaptcha: {
    display: (process.env.NODE_ENV === "production") ? "" : "none"
  }
});

class SignInPage extends Component {
  state = {
    userName: null,
    password: null,
    incidentRecaptcha: (process.env.NODE_ENV === "production") ? null : true,
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const { signIn } = this.props;
    signIn(this.state.userName, this.state.password);
  };

  setIncidentRecaptcha = () => {
    this.setState({ incidentRecaptcha: true });
  };

  render() {
    const {
      classes,
      isSignedIn,
      location,
      rememberMe,
      toggleRememberMe,
    } = this.props;
    let { from } = location.state || { from: { pathname: "/app/home" } };

    const recaptchaRef = React.createRef();

    if (isSignedIn) {
      return <Redirect to={from} />;
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              this.handleSignIn(e);
            }}
            autoComplete="off"
          > */}
          <div className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">User Name</InputLabel>
              <Input
                id="email"
                name="email"
                value={this.state.userName}
                onChange={(e) => {
                  this.setState({ userName: e.target.value });
                }}
                autoFocus
                autoComplete="nope"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                autoComplete="off"
              />
              <input
                type="submit"
                style={{ height: 0, width: 0, border: "none", padding: 0 }}
                hidefocus="true"
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  value="remember"
                  color="primary"
                  onChange={toggleRememberMe}
                />
              }
              label="Remember me"
            />

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
              onChange={(e) => {
                this.setIncidentRecaptcha(recaptchaRef.current.getValue());
              }}
              className={classes.recaptcha}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => this.handleSignIn(e)}
              // disabled={!this.state.incidentRecaptcha}
              disabled={!this.state.incidentRecaptcha}
            >
              Sign in
            </Button>
            {/* </form> */}
          </div>
        </Paper>
      </main>
    );
  }
}

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (userName, password) => {
      dispatch(fetchSignIn(userName, password));
    },
    toggleRememberMe: () => {
      dispatch(toggleRememberUser());
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.shared.signedInUser.isSignedIn,
    rememberMe: state.shared.signedInUser.rememberMe,
    ...ownProps,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(SignInPage));
