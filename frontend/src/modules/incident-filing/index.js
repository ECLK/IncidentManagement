import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import DomainContainer from '../../components/DomainContainer';
import IncidentForm from './containers/IncidentForm';

import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { withStyles } from '@material-ui/core/styles';


const drawerWidth = 240;
const styles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
  });


class Report extends Component {

    

    render(){
        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                {/* {['Home','Report Incident', 'View Incidents', 'Approve Incident'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))} */}
                <ListItem button >
                    <ListItemIcon><AssignmentLateIcon /></ListItemIcon>
                    <ListItemText primary='Report Incident' />
                </ListItem>
                <ListItem button >
                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                    <ListItemText primary='View Incident' />
                </ListItem>
                <ListItem button >
                    <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                    <ListItemText primary='Approve Incident' />
                </ListItem>
                </List>
                
            </div>
        );

        let user = {
            id: 'id',
            email: 'test@mail.com',
            social: {
              facebook: 'fb',
              twitter: 'twitter',
            }
         }
        return(
        <DomainContainer 
            header={()=>
                <Typography variant="h5" color='inherit' noWrap className='line-height-fix'>
                    <FormattedMessage
                        id='eclk.incident.management.report.incidents'
                        description='Report an Incident'
                        defaultMessage='Report an Incident'
                    />
                </Typography>
            }
            content={()=>(
                <IncidentForm user={user} incidentId={this.props.match.params.incidentId} />
            )}
            drawer={drawer}

        />)
    }
}

// export default Report;
export default withStyles(styles, { withTheme: true })(Report);
