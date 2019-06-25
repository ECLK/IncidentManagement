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

import { fetchCatogories } from "../../shared/state/Shared.actions";

import moment from "moment";
import SearchForm from "./SearchForm";
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
    minWidth: 700,
    tableCellStyles: {
      padding: "10px 10px"
    }
  },
  tableHeader: {
    padding: "10px 10px"
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
    minWidth: 700,
    padding: "10px 10px"
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
    this.props.getCategories();
  }
  render() {
    const { classes, pagedIncidents, categories } = this.props;

    return (
      <Paper className={classes.root}>
        <SearchForm categories={categories} {...this.props} />
        <Table className={classes.table}>
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "2%" }} />
            <col style={{ width: "2%" }} />
            <col style={{ width: "2%" }} />
            <col style={{ width: "2%" }} />
            <col style={{ width: "2%" }} />
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
                <CustomTableCell align="center">
                  {row.subCategory}
                </CustomTableCell>
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
    categories: state.sharedReducer.categories,

    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(fetchCatogories());
    },
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
