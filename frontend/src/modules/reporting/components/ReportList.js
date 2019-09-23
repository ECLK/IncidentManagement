import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';

import {withStyles} from '@material-ui/core/styles';
import {Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@material-ui/core';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    }
});
const ReportList = ({classes, ...props}) => {

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Report</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        hover
                    >
                        <TableCell
                            onClick={() => {
                                props.history.push(`/app/reports/view?report=police_division_summary_report`);
                            }}>
                            Police Division Summary Report
                        </TableCell>
                    </TableRow>
                    <TableRow
                        hover
                    >
                        <TableCell
                            onClick={() => {
                                props.history.push(`/app/reports/view?report=category_wise_summary_report`);
                            }}>
                            Category-wise Summary Report
                        </TableCell>
                    </TableRow>
                    <TableRow
                        hover
                    >
                        <TableCell
                            onClick={() => {
                                props.history.push(`/app/reports/view?report=district_wise_summary_report`);
                            }}>
                            District-wise Summary Report
                        </TableCell>
                    </TableRow>
                    <TableRow
                        hover
                    >
                        <TableCell
                            onClick={() => {
                                props.history.push(`/app/reports/view?report=mode_wise_summary_report`);
                            }}>
                            Mode-wise Summary Report
                        </TableCell>
                    </TableRow>
                    <TableRow
                        hover
                    >
                        <TableCell
                            onClick={() => {
                                props.history.push(`/app/reports/view?report=severity_wise_summary_report`);
                            }}>
                            Severity-wise Summary Report
                        </TableCell>
                    </TableRow>
                    <TableRow
                        hover
                    >
                        <TableCell
                            onClick={() => {
                                props.history.push(`/app/reports/view?report=subcategory_wise_summary_report`);
                            }}>
                            Subcategory-wise Summary Report
                        </TableCell>
                    </TableRow>
                    <TableRow
                        hover
                    >
                        <TableCell
                            onClick={() => {
                                props.history.push(`/app/reports/view?report=status_wise_summary_report`);
                            }}>
                            Status-wise Summary Report
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withRouter(withStyles(styles, {withTheme: true})(ReportList));