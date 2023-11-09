import React, {useEffect, useState, useMemo} from "react";
import { useParams } from "react-router-dom";
import { interpolateRgb, color, rgb } from 'd3';
import "./index.scss";
import SelectRange from "../HeatMap/SelectRange";
import {NavBtn} from '../Navbar/NavbarElements';
import { Button } from "@mui/material";
import { Tooltip } from 'react-tooltip';

import InteractiveHeatMap from "../HeatMap/InteractiveHeatMap";
import Heatmap from "../HeatMap";
import DensityPlot from "../DensityPlot";
import ClinVarTable from "../ClinVarTable";
import MolstarStructure from "../MolstarStructure";
import { Helmet } from "react-helmet";
import Divider from '@mui/material/Divider';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import IconButton from '@mui/material/IconButton';
import globalVal from "../../globalVal";

const AA_LIST_PROPERTY = 'WFYPMILVAGCSTQNDEHRK';
const EQUAL_THRESHOLD = 1e-12;
const WHITE = rgb(255, 255, 255);
// const LIGHT_GREY = rgb(219, 219, 219);
// const RED = rgb(220, 0, 0);
// const BLUE = rgb(143, 179, 255);
const LIGHT_GREY = rgb(238, 238, 238);
const RED = rgb(210, 17, 17);
const BLUE = rgb(111, 168, 220);


export default function ProteinPage() {
    const urlParameters = useParams();
    let proteinId = urlParameters.proteinId;
    let dataSource = urlParameters.dataSource;

    const [yLabels, setYlabel] = useState();
    const [xLabels, setXlabel] = useState();
    const [cptScores, setCPTscores] = useState();
    // const [title, setTitle] = useState(proteinId + "_HUMAN CPT");

    useEffect(() => {
        fetch(globalVal.baseUrl + 'getCPTscores/' + proteinId + "?dataSource=" + dataSource, {
            method: "GET"
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setXlabel(data["x_label"])
                setYlabel(data["y_label"])
                setCPTscores(data["cpt_scores"])
            })
    }, []);

    // TODO: add those two functions to heatmap component?
    const createColorMapper = () => {
        
        const minVal = cptScores["minVal"];
        const maxVal = cptScores["maxVal"];

        // TODO: error handling -> absolute value too small
        // if (EQUAL_THRESHOLD > Math.abs(maxVal - minVal)) {
        //     return WHITE.hex();
        // }

        return (v) => {
            // console.log(v);
            // symmetrical case
            // var mappedVal = (v + range) / (2 * range);
            var mappedVal = (v - minVal) / (maxVal - minVal);

            if (!mappedVal) {
                return WHITE.hex();
            }

            let c;
            if (mappedVal < 0.5) {
                c = color(interpolateRgb.gamma(2)(BLUE, LIGHT_GREY)(mappedVal * 2));
            } else {
                c = color(interpolateRgb.gamma(2)(LIGHT_GREY, RED)((mappedVal - 0.5) * 2));
            }
            // console.log("color: " + c.hex())
            return c.hex()
        };
    };
    
    const colorMapper = useMemo(() => {
        return cptScores ? createColorMapper() : null;
    }, [cptScores]);

    const handleDownloadFile = () => {
        fetch(globalVal.baseUrl + 'exportFile/' + proteinId, {
            method: "GET"
        })
            .then((res) => {
                return res.blob()
            })
            .then((blob)=>{
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = proteinId + '_HUMAN.csv.gz';
                alink.click();
            })
    }

    const getTitle = () => {
        var title = dataSource === "cpt"
            ? proteinId + "_HUMAN CPT"
            : proteinId + " User Uploaded";
        return (
            <div className="download-file">
                <Tooltip id="reset-tooltip" style={{ zIndex: 19, fontSize: "8pt"}}/> 
                <p style={{ fontSize: 29, color: "black", textAlign: "left", fontFamily: "Helvetica" }}>
                    
                    {title}
                    
                    {dataSource === "cpt" &&
                        <span>
                            <IconButton aria-label="fileDownload"
                                        onClick={handleDownloadFile}
                                        data-tooltip-id="reset-tooltip"
                                        data-tooltip-content="Export CPT prediction scores"
                                        data-tooltip-place="bottom"
                                        data-tooltip-delay-show="10">
                                
                                <FileDownloadRoundedIcon color="primary" sx={{ fontSize: 30 }} />

                            </IconButton>
                        </span> 
                    }
                </p>
            </div>
        )
    }

    return (
     
        <div className="protein-page">
            <div className="heatmap"> 
                <div className="header">
                    <div className="gene-name">
                        {getTitle()}
                    </div>
                </div>
                
                <Divider variant="middle" />

                <div className="interactiveHeatmap">
                    {cptScores && <Heatmap xLabels={xLabels} getYLabels={yLabels}
                            cpt_scores={cptScores["cpt_scores"]} colorMap={colorMapper} />}
                    
                </div>
            </div>
            <div className='DensityPlot'>
                {cptScores && <DensityPlot proteinId={proteinId} cptScores={cptScores["cpt_scores"]} />}
            </div>
            
            {
                dataSource === "cpt" && cptScores && 
                <div className='ClinVarTable'>
                    <ClinVarTable proteinId={proteinId} cptScores={cptScores["cpt_scores"]} />
                </div>
            }
            <div className='MolstarStructure'>
                <MolstarStructure proteinId={proteinId} />
            </div>
        </div>
    )
}