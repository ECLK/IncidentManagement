import React from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import EventItem from './EventItem';

const styles = {
    root: {
        width: "100%",
        boxShadow: "none",
        backgroundColor: "transparent",
        paddingTop: "15px"
    },
};

const EventListView = ({ events = [], classes, resolveEvent }) => (
    <Card className={classes.root}>
        <List>
            {events.map(event => (
                <EventItem event={event} eventAction={resolveEvent} key={event.id} />
            ))}
        </List>
    </Card>
);

const EventList = withStyles(styles)(EventListView);

export default EventList;
