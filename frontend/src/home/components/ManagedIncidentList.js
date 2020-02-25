import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import IncidentList from '../../incident/components/IncidentList';
import { getIncidents } from '../../api/incident';

export function ManagedIncidentList({ filters, history }){
    const [incidents, setIncidents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pages, setPages] = useState(0);

    async function callAPI(page=currentPage){
        const response = await getIncidents(filters, page);
        setIncidents(response.data.incidents);
        setCount(response.data.count);
    }

    useEffect(() => {
        callAPI();
    }, []);
    
    return (
        <IncidentList 
            incidents={incidents}
            pageNumber={currentPage-1}
            count={count}
            handleRowClick={incidentId => history.push(`/app/review/${incidentId}`)}
            handlePageChange={(evt, newPage) =>  { 
                setCurrentPage(newPage+1)
                callAPI(newPage+1)
            }
            }
        />
    )
}

export default withRouter(ManagedIncidentList);