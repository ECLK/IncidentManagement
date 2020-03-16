import React, { Component, useState, useEffect } from 'react';
// import { Document, pdfjs, Page } from 'react-pdf';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import queryString from 'query-string';

import * as localStorage from '../../utils/localStorage';
import handler from "../../api/apiHandler";
import { API_BASE_URL } from "../../config";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    }
});
const ReportViewer = ({ classes, ...props }) => {
    const [report, setReport] = useState(null);
    const [detailed_report, setDetailedReport] = useState(null);
    const [complain, setComplain] = useState(null);
    const [inquiry, setInquiry] = useState(null);
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [uri, setUri] = useState(null);

    useEffect(() => {
        const values = queryString.parse(props.location.search);
        loadPDF(API_BASE_URL + "/reports/?report=" + values.report + "&start_date=" + values.start_date +
            "&end_date=" + values.end_date +
            "&detailed_report=" + values.detailed_report +
            "&complain=" + values.complain +
            "&inquiry=" + values.inquiry
        );

        setReport(values.report);
        setDetailedReport(values.detailed_report);
        setStartDate(values.start_date);
        setEndDate(values.end_date);
        setComplain(values.complain);
        setInquiry(values.inquiry);
    }, []);

    async function loadPDF(url) {
        const response = (await handler.get(url));
        const data = response.data;
        const blob = new Blob([data], { type: 'application/pdf' });
        const uri = URL.createObjectURL(blob);
        setUri(uri);
    }

    return (
        < Paper className={classes.root}>
            {
                report && (
                    <iframe src={uri} width="100%" height="1000px"> </iframe>
                )
            }
        </Paper>
    )
}

export default withRouter(withStyles(styles, { withTheme: true })(ReportViewer));