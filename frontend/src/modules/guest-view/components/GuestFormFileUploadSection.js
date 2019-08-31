import React from 'react';

import  DropZoneBase  from '../../shared/components/DropZoneBase'



export default function Dropzone(props) {
    const { setSelectedFile, selectedFile } = props
    return (
        <DropZoneBase setSelectedFiles = { setSelectedFile }/>
    );
}