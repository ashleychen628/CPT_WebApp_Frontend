import React, {createContext, useEffect, useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { NavBtn, NavBtnLink, NavBtnLinkDisable, NavSearch } from '../Navbar/NavbarElements';
import CircularProgress from '@mui/material/CircularProgress';
import globalVal from '../../globalVal';
import ProteinGeneList from "./ProteinGeneList";
import { useNavigate } from "react-router-dom";

const ProteinGeneContext = createContext();


export default function SearchBar() {
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();

    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }


    return (
        <div>
            <ProteinGeneContext.Provider value={ProteinGeneList}>
                <NavSearch>
                    <ProteinGeneList setValue={setValue} setInputValue={setInputValue}
                        value={value} inputValue={inputValue} changeLocation={changeLocation} />
                    
                    {/* <NavBtn>
                        {
                            value !== "" && inputValue !== "" && value !== null ?
                                <NavBtnLink to={`proteins/cpt/${value}`} onClick={() => changeLocation(`proteins/cpt/${value}`)}>Search</NavBtnLink>
                                :
                                <NavBtnLinkDisable to={''}>Search</NavBtnLinkDisable>   
                        }
                    </NavBtn> */}
                </NavSearch>
            </ProteinGeneContext.Provider>
        </div>
    );
}
