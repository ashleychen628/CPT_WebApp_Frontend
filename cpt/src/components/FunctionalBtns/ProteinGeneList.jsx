import React, {createContext, useEffect, useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const ProteinGeneContext = createContext();


export default function ProteinGeneList(props) {
    const [ProteinGeneList, setPGList] = useState([]);
    // const [value, setValue] = useState('');
    // const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = React.useState(false);
    // const [disableBtn, setDisableBtn] = useState()
    const loading = open && ProteinGeneList.length === 0;

    // useEffect(() => {
    //         fetch('https://n7ypyxmdo0.execute-api.us-east-2.amazonaws.com/dev/getProteinNames'
    //             , {method: "GET"})
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setPGList(data["Names"]["ProteinGeneList"]);
    //         })
    // }, []);
    useEffect(() => {

        if (!loading) {
        return undefined;
        }

        fetch("/data/ProteinGene.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPGList(data["ProteinGeneList"]);
        })

    }, [loading]);

    useEffect(() => {
        if (!open) {
        setPGList([]);
        }
    }, [open]);


    return (
        <div>
            <ProteinGeneContext.Provider value={ProteinGeneList}>
                <Autocomplete 
                    freeSolo
                    value={props.value}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={(event, newValue) => {
                        props.setValue(newValue);
                        props.changeLocation && props.changeLocation(`proteins/cpt/${newValue}`)
                    }}
                    inputValue={props.inputValue}
                    onInputChange={(event, newInputValue) => {
                        props.setInputValue(newInputValue);
                    }}
                    options={ProteinGeneList}
                    sx={{
                        width: 200,
                        bgcolor: "#FFFFFF"
                    }}
                
                    loading={loading}
                    // renderInput={(params) =>
                    //     <TextField {...params} size="small" label="Search by Protein/Gene" />}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size="small"
                            label="Search by Protein/Gene"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={15} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                                ),
                            }}
                        />
                    )}
                    >
                </Autocomplete>
            </ProteinGeneContext.Provider>
        </div>
    );
}
