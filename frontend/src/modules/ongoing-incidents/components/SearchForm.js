import React, { useEffect } from "react";

import { Formik, withFormik } from "formik";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    cursor: "pointer"
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    cursor: "pointer"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    minWidth: 300
  },
  buttonContainer: {
    margin: theme.spacing.unit * 2,
    minWidth: 300,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 1
  },
  datePicker: {},
  separator: {
    height: "10px"
  }
});

function SearchForm(props) {
  const filterIncidents = values => {
    props.getIncidents(values);
  };

  useEffect(() => {
    filterIncidents();
  }, []);
  const { classes, categories } = props;
  return (
    <Formik
      initialValues={props.incidentSearchFilter}
      onSubmit={(values, { setSubmitting }) => {
        let preparedValues = {
          ...values,
          startTime: moment(values.startDate + " " + values.startTime).toDate(),
          endTime: moment(values.endDate + " " + values.endTime).toDate()
        };
        delete preparedValues["startDate"];
        delete preparedValues["endDate"];
        filterIncidents(preparedValues);
      }}
      onReset={() => {
        this.filterIncidents();
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="status-label-placeholder">
                    Status
                  </InputLabel>
                  <Select
                    input={
                      <Input name="status" id="status-label-placeholder" />
                    }
                    displayEmpty
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"NEW"}>New</MenuItem>
                    <MenuItem value={"REQUEST_MORE_INFO"}>
                      Request More Info
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="response-time-label-placeholder">
                    Reponse time
                  </InputLabel>
                  <Select
                    input={
                      <Input
                        name="responseTime"
                        id="response-time-label-placeholder"
                      />
                    }
                    displayEmpty
                    name="maxResponseTime"
                    value={values.maxResponseTime}
                    onChange={handleChange}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"1"}>Less than 1 hour</MenuItem>
                    <MenuItem value={"2"}>Less than 2 hours</MenuItem>
                    <MenuItem value={"3"}>Less than 3 hours</MenuItem>
                    <MenuItem value={"4"}>Less than 4 hours</MenuItem>
                    <MenuItem value={"5"}>Less than 5 hour</MenuItem>
                    <MenuItem value={"6"}>Less than 6 hours</MenuItem>
                    <MenuItem value={"7"}>Less than 7 hours</MenuItem>
                    <MenuItem value={"8"}>Less than 8 hours</MenuItem>
                    <MenuItem value={"9"}>Less than 9 hours</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="status-label-placeholder">
                    Severity
                  </InputLabel>
                  <Select
                    input={
                      <Input name="severity" id="severity-label-placeholder" />
                    }
                    displayEmpty
                    name="severity"
                    value={values.severity}
                    onChange={handleChange}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"insignificant"}>Insignificant</MenuItem>
                    <MenuItem value={"MINOR"}>Minor</MenuItem>
                    <MenuItem value={"MODERATE"}>Moderate</MenuItem>
                    <MenuItem value={"MAJOR"}>Major</MenuItem>
                    <MenuItem value={"CRITICAL"}>Critical</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="status-label-placeholder">
                    Category
                  </InputLabel>
                  <Select
                    input={
                      <Input name="category" id="severity-label-placeholder" />
                    }
                    displayEmpty
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.map(({ sub_category }) => (
                      <MenuItem value={sub_category}>{sub_category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    margin="normal"
                    id="start-date"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={values.startDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={handleChange}
                  />
                  <TextField
                    id="time"
                    label="Start Time"
                    name="startTime"
                    type="time"
                    value={values.startTime}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    margin="normal"
                    id="date"
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={values.endDate}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={handleChange}
                  />
                  <TextField
                    id="time"
                    label="End Time"
                    type="time"
                    name="endTime"
                    value={values.endTime}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl className={classes.buttonContainer}>
                  {/* Reset workflow is pending
                       <Button
                        onClick={handleReset}
                        variant="contained"
                        size="large"
                        color="primary"
                      >
                        Reset
                      </Button> */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Search
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

export default withStyles(styles)(SearchForm);
