import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncidentView from './IncidentView';
import { withRouter } from "react-router";

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
class Ongoing extends Component {

    render() {

        const { classes, theme, match } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button component={Link} to={`${match.url}`}>
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary='View Incident' />
                    </ListItem>
                </List>

            </div>
        );

        // return (<DomainContainer header={() =>
        //     <Typography variant="h5" color='inherit' noWrap className='line-height-fix'>
        //         <FormattedMessage
        //             id='eclk.incident.management.ongoing.incidents'
        //             description='Ongoing Incidents'
        //             defaultMessage='Ongoing Incidents'
        //         />
        //     </Typography>
        // }
        //     content={() => (
                
        //     )}
        //     drawer={drawer}
        // />)

        return (
            <IncidentView paramIncidentId={this.props.match.params.paramIncidentId} />
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(Ongoing));