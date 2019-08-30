import React from 'react';

import  DropZoneBase  from '../../shared/components/DropZoneBase'



export default function Dropzone(props) {
    const { setSelectedFile } = props
    return (
        <DropZoneBase setSelectedFiles = { setSelectedFile }/>
    );
}