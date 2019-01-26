import React from "react";
import Typography from '@material-ui/core/Typography';
import './LandingPage.css'
import CardGrid from "../../components/CardGrid";
import { Icon } from "@material-ui/core";
import ECLogo from "../../static/img/ec-logo.png";

import {FormattedMessage} from 'react-intl';
import Link from "react-router-dom/Link";

function LandingPage(props) {

    const getCardContents = ()=>{
        return([
            <Link to='/report'>
                <Typography variant="h5" component="h2">
                    <FormattedMessage
                        id='eclk.incident.management.report.incidents'
                        description='Report an Incident'
                        defaultMessage='Report an Incident'
                    />
                </Typography>
                <Icon fontSize="large">call</Icon>
            </Link>,
            <Link to='/ongoing'>
                <Typography variant="h5" component="h2">                
                    <FormattedMessage
                        id='eclk.incident.management.ongoing.incidents'
                        description='Ongoing Incidents'
                        defaultMessage='Ongoing Incidents'
                    />
                </Typography>
                <Icon fontSize="large">autorenew</Icon>
            </Link>,
            <Link to='/historic'>
                <Typography variant="h5" component="h2">
                <FormattedMessage
                    id='eclk.incident.management.historic.reports'
                    description='Historic Reports'
                    defaultMessage='Historic Reports'
                />
                </Typography>
                <Icon fontSize="large">assessment</Icon>
            </Link>,
        ]);
    }
    return (
        <div className='landing-page'>
            <div className='logo-container'>
                <img src={ECLogo} alt='logo'></img>
            </div>
            <div className="title-container">
                <Typography variant="h3" gutterBottom>
                    <FormattedMessage
                        id='eclk.incident.management.incidents.reporting.system'
                        description='Title for the landing page'
                        defaultMessage='Election Violation Incidents Reporting System'
                    />
                </Typography>
            </div>
            <div className='navigation-container'>
                <CardGrid cardContents={getCardContents()} />
            </div>
        </div>
        
        
    );
  
}
export default LandingPage;