import React, { useRef } from 'react';
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

export default function FileUploader({ files, setFiles }) {
    const pond = useRef(null);

    return (
        <FilePond
            ref={pond}
            files={files}
            allowMultiple={true}
            // oninit={() => this.handleInit()}
            onupdatefiles={fileItems => {
                // Set currently active file objects to this.state
                setFiles(fileItems.map(fileItem => fileItem.file))
            }}
        />
    )
}
