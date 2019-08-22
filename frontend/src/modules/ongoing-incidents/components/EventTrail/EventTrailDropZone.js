import React from 'react';
import { useDispatch, useSelector } from 'react-redux'


import { attachFile } from '../../state/OngoingIncidents.actions'
import  DropZoneBase  from '../../../shared/components/DropZoneBase'



export default function Dropzone(props) {

    const dispatch = useDispatch()
    const { id } = useSelector((state)=>(state.sharedReducer.activeIncident.data))

    const uploadFile = (acceptedFiles) => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        dispatch(attachFile(id,formData))
    }

    return (
        <DropZoneBase handleUpload = { uploadFile }/>
    );
}
