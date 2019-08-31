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


const getEventLinks = (events) => {
    let eventLinkObj = {}
    let i;
    let currEvent
    for(i = 0; i<events.length; i++ ){
        currEvent = events[i]
        if(currEvent.linked_event){
            eventLinkObj[currEvent.linked_event] = currEvent.id
        }
        // switch(currEvent.action){
        //     case "ACTION_COMPLETED":
        //         eventLinkObj[currEvent.linked_event] = currEvent.id
        //     default:
        //         break
        // }
    }
    return eventLinkObj
}


const EventListView = ({ events = [], classes, resolveEvent }) => {

    const [eventLinks, setEventLinks] = useState({})

    useEffect(()=>{
        const eventLinkObject = getEventLinks(events)
        setEventLinks(eventLinkObject)
    },[events])

    return (
    <Card className={classes.root}>
        <List>
            {events.map(event => (
                <EventItem event={event} eventLinks={eventLinks} eventAction={resolveEvent} key={event.id} />
            ))}
        </List>
    </Card>)
}


const EventList = withStyles(styles)(EventListView);

export default EventList;
