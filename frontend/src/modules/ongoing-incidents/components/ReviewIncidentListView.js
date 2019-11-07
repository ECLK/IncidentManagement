import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  fetchIncidents,
  updateIncidentFilters
} from "../state/OngoingIncidents.actions";

import { fetchCategories } from "../../shared/state/Shared.actions";

import SearchForm from "./SearchForm";
import { Grid, Button } from "@material-ui/core";
import { getIncidents } from "../../../api/incident";
import IncidentListReview from "./IncidentListReview";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    flexWrap: "wrap",
    padding: "24px 31px"
  },
  exportContainer: {
    marginTop: "20px",
    marginLeft: "auto"
  },
  exportButton: {
    marginLeft: "10px"
  }
});

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
      if (exportType === "csv") {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = url;     
          link.setAttribute('download', 'incidents.' + exportType);
          document.body.appendChild(link);
          link.click();
          link.remove();

      } else {
          var w = window.open('about:blank');
          w.document.open();
          w.document.write(response);
          w.document.close();
      }




    }catch{

    }
    
  }
  

  render() {
    const { classes, pagedIncidents, categories } = this.props;

    return (
      <Paper className={classes.root}>
        <SearchForm 
          categories={categories} 
          handleSearchClick={this.handleSearchClick} 
          showClosed={false}
          {...this.props} />
        <Grid container direction={"row"} className={classes.exportContainer}>
          <Grid item>
            <Button variant={"contained"} onClick={() => this.handleExportClick("csv")} className={classes.exportButton}>
              Export as CSV
            </Button>
          </Grid>
          <Grid item>
            <Button variant={"contained"} onClick={() => this.handleExportClick("html")} className={classes.exportButton}>
              Export as PDF
            </Button>
          </Grid>
        </Grid>
        <IncidentListReview
            incidents={pagedIncidents.incidents}
            pageNumber={pagedIncidents.pageNumber-1}
            count={pagedIncidents.count}
            handleRowClick={incidentId => this.props.history.push(`/app/review/${incidentId}`)}
            handlePageChange={this.handlePageChange}
        />
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
