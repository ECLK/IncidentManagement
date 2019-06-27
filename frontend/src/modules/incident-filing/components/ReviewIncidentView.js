
import React from 'react';

export default function ReviewIncidentView(props){

    return (
    <div>
        <div>Review Id:  {props.match.params.reviewId}</div>
    </div>);
}