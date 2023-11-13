import React, {useRef, useState, useEffect} from 'react';
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
// import IconButton from '@mui/material/IconButton';
import globalVal from '../../globalVal';
import ProteinGeneList from './ProteinGeneList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './UploadData.scss';

import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleUpload = ({ target }) => {
        // console.log(target.files[0])
        setSelectedFileName(target.files[0].name)
        setSelectedFile(target.files[0]);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('file', selectedFile);

        fetch(globalVal.baseUrl + 'uploadUserData/' + dataName
            , {
            method: "POST",
            body: data,
        })
        .then((response) => {
            response.json()
                .then((body) => {
                    // TODO: handle error messages
                    setDataName("");
                    setSelectedFile(null);
                    setSelectedFileName("");
                    props.handleClose();
                    navigate('/proteins/user/' + dataName);
                    window.location.reload();
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

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                    {/* <Box
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
                    </Box> */}
                    <ProteinGeneList setValue={setDataName} setInputValue={setInputValue}
                        value={dataName} inputValue={inputValue} />
                        
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleUpload} accept='.csv'/>
                    </Button>
                    <div className='notes'>
                    <div className='requirements'>
                        <DialogContentText>
                            {/* <u>Format Requirements</u>
                            <span><IconButton aria-label="arrowdropdown" onClick={handleDeleteFile} >
                                    <ArrowDropDownIcon />
                                    </IconButton></span>
                            <br />
                            <ul>
                                <li>Upload .csv files only</li>
                                <li>Include 2 columns in .csv file:</li>
                                    <ol>
                                        <li>column name: "mutant", content</li>   
                                    </ol>
                                <li>Milk</li>
                            </ul>   */}
                                    <Card>
                                        <CardActions disableSpacing>
                                            <u>Format Requirements</u>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        </CardActions>
                                        
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph fontSize="0.9rem">
                            1. Upload .csv files only
                        </Typography>
                        <Typography paragraph fontSize="0.9rem">
                            2. Include 2 columns in .csv file:
                        <ul>
                            <li>name: "mutant", content: [mutant position] + [amino acid], e.g."M1A"</li>   
                            <li>name: [YOUR_FILE_NAME] e.g. "cpt", content: [scores]</li> 
                        </ul>
                        </Typography>
                        <Typography paragraph fontSize="0.9rem">
                           3. download <u>example</u> for reference
                        </Typography>
                       
                        </CardContent>
                                        </Collapse>
                                        </Card>
                        </DialogContentText>
                    </div>
                    <div className='selectedFileName'>
                    { selectedFileName !== "" &&
                        <DialogContentText>
                                {selectedFileName}
                                <span><IconButton aria-label="delete" onClick={handleDeleteFile} >
                                    <DeleteIcon />
                                        </IconButton></span>
                        </DialogContentText> 

                    }
                    </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {
                selectedFile !== null && dataName !== "" 
                ? disableUpload = false
                : disableUpload = true            
            }
            {/* {
                selectedFile !== null && value !== "" 
                ? disableUpload = false
                : disableUpload = true            
            } */}
            <Button onClick={handleSubmit} variant="outlined" autoFocus disabled={disableUpload}>Submit and Visualize</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}