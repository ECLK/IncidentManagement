import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";

import {withStyles} from '@material-ui/core/styles';
import { Paper, Grid, Typography, List, ListItemText, ListItem } from '@material-ui/core';
import { API_BASE_URL } from '../../config';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        marginBottom: 20,
    }
})

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function TempReportList(){
    return (
        <Paper style={{padding: 20}}>
            <Grid container spacing={24}>
                <Grid item xs>
                    <Typography variant="h6"> View Daily Reports </Typography>
                    <List>
                        <ListItemLink href={`${API_BASE_URL}/pdfgen/?template_type=daily_district`} target="_blank">
                            <ListItemText primary="Daily Summary Report" />
                        </ListItemLink>
                        <ListItemLink href={`${API_BASE_URL}/pdfgen/?template_type=daily_category`} target="_blank">
                            <ListItemText primary="Categorywise Daily Summary Report" />
                        </ListItemLink>
                        <ListItemLink href={`${API_BASE_URL}/pdfgen/?template_type=daily_summary_report_districtwise`} target="_blank">
                            <ListItemText primary="Districtwise Daily Summary Report" />
                        </ListItemLink>
                    </List>
                </Grid>
            </Grid>
        </Paper>
    )
}