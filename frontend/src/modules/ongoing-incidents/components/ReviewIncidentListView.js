import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  fetchIncidents,
  updateIncidentFilters
} from "../state/OngoingIncidents.actions";
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

const CustomTableCell = withRouter(
  withStyles(theme => ({
    body: {
      fontSize: 14
    }
  }))(TableCell)
);

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

let id = 0;

class ReviewIncidentListView extends React.Component {
  componentDidMount() {
    this.filterIncidents();
  }

  filterIncidents(values) {
    this.props.getIncidents(values);
  }

  render() {
    const { classes, pagedIncidents } = this.props;
    moment(new Date()).format(moment.HTML5_FMT.DATE);
    return (
      <Paper className={classes.root}>
        <Formik
          initialValues={this.props.incidentSearchFilter}
          onSubmit={(values, { setSubmitting }) => {
            let preparedValues = {
              ...values,
              startTime: moment(
                values.startDate + " " + values.startTime
              ).toDate(),
              endTime: moment(values.endDate + " " + values.endTime).toDate()
            };
            delete preparedValues["startDate"];
            delete preparedValues["endDate"];
            this.filterIncidents(preparedValues);
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
                      <InputLabel
                        shrink
                        htmlFor="response-time-label-placeholder"
                      >
                        Maximum Reponse time
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
                        <MenuItem value={"1"}>1 hour</MenuItem>
                        <MenuItem value={"2"}>2 hours</MenuItem>
                        <MenuItem value={"3"}>3 hours</MenuItem>
                        <MenuItem value={"4"}>4 hours</MenuItem>
                        <MenuItem value={"5"}>5 hour</MenuItem>
                        <MenuItem value={"6"}>6 hours</MenuItem>
                        <MenuItem value={"7"}>7 hours</MenuItem>
                        <MenuItem value={"8"}>8 hours</MenuItem>
                        <MenuItem value={"9"}>9 hours</MenuItem>
                        <MenuItem value={"10"}>10 hours</MenuItem>
                        <MenuItem value={"12"}>12 hours</MenuItem>
                        <MenuItem value={"13"}>13 hours</MenuItem>
                        <MenuItem value={"14"}>14 hours</MenuItem>
                        <MenuItem value={"15"}>15 hour</MenuItem>
                        <MenuItem value={"16"}>16 hours</MenuItem>
                        <MenuItem value={"17"}>17 hours</MenuItem>
                        <MenuItem value={"18"}>18 hours</MenuItem>
                        <MenuItem value={"19"}>19 hours</MenuItem>
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
                        <MenuItem value={"insignificant"}>
                          Insignificant
                        </MenuItem>
                        <MenuItem value={"MINOR"}>Minor</MenuItem>
                        <MenuItem value={"MODERATE"}>Moderate</MenuItem>
                        <MenuItem value={"MAJOR"}>Major</MenuItem>
                        <MenuItem value={"CRITICAL"}>Critical</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        margin="normal"
                        id="start-date"
                        name="startDate"
                        label="Date"
                        type="date"
                        value={values.startDate}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                      <TextField
                        id="time"
                        label="Time"
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
                        label="Date"
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
                        label="Time"
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
                        Submit
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
        <Table className={classes.table}>
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">Title</CustomTableCell>
              <CustomTableCell align="center">Description</CustomTableCell>
              <CustomTableCell align="center">Status</CustomTableCell>
              <CustomTableCell align="center">Reported Time</CustomTableCell>
              <CustomTableCell align="center">Response Time</CustomTableCell>
              <CustomTableCell align="center">Category</CustomTableCell>
              <CustomTableCell align="center">Severity</CustomTableCell>
              <CustomTableCell align="center">Location</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedIncidents.incidents.map(row => (
              <TableRow
                onClick={() => {
                  this.props.history.push(`/app/review/${row.id}`);
                }}
                hover
                className={classes.row}
                key={row.id}
              >
                <CustomTableCell scope="center">{row.title}</CustomTableCell>
                <CustomTableCell>{row.description}</CustomTableCell>
                <CustomTableCell align="center">{row.status}</CustomTableCell>
                <CustomTableCell align="center">
                  <div>
                    {moment(row.createdDate).format(moment.HTML5_FMT.DATE)}
                  </div>
                  <div className={classes.separator} />
                  <div>{moment(row.createdDate).format("hh:mm A")}</div>
                </CustomTableCell>
                <CustomTableCell align="center">
                  {row.responseTimeInHours}
                </CustomTableCell>
                <CustomTableCell align="center">{row.category}</CustomTableCell>
                <CustomTableCell align="center">{row.severity}</CustomTableCell>
                <CustomTableCell align="center">
                  {row.locationName}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pagedIncidents: state.ongoingIncidentReducer.pagedIncidents,
    incidentSearchFilter: state.ongoingIncidentReducer.incidentSearchFilter,
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIncidents: filters => {
      dispatch(fetchIncidents(filters));
      dispatch(updateIncidentFilters(filters));
    },
    resetFilters: filters => {
      dispatch(fetchIncidents(filters));
      dispatch(updateIncidentFilters(filters));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ReviewIncidentListView);
