import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import EventItem from './EventItemWrapper';

const styles = {
    root: {
        width: "100%",
        boxShadow: "none",
        backgroundColor: "transparent",
        paddingTop: "15px"
    },
};

const EventListView = ({ events = [], classes, resolveEvent }) => {
    return (
        <Card className={classes.root}>
            <List>
                {events.allIds.map(eventId => (
                    <EventItem event={events.byIds[eventId]} eventAction={resolveEvent} key={eventId} />
                ))}
            </List>
        </Card>
    )
}


const EventList = withStyles(styles)(EventListView);

export default EventList;
