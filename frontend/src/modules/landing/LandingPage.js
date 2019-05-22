import React from "react";
import Typography from '@material-ui/core/Typography';
import './LandingPage.css'
import CardGrid from "../../components/CardGrid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Icon } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import { FormattedMessage } from 'react-intl';
import Link from "react-router-dom/Link";
// import LanguageSelector from "../../components/LanguageSelector";
import Logo from "../../components/Logo";

import Create from "@material-ui/icons/Create";
import Loop from "@material-ui/icons/Loop";
import BarChart from "@material-ui/icons/BarChart";


const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit + 20,
        fontSize: 32,
    },
});

function LandingPage(props) {

    const { classes } = props;

    const getCardContents = () => {
        return ([
            <Card className='card'>
                <Link to='/report'>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <FormattedMessage
                                id='eclk.incident.management.report.incidents'
                                description='Report an Incident'
                                defaultMessage='Report an Incident'
                            />
                        </Typography>
                        <Create className={classes.icon} />
                    </CardContent>
                </Link>
            </Card>,
            <Card className='card'>
                <Link to='/ongoing'>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <FormattedMessage
                                id='eclk.incident.management.ongoing.incidents'
                                description='Manage an Incident'
                                defaultMessage='Manage an Incident'
                            />
                        </Typography>
                        <Loop className={classes.icon} />
                    </CardContent>
                </Link>
            </Card>,
            <Card className='card'>
                <Link to='/historic'>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <FormattedMessage
                                id='eclk.incident.management.historic.reports'
                                description='Incident Reports'
                                defaultMessage='Incident Reports'
                            />
                        </Typography>
                        <BarChart className={classes.icon} />
                    </CardContent>
                </Link>
            </Card>,
        ]);
    }
    return (
        <div className='landing-page'>
            <div className='landing-header'>
                <div>
                    <Logo maxWidth='300px' />
                </div>
                <div>
                    {/* <LanguageSelector /> */}
                </div>
            </div>
            <div className="title-container">
                <Typography variant="h3" gutterBottom>
                    <FormattedMessage
                        id='eclk.incident.management.incidents.reporting.system'
                        description='Title for the landing page'
                        defaultMessage='Election Incidents Reporting System'
                    />
                </Typography>
            </div>
            <div className='navigation-container'>
                {/* <CardGrid cardContents={getCardContents()} /> */}
            </div>
        </div>


    );

}
export default withStyles(styles)(LandingPage);
