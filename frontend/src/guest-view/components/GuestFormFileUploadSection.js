import React from 'react';

import FileUploader from '../../shared/components/FilePicker';
import {
    uploadFileGuestRequest
} from '../../incident/state/incidentActions'



export default function Dropzone(props) {
    const { files, setSelectedFile } = props
    return (
        <FileUploader 
            files={files}
            setFiles={setSelectedFile}
            watchedActions={[uploadFileGuestRequest]}
        />
    );
}