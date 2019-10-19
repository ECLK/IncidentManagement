import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useIntl } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  container: {
    display: "flex",
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const IncidentDescription = props => {
  const {
    classes,
    handledDescriptionChange,
    handleElectionChange,
    description,
    elections,
    selectedElection,
    disableDescription,
    formErrors
  } = props;
  let intl = useIntl();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container>
        <Grid item xs={12}>
          <TextField
            autoFocus
            id="incidentDescription"
            label="Description*"
            multiline
            fullWidth
            rowsMax="4"
            value={description}
            onChange={e => {
              handledDescriptionChange(e.target.value);
              formErrors.incidentDescriptionErrorMsg = null;
            }}
            className={classes.textField}
            margin="normal"
            disabled={disableDescription}
            helperText = {formErrors.incidentDescriptionErrorMsg || "Cannot be changed after Submitting"}
            error={formErrors.incidentDescriptionErrorMsg?true:false}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="election"
            select
            label={intl.formatMessage({
              id: "eclk.incident.management.report.incidents.election",
              defaultMessage: "Election"
            })}
            className={classes.textField}
            value={selectedElection}
            onChange={e => {
              handleElectionChange(e.target.value);
              formErrors.incidentElectionErrorMsg = null;
            }}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText={formErrors.incidentElectionErrorMsg || "Select corresponding election"}
            error={formErrors.incidentElectionErrorMsg?true:false}
            margin="normal"
          >
            {elections.map(option => (
              <MenuItem key={option.value} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
};

IncidentDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IncidentDescription);
