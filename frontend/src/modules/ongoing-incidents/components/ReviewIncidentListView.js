import React, { useState } from "react";
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

import { fetchCategories } from "../../shared/state/Shared.actions";

import moment from "moment";
import SearchForm from "./SearchForm";
import { TableFooter, TablePagination, Grid, IconButton, Button } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import AssignIcon from '@material-ui/icons/AssignmentInd';
import { getIncidents } from "../../../api/incident";

const CustomTableCell = withRouter(
  withStyles(theme => ({
    body: {
      padding: "3px 8px",
      fontSize: "14px",
      "& p.description": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        lineHeight: "16px",
        maxHeight: "32px",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical"
      }
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
    flexWrap: "wrap",
    padding: "24px 31px"
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    minWidth: 240
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
  exportContainer: {
    marginTop: "20px",
    marginLeft: "auto"
  },
  exportButton: {
    marginLeft: "10px"
  }
});

let id = 0;

class ReviewIncidentListView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      filters: {}
    }
  }

  componentDidMount() {
    this.props.getCategories();
  }

  handlePageChange = (event, newPage) => {
    this.props.getIncidents(this.props.incidentSearchFilter, newPage+1);
  }

  handleSearchClick = (filters, page) => {
    if(filters){
      this.setState({
        filters: filters
      });
    }else{
      this.setState({
        filters: {}
      });
    }
    
    this.props.getIncidents(filters, page);
  }

  handleExportClick = async (exportType) => {
    const filters = this.state.filters;
    filters["export"] = exportType;

    try{
      const response = await getIncidents(filters);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'incidents.' + exportType);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }catch{

    }
    
  }
  

  render() {
    const { classes, pagedIncidents, categories } = this.props;

    return (
      <Paper className={classes.root}>
        <SearchForm categories={categories} handleSearchClick={this.handleSearchClick} {...this.props} />
        <Grid container direction={"row"} className={classes.exportContainer}>
          <Grid item>
            <Button variant={"contained"} onClick={() => this.handleExportClick("csv")} className={classes.exportButton}>
              Export as CSV
            </Button>
          </Grid>
          <Grid item>
            <Button variant={"contained"} onClick={() => this.handleExportClick("pdf")} className={classes.exportButton}>
              Export as PDF
            </Button>
          </Grid>
        </Grid>
        <Table className={classes.table}>
          <colgroup>
            <col style={{ width: "2%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "45%" }} />
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
              <CustomTableCell align="center">Ref Id</CustomTableCell>

              <CustomTableCell align="center">Title</CustomTableCell>
              <CustomTableCell align="center">Description</CustomTableCell>
              <CustomTableCell align="center">Status</CustomTableCell>
              <CustomTableCell align="center">Severity</CustomTableCell>
              <CustomTableCell align="center">Response Time</CustomTableCell>
              <CustomTableCell align="center">Category</CustomTableCell>
              <CustomTableCell align="center">Last Action At</CustomTableCell>
              <CustomTableCell align="center">Actions</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedIncidents.incidents.map(row => (
              <TableRow
                
                // hover
                className={classes.row}
                key={row.id}
              >
                <CustomTableCell scope="center">
                  <p>{row.refId}</p>
                </CustomTableCell>
                <CustomTableCell scope="center">
                  <p>{row.title}</p>
                </CustomTableCell>
                <CustomTableCell>
                  <p className="description">{row.description}</p>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <p>{row.currentStatus}</p>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <p>{row.currentSeverity}</p>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <p>{row.response_time} h</p>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <p>{row.category}</p>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <p>{row.subCategory}</p>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <div style={{display:"flex"}}>
                    {row.currentStatus === "NEW" && (
                      <IconButton aria-label="delete" className={classes.margin} size="small" color="primary">
                        <CheckIcon fontSize="inherit" />
                      </IconButton>
                    )}
                    <IconButton aria-label="delete" className={classes.margin} size="small">
                      <AssignIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" className={classes.margin} 
                        size="small"
                        onClick={() => {
                          this.props.history.push(`/app/review/${row.id}`);
                        }} >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </CustomTableCell>
                
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={pagedIncidents.count}
                rowsPerPage={15}
                page={pagedIncidents.pageNumber-1}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={this.handlePageChange}
                // onChangeRowsPerPage={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
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
      dispatch(fetchCategories());
    },
    getIncidents: (filters, page) => {
      dispatch(fetchIncidents(filters, page));
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
