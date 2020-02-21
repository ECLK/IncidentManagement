import React, { useState, useEffect } from 'react';
import { Dialog, withStyles, DialogContent, DialogActions, DialogTitle, DialogContentText, Button, Slide } from '@material-ui/core';

const styles = theme => ({
    root : {
        minWidth: 800
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FilePreviewer({ url, filename, ext }){
    const [previewComponent, setPreviewComponent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let _previewComponent = null;
        if(["png", "jpg", "jpeg", "bmp"].indexOf(ext) > -1){
            _previewComponent = <img src={url} style={{maxWidth:"100%"}} />;
        }else if(["mp4", "mpeg", "wmv", "avi"].indexOf(ext) > -1){
            _previewComponent = (
            <video style={{maxWidth:"100%"}} controls>
                <source src={url} type="video/mp4" />
            </video>
            )
        }else if(ext === "pdf"){
            _previewComponent = (
                <iframe src={url} style={{maxWidth:"100%"}}></iframe>
            );
        }

        setPreviewComponent(_previewComponent);
    }, [url])

    return (
        <>
        <div 
            style={{width:"100px", display:"flex", flexDirection:"column"}}
        >
            {previewComponent}

            <div style={{textAlign:"center", cursor:"pointer"}}>
                {filename}
            </div>
            
            <Button color="primary">
                { ext === "pdf" && 
                    <a href={url} target="_blank">View</a>
                }
                { ext !== "pdf" && 
                    <span onClick={() => setIsOpen(true)}>View</span>
                }
            </Button>
            
        </div>
        <Dialog
            // fullScreen
            open={isOpen}
            onClose={() => setIsOpen(false)}
            // transitionComponent={Transition}
        >
            <div>
            <DialogTitle id="form-dialog-title">File Preview</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {previewComponent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary">
                        <a href={url} target="_blank">Download</a>
                    </Button>
                    <Button color="primary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
        </>
    );
}

export default withStyles(styles)(FilePreviewer);