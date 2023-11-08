import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from '@mui/material/Unstable_Grid2';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import globalVal from '../../globalVal';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadData(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [dataName, setDataName] = useState("");
    const [option, setOption] = useState();
    const navigate = useNavigate();
    var disableUpload = true;
    
    // console.log(selectedFileName);
    // console.log(selectedFile);
    // console.log(dataName);

    const handleUpload = ({ target }) => {
        // console.log(target.files[0])
        setSelectedFileName(target.files[0].name)
        setSelectedFile(target.files[0]);
    };
    
    const handleSubmit = () => {
        const data = new FormData();
        data.append('file', selectedFile);

        fetch(globalVal.baseUrl + 'uploadUserData/' + dataName, {
            method: "POST",
            body: data,
        })
        .then((response) => {
            response.json()
                .then((body) => {
                    // console.log(body)
                    // TODO: handle error messages
                    setDataName("");
                    setSelectedFile(null);
                    setSelectedFileName("");
                    props.handleClose();
                    navigate('/proteins/user/' + dataName);
                    // navigate('/proteins/1433G');
                })
        });
    }

    const handleClose = () => {
        setSelectedFile(null);
        setSelectedFileName("");
        setDataName("");
        props.handleClose();
    }

    const handleDeleteFile = () => {
        setSelectedFile(null);
        setSelectedFileName("");
        setDataName("");
    }

    return (
        <div>
        <Dialog open={props.open} onClose={props.handleClose} fullWidth="true">
            <DialogTitle>Upload Data Here For Visualization</DialogTitle>
            
            <DialogContent>
                <div className="input-section" style={{ overflow: "auto",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "30px"
                                                    }}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '20ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                                id="standard-basic"
                                label="Gene Name:"
                                variant="standard"
                                value={dataName}
                                required
                                onChange={(e) => {
                                    setDataName(e.target.value);
                                }} />
                    </Box>
                        
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleUpload} accept='.csv'/>
                    </Button>
                        <DialogContentText>
                            *  upload .csv only
                        </DialogContentText>
                    { selectedFileName !== "" &&
                        <DialogContentText>
                                {selectedFileName}
                                <span><IconButton aria-label="delete" onClick={handleDeleteFile} >
                                    <DeleteIcon />
                                        </IconButton></span>
                        </DialogContentText> 

                    }
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {
                selectedFile !== null && dataName !== "" 
                ? disableUpload = false
                : disableUpload = true            
            }
            <Button onClick={handleSubmit} variant="outlined" autoFocus disabled={disableUpload}>Submit and Visualize</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}