import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import { loadAllIncidents } from "../../incident/state/incidentActions";
import * as incidentsApi from '../../api/incident';

import SearchForm from "./SearchForm";
import { Grid, Button } from "@material-ui/core";
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

function ArchiveIncidentListView({ classes, ...props }) {
  const [filters, setFilters] = useState({});

  const categories = useSelector(state => state.shared.categories);
  const incidentSearchFilter = useSelector(state => state.incident.incidents.searchFilter);
  const incidents = useSelector(state => state.incident.incidents);

  const dispatch = useDispatch();
  const handlePageChange = (event, newPage) => dispatch(loadAllIncidents(incidentSearchFilter, newPage+1));

  const handleSearchClick = (filters, page) => {
    if(!filters){
      filters = {};
    }
    filters["show_closed"] = true;
    setFilters(filters);
    dispatch(loadAllIncidents(filters, page))
  }

  const handleExportClick = async (exportType) => {
    filters["export"] = exportType;

    try{
      const response = await incidentsApi.getIncidents(filters);
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
    
  return (
    <Paper className={classes.root}>
      <SearchForm 
        categories={categories} 
        handleSearchClick={handleSearchClick} 
        showClosed={false}
        {...props} />
      <Grid container direction={"row"} className={classes.exportContainer}>
        <Grid item>
          <Button variant={"contained"} onClick={() => handleExportClick("csv")} className={classes.exportButton}>
            Export as CSV
          </Button>
        </Grid>
        <Grid item>
          <Button variant={"contained"} onClick={() => handleExportClick("html")} className={classes.exportButton}>
            Export as PDF
          </Button>
        </Grid>
      </Grid>
      <IncidentListReview
          incidents={incidents}
          pageNumber={incidents.paging.pageNumber-1}
          count={incidents.paging.count}
          handleRowClick={incidentId => props.history.push(`/app/review/${incidentId}`)}
          handlePageChange={handlePageChange}
      />
    </Paper>
  );
}

export default withStyles(styles)(ArchiveIncidentListView);
