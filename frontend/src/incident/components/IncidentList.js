import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody, withStyles, TableFooter, TablePagination } from '@material-ui/core';
import { withRouter } from 'react-router';

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
    }
});

function IncidentList({ classes, incidents, pageNumber, count, handleRowClick, handlePageChange }){
    
    return (
        <Table className={classes.table}>
          <colgroup>
            <col style={{ width: "2%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "45%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "15%" }} />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map(row => (
              <TableRow
                onClick={() => handleRowClick(row.id)}
                hover
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
                  <p>{row.severity}</p>
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
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {/* {pagination && ( */}
                <TableRow>
                <TablePagination
                    rowsPerPageOptions={[15]}
                    colSpan={3}
                    count={count}
                    rowsPerPage={15}
                    page={pageNumber}
                    SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                    }}
                    onChangePage={handlePageChange}
                />
                </TableRow>
            {/* )} */}
          </TableFooter>
        </Table>
    )
}

export default withStyles(styles, { withTheme: true })(IncidentList);