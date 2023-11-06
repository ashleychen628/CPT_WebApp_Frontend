import React, {useEffect, useState, useRef} from 'react';
import './Customize.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Customize(props) {
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState("");
    const [typeIn, setTypeIn] = useState([]);
    const [option, setOption] = useState('Alphabetical order');
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [yLabels, setYlabel] = useState(props.yLabels);
    
    // console.log(yLabels + "hello");

    const handleChange = (event, value) => {
        setOption(value);

        let YLabels = [];

        if (value === "Alphabetical order" || value === null) {
            YLabels = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L',
                'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y'];
            setYlabel(YLabels);
        }
        else if (value === "hydrophobic to hydrophilic") {
            YLabels = ['I', 'V', 'L', 'F', 'C', 'M', 'A', 'G', 'T', 'S',
                'W', 'Y', 'P', 'H', 'E', 'Q', 'D', 'N', 'K', 'R'];
            setYlabel(YLabels);
        }
        else if (value === "Groups by biophysical properties") {
            YLabels = ['G', 'A', 'V', 'L', 'I', 'P', 'F', 'W', 'Y', 'S',
                'T', 'C', 'M', 'N', 'Q', 'K', 'R', 'H', 'D', 'E'];
            setYlabel(YLabels);
        }
        else {
            YLabels = typeIn
            setYlabel(YLabels);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    }; 
    

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        setOpen(false);
        props.handleEditYLabels(yLabels);
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
        setOption("");
    };
 
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...yLabels];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setYlabel(copyListItems);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Mutant Amino Acid Order
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Mutant Amino Acid Order</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Customize Your Order:
                </DialogContentText>

                <Grid container spacing={2}> 
                    <Grid item xs={6}>         
                        {
                            yLabels&&
                            yLabels.map((item, index) => (
                                <div style={{backgroundColor:'#A7C7E7', margin:'5px 30%', textAlign:'center', fontSize:'23px', fontFamily: 'Helvetica'}}
                                    onDragStart={(e) => dragStart(e, index)}
                                    onDragEnter={(e) => dragEnter(e, index)}
                                    onDragOver={(ev) => ev.preventDefault()}
                                    onDragEnd={drop}
                                    key={index}
                                    draggable={true}>
                                    {item}
                                </div>
                        ))}
                    </Grid> 

                    <Grid item xs={4}>    
                        <ToggleButtonGroup
                            color="primary"
                            value={option}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            orientation="vertical"
                        >
                            <ToggleButton style={{width: '180px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}} value="Alphabetical order">Alphabetical order</ToggleButton>
                            <ToggleButton style={{width: '180px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}} value="hydrophobic to hydrophilic" xs={4}>The most hydrophobic to the most hydrophilic</ToggleButton>
                            <ToggleButton style={{width: '180px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}} value="Groups by biophysical properties" xs={4}>Groups by biophysical properties</ToggleButton>
                        </ToggleButtonGroup>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Type in an order"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>  
                </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {handleEdit()}}>Apply</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}