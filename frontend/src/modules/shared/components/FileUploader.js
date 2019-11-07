import React, { useRef } from 'react';
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import LinearProgress from '@material-ui/core/LinearProgress';

import {useLoadingStatus} from '../../loading-spinners/loadingHook'


// Register the plugin
registerPlugin(FilePondPluginFileValidateSize);

export default function FileUploader({ files, setFiles, watchedActions }) {
    
    const pond = useRef(null);
    const isLoading = useLoadingStatus(watchedActions);

    return (
        <>
        <FilePond
            ref={pond}
            files={files}
            allowMultiple={true}
            maxTotalFileSize= '100MB'
            // oninit={() => this.handleInit()}
            onupdatefiles={fileItems => {
                // Set currently active file objects to this.state
                let totalFileSize = fileItems.reduce((totalSize,currFile)=>{
                    return totalSize = totalSize + currFile.fileSize
                },0)
                if(totalFileSize<100000000){
                    setFiles(fileItems.map(fileItem => fileItem.file))

                }
            }}
        />
        {isLoading && <LinearProgress />}
        </>
    )
}
