import React, {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {NavBtn, NavSearch} from '../Navbar/NavbarElements';
import { Button } from "@mui/material";
import Mark from "mark.js";

export default function SelectRange(props) {
    const [SequenceList, setSeqList] = useState(props.xLabels);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [markInstance, setInstance] = useState();
    let hasRange = false;

    if (inputValue === '') {
        hasRange = true;
    } else {
        hasRange = false;
    }

    const jumpPosition = (e, value) => {
        const element = document.getElementById(value);
        console.log(element);
        // element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        props.jumpedIntoView(value);
       
        var instance = new Mark(element);
        setInstance(instance);
        instance.mark(value);
    }
    
    return (
        <div>
                <NavSearch>
                <Autocomplete 
                    freeSolo
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        if (markInstance) {
                            markInstance.unmark();
                        }
                    }}
                    options={SequenceList}
                    sx={{
                        width: 200,
                        bgcolor: "#FFFFFF"
                    }}s
                    renderInput={(params) =>
                        <TextField {...params} size="small" label="Select a range to view" />}
                    >
                </Autocomplete>
                
                <NavBtn>
                    
				    <Button variant="contained" onClick={(e) => jumpPosition(e, value)} disabled={hasRange}>Go</Button>
                </NavBtn>
                </NavSearch>
        </div>
    );
}