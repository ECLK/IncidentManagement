import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button';

import { incidentFileUpload } from '../../incident-filing/state/IncidentFiling.actions'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function Dropzone(props) {

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({ 
        accept: '',
        multiple: false,
        maxSize: 104857600 //100mb
    });

    const dispatch = useDispatch()
    const { id } = useSelector((state)=>(state.sharedReducer.activeIncident.data))

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
    ));

    console.log(files)

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
            isDragActive,
            isDragReject
    ]);

    const uploadFile = (acceptedFiles) => {

        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        dispatch(incidentFileUpload(id,formData))

        // const reader = new FileReader()

        // reader.onabort = () => console.log('file reading was aborted')
        // reader.onerror = () => console.log('file reading has failed')
        // reader.onload = () => {
        //     // Do whatever you want with the file contents
        //     const binaryStr = reader.result
        //     console.log(binaryStr)
        //     const data = new FormData() 
        //     data.append('file', binaryStr)
        // }
        
        // acceptedFiles.forEach(file => reader.readAsBinaryString(file))
    }

    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            <div style={{display:'flex'}}>
            <h4>Selected File: {files[0] ? files[0].key : 'None'}</h4>
            <Button disabled={!files[0]} onClick={()=>{uploadFile(acceptedFiles)}}>
                Upload
            </Button>
            </div>
        </section>
    );
}
