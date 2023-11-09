import React, { useEffect, useState} from 'react';
import "./MolstarStructure.scss";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import globalVal from '../../globalVal';
import NativeSelect from '@mui/material/NativeSelect';

export default function MolstarStructure(props) {
    const cpt_data_url = globalVal.baseUrl + 'getCifFile/' + props.proteinId + "/";
    // const cpt_data_url = "https://n7ypyxmdo0.execute-api.us-east-2.amazonaws.com/dev/getCifFile/1433G"
    const alphafold_data_url = "https://alphafold.ebi.ac.uk/files/";

    const [dataCanvas1, setDataCanvas1] = useState('cpt');
    const [dataCanvas2, setDataCanvas2] = useState('plddt');
    const [cifName, setCifName] = useState();

    const handleChange1 = (event) => {
        setDataCanvas1(event.target.value);
    };

    const handleChange2 = (event) => {
        setDataCanvas2(event.target.value);
    };
    
    useEffect(() => {
        fetch("/data/Alphafold2.json")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                var uniprot = data[props.proteinId + "_HUMAN"];
                setCifName("AF-" + uniprot + "-F1-model_v1.cif")
            })
    })

    // const handleChange = (event, newColorBy) => {
    //     setColorBy(newColorBy);
    //     if (newColorBy === 'cpt') {
    //         setShowCPT(true);
    //         setShowplddt(false);
    //     } else if (newColorBy === 'plddt') {
    //         setShowCPT(false);
    //         setShowplddt(true);
    //     } else if (newColorBy === 'compare') {
    //         setShowCPT(true);
    //         setShowplddt(true);
    //     }
    // };
    const displayStructure = (dataSource) => {

        if (dataSource === 'cpt') { 
            return (
                <pdbe-molstarcpt id="pdbeMolstarComponent" custom-data-url={cpt_data_url + cifName}
                            custom-data-format='cif' alphafold-view="true" hide-controls="true"
                            bg-color-r="255" bg-color-g="255" bg-color-b="255">
                </pdbe-molstarcpt> 
            )
        }
        else if (dataSource === 'plddt') {
            return (
                <pdbe-molstar id="pdbeMolstarComponent" custom-data-url={alphafold_data_url + cifName}
                            custom-data-format='cif' alphafold-view="true" hide-controls="true"
                            bg-color-r="255" bg-color-g="255" bg-color-b="255">
                </pdbe-molstar> 
            )
        }
        else {
            return (
                <pdbe-molstarcpt id="pdbeMolstarComponent" custom-data-url={cpt_data_url + cifName}
                            custom-data-format='cif' alphafold-view="true" hide-controls="true"
                            bg-color-r="255" bg-color-g="255" bg-color-b="255">
                </pdbe-molstarcpt> 
            )
        }

    }

    return (
        <div className='Canvas'>
            {/* <div className='Control_Panel'>
                <ToggleButtonGroup
                color="primary"
                value={colorBy}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="cpt">Color by CPT score</ToggleButton>
                <ToggleButton value="plddt">Color by pLDDT score</ToggleButton>
                <ToggleButton value="compare">Compare two scores</ToggleButton>
                </ToggleButtonGroup>
            </div> */}
            <div className='Control-Panel'>
                <div className='control-canvas1'>
                    {/* <Box sx={{ width: '20%', float: 'left'}}> */}
                    <Box sx={{ width: '50%', float: 'left'}}>   
                        <FormControl fullWidth size="small">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Data Source for structure 2</InputLabel>
                                <NativeSelect
                                    defaultValue={'cpt'}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                    onChange={handleChange1}
                                    >
                                    <option value={'cpt'}>CPT Predictions</option>
                                    <option value={'plddt'}>pLDDT</option>
                                    <option value={'user'}>User-uploaded Scores</option>
                                </NativeSelect>
                        </FormControl>
                    </Box>
                </div>
                <div className='control-canvas2'>
                    <Box sx={{ width: '50%', float: 'left'}}>
                        <FormControl fullWidth size="small">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Data Source for structure 2</InputLabel>
                                <NativeSelect
                                    defaultValue={'plddt'}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                    onChange={handleChange2}
                                    >
                                    <option value={'cpt'}>CPT Predictions</option>
                                    <option value={'plddt'}>pLDDT</option>
                                    <option value={'user'}>User-uploaded Scores</option>
                                </NativeSelect>
                        </FormControl>
                    </Box>
                </div>
            </div>
            {cifName &&
                <div className='Molstar-canvas'>
                    <div className='canvas1'>
                        {displayStructure(dataCanvas1)}
                    </div>
                    <div className='canvas2'>
                        {displayStructure(dataCanvas2)}   
                    </div>
                </div>
            }
        </div>
    );
};
// https://alphafold.ebi.ac.uk/files/AF-P61981-F1-model_v1.cif