import React, { useEffect, useState, useRef } from 'react';
import "./MolstarStructure.scss";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import Script from './Script';
import ColoredByCPT from './ColoredByCPT';

export default function MolstarStructure(props) {
    // Script("../../pdbe-molstar-component-3.1.2.js")
    const cpt_data_url = 'https://n7ypyxmdo0.execute-api.us-east-2.amazonaws.com/dev/getCifFile/' + props.proteinId;
    // const cpt_data_url = "https://n7ypyxmdo0.execute-api.us-east-2.amazonaws.com/dev/getCifFile/1433G"
    const alphafold_data_url = "https://alphafold.ebi.ac.uk/files/AF-P61981-F1-model_v1.cif";

    const [colorBy, setColorBy] = useState('cpt');
    const [showCPT, setShowCPT] = useState(true);
    const [showplddt, setShowplddt] = useState(false);

    const handleChange = (event, newColorBy) => {
        setColorBy(newColorBy);
        console.log(newColorBy)
        if (newColorBy === 'cpt') {
            setShowCPT(true);
            setShowplddt(false);
        } else if (newColorBy === 'plddt') {
            setShowCPT(false);
            setShowplddt(true);
        } else if (newColorBy === 'compare') {
            setShowCPT(true);
            setShowplddt(true);
        }
    };

    //   function isRegistered(name) {
    //   return document.createElement(name).constructor.__proto__ !== window.HTMLElement;
    // }

    // var allElems = document.getElementsByTagName('*');
    // var nodeNames = [].map.call(allElems, el => el.nodeName.toLowerCase())
    //   .filter((value, index, self) => self.indexOf(value) === index)

    // console.log('all elements', nodeNames);
    // console.log('registered, custom elements', nodeNames.filter(isRegistered))

    return (
        <div className='Canvas'>
            <div className='Molstar_canvas'>
                {showCPT &&
                    <div className="Molstar_structure" >
                        {/* <pdbe-molstar id="pdbeMolstarComponent" custom-data-url={cpt_data_url}
                            custom-data-format='cif' alphafold-view="true" hide-controls="true"
                            bg-color-r="255" bg-color-g="255" bg-color-b="255"></pdbe-molstar> */}
                        <pdbe-molstarcpt id="pdbeMolstarComponent-cpt" custom-data-url={cpt_data_url}
                            custom-data-format='cif' alphafold-view="true" hide-controls="true"
                            bg-color-r="255" bg-color-g="255" bg-color-b="255"></pdbe-molstarcpt>
                    </div>
                }
                {showplddt &&
                    <div className="Molstar_structure" >
                        <pdbe-molstar id="pdbeMolstarComponent" custom-data-url={alphafold_data_url}
                            custom-data-format='cif' alphafold-view="true" hide-controls="true"
                            bg-color-r="255" bg-color-g="255" bg-color-b="255"></pdbe-molstar>
                    </div>
                }
                 
            </div>

            <div className='Control_Panel'>
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
            </div>
        </div>
    );
};
// https://alphafold.ebi.ac.uk/files/AF-P61981-F1-model_v1.cif