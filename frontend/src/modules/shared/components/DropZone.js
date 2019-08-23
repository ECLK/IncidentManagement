import React from 'react';
import { useDispatch, useSelector } from 'react-redux'


import { incidentFileUpload } from '../../incident-filing/state/IncidentFiling.actions'
import  DropZoneBase  from './DropZoneBase'



export default function Dropzone(props) {

    const dispatch = useDispatch()
    const { id } = useSelector((state)=>(state.sharedReducer.activeIncident.data))

    const uploadFile = (acceptedFiles) => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        dispatch(incidentFileUpload(id,formData))
    }

    return (
        <DropZoneBase handleUpload = { uploadFile }/>
    );
}
