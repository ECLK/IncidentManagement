import { useSelector } from "react-redux";

export function getIncident(incidentId){
    const incidents = useSelector(state => state.incident.incidents);
    if(incidents.allIds.indexOf(incidentId) !== -1){
        return incidents.byIds[incidentId];
    }
    return null;
}