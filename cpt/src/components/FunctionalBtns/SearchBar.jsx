import React, {createContext, useEffect, useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { NavBtn, NavBtnLink, NavBtnLinkDisable, NavSearch } from '../Navbar/NavbarElements';
import CircularProgress from '@mui/material/CircularProgress';
import globalVal from '../../globalVal';

// import { ThemeProvider } from '@mui/material/styles';
// import theme from "../../Theme";

const ProteinGeneContext = createContext();


export default function SearchBar() {
    const [ProteinGeneList, setPGList] = useState([]);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
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

        fetch(globalVal.baseUrl + 'getProteinNames'
            , {method: "GET"})
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPGList(data["Names"]["ProteinGeneList"]);
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
                <NavSearch>
                    {/* {console.log("value " + value)}
                    {console.log("inputvalue " + inputValue)} */}
                    <Autocomplete 
                        freeSolo
                        value={value}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
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
                    
                    <NavBtn>
                        {
                            value !== "" && inputValue !== "" && value !== null ?
                                <NavBtnLink to={`proteins/cpt/${value}`}>Search</NavBtnLink>
                                :
                                <NavBtnLinkDisable to={''}>Search</NavBtnLinkDisable>   
                        }
                         {/* <NavBtnLink to={`proteins/${value}`}>Search</NavBtnLink> */}
                    </NavBtn>
                </NavSearch>
            </ProteinGeneContext.Provider>
        </div>
    );
}
