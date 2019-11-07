
//TODO: this was a quick fix to make the comment trail look bit nicer. Properly implement this later. 

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import CommentEvent from './EventItem';
import Avatar from './Avatar';


const styles = theme => ({
  root: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
});

function EventItemView(props) {
  const { classes, event, eventAction, eventLinks } = props;

 
      return (
        <ListItem alignItems="flex-start" className={classes.root}>
        <ListItemAvatar>
            <Avatar user={event.author} />
        </ListItemAvatar>
        <ListItemText
          primary={
              <>
                <CommentEvent event={event} eventLinks={eventLinks} eventAction={eventAction}/>
              </>
          }
        />
        </ListItem>
      )
}

EventItemView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventItemView);


