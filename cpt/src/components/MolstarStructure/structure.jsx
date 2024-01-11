import React, { useEffect, useState } from 'react';
import globalVal from '../../globalVal';

export default function Structure(props) {
    // const [dataSource, setDataSource] = useState();
    const [cifName, setCifName] = useState();
    
    const cpt_data_url = globalVal.baseUrl + 'getCifFile/' + props.proteinId + '/';
    // const cpt_data_url = "https://n7ypyxmdo0.execute-api.us-east-2.amazonaws.com/dev/getCifFile/1433G"
    const alphafold_data_url = "https://alphafold.ebi.ac.uk/files/";

    useEffect(() => {
        setCifName(props.cifName);
        // setDataSource(props.dataSource);
    }, [props.cifName])


    return (
        <div>
            {
                cifName && props.dataSource === 'cpt' &&
                    <pdbe-molstarcpt id="pdbeMolstarComponent" custom-data-url={cpt_data_url + cifName + "?dataSource=cpt"}
                        custom-data-format='cif' alphafold-view="true" hide-controls="true"
                        bg-color-r="255" bg-color-g="255" bg-color-b="255">
                    </pdbe-molstarcpt>
            }
            {
                cifName && props.dataSource === 'plddt' &&
                    <pdbe-molstar id="pdbeMolstarComponent" custom-data-url={alphafold_data_url + cifName}
                        custom-data-format='cif' alphafold-view="true" hide-controls="true"
                        bg-color-r="255" bg-color-g="255" bg-color-b="255">
                    </pdbe-molstar>
            }
            {
                cifName && props.dataSource === 'user' &&
                    <pdbe-molstarcpt id="pdbeMolstarComponent" custom-data-url={cpt_data_url + cifName + "?dataSource=user"}
                        custom-data-format='cif' alphafold-view="true" hide-controls="true"
                        bg-color-r="255" bg-color-g="255" bg-color-b="255">
                    </pdbe-molstarcpt>
            }
        </div>
    )
    
}