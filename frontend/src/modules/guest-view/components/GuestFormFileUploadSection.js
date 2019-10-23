import React from 'react';

import  DropZoneBase  from '../../shared/components/DropZoneBase'
import FileUploader from '../../shared/components/FileUploader';



export default function Dropzone(props) {
    const { files, setSelectedFile } = props
    return (
        // <DropZoneBase setSelectedFiles = { setSelectedFile }/>
        <FileUploader 
            files={files}
            setFiles={setSelectedFile}
        />
    );
}