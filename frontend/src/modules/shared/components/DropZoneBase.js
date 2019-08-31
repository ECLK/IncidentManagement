import React, { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Button from '@material-ui/core/Button';


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

export default function DropZoneBase(props) {

    const { handleUpload, setSelectedFiles } = props

    let files = null

    const onDrop = useCallback(acceptedFiles => {
        if(setSelectedFiles){
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);
            setSelectedFiles(formData)
        }
    }, [])

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
        maxSize: 104857600, //100mb
        onDrop
    });


    files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
            isDragActive,
            isDragReject
        ]);


    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <h4>Selected File: {files[0] ? files[0].key : 'None'}</h4>
            {handleUpload && <div style={{ display: 'flex' }}>
                <Button disabled={!files[0]} onClick={() => { handleUpload(acceptedFiles) }}>
                    Upload
                </Button>
            </div>}
        </section>
    );
}
