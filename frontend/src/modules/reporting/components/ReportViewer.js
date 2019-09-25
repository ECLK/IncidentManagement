import React, { Component, useState, useEffect } from 'react';
// import { Document, pdfjs, Page } from 'react-pdf';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import queryString from 'query-string';

import * as localStorage from '../../../utils/localStorage';
import handler from "../../../api/apiHandler";
import { API_BASE_URL } from "../../../config";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    }
});
const ReportViewer = ({classes, ...props}) =>{
    const [report, setReport] = useState(null);
    const [uri, setUri] = useState(null);

    useEffect(() => {
        const values = queryString.parse(props.location.search);
        loadPDF(API_BASE_URL + "/reports/?report=" + values.report)

        setReport(values.report);
    }, []);

    async function loadPDF(url){
        const data = (await handler.get(url)).data;
        const blob = new Blob([data], {type: 'application/pdf'}, "Report.pdf");
        const uri = URL.createObjectURL(blob);
        setUri(uri);
    }

    return (
        <Paper className={classes.root}>
            {report && (
                <iframe src={uri} width="100%" height="1000px"></iframe>
            )}
        </Paper>
    )
}

export default withRouter(withStyles(styles, { withTheme: true })(ReportViewer));