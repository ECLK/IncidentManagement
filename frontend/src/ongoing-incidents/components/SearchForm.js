import { Formik, withFormik } from "formik";
import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Search from './search'
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSelector } from 'react-redux'
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
  formControlSearch: {
    margin: theme.spacing.unit * 2,
    minWidth: 1200 + theme.spacing.unit * 12,

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
  },
  searchButton: {
    margin: "14px 0px 17px 10px"
  }
});

function SearchForm(props) {
  const filterIncidents = values => {
    props.handleSearchClick(values);
  };

  useEffect(() => {
    filterIncidents(props.filters);
  }, []);
  const { classes, categories } = props;
  const severityValues = Array(10).fill(0).map((e, i) => i + 1);
  const institutions = useSelector(state => state.shared.institutions);
  const districts = useSelector(state => state.shared.districts);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  let orgSearch = props.incidentType === 'INQUIRY' ?
      (<Search
          institutions={institutions}
          onChange={setSelectedInstitution}
      ></Search>) :
      (<Search
            districts={districts}
            onChange={setSelectedDistrict}
      ></Search>);

  return (
    <Formik
      initialValues={props.incidentSearchFilter}
      onSubmit={(values, { setSubmitting }) => {
        let preparedValues = {
          ...values,
          startTime: values.startTime ? moment(values.startTime).format("YYYY-MM-DD HH:mm") : null,
          endTime: values.endTime ? moment(values.endTime).format("YYYY-MM-DD HH:mm") : null
        };
        if (selectedInstitution) { preparedValues.institution = selectedInstitution }
        if (selectedDistrict) { preparedValues.district = selectedDistrict }
        // alert(JSON.stringify(preparedValues));
        filterIncidents(preparedValues);
      }}
      onReset={() => {
        this.filterIncidents();
      }}
    >
      {props => {
        const {
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={8}>
              <TextField
                id="outlined-full-width"
                label="Text Search"
                style={{
                  margin: "15px 4px",
                  width: "calc(100% - 88px)"
                }}
                placeholder="Search Text / Incident Id"
                margin="normal"
                variant="outlined"
                name="textSearch"
                value={values.textSearch}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Button
                variant="contained"
                type="submit"
                className={classes.searchButton}
              >
                <SearchIcon />
              </Button>
            </Grid>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Advanced Search</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
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
                        <MenuItem value={"CLOSED"}>Closed</MenuItem>
                        <MenuItem value={"ACTION_TAKEN"}>Action Taken</MenuItem>
                        <MenuItem value={"ACTION_PENDING"}>Action Pending</MenuItem>
                        <MenuItem value={"ADVICE_PROVIDED"}>Advice Provided</MenuItem>
                        <MenuItem value={"ADVICE_REQESTED"}>Advice Requested</MenuItem>
                        <MenuItem value={"VERIFIED"}>Verified</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="status-label-placeholder">
                        Severity
                      </InputLabel>
                      <Select
                        input={
                          <Input
                            name="severity"
                            id="severity-label-placeholder"
                          />
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
                        {severityValues.map((val) => (
                          <MenuItem value={val} key={val}>{val}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="status-label-placeholder">
                        Category
                      </InputLabel>
                      <Select
                        input={
                          <Input
                            name="category"
                            id="severity-label-placeholder"
                          />
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
                          <MenuItem value={sub_category}>
                            {sub_category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="start-time"
                        label="Start Time"
                        name="startTime"
                        type="datetime-local"
                        value={values.startTime}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <TextField
                        id="end-time"
                        label="End Time"
                        name="endTime"
                        type="datetime-local"
                        value={values.endTime}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl className={classes.formControlSearch}>
                      { orgSearch }
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
                      <Button type="submit" variant="contained">
                        Search
                        <SearchIcon />
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </form>
        );
      }}
    </Formik>
  );
}

export default withStyles(styles)(SearchForm);
