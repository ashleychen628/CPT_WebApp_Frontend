import React, { useEffect, useState, useRef } from 'react';
import TrendLine from './TrendLine';
import { Button, colors } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import globalVal from '../../globalVal';

// const PLOTWIDTH = 850;
// const PLOTHEIGHT = 100;
const PLOT_WIDTH = 741;
const PLOT_HEIGHT = 100;
const FONT_SIZE = PLOT_WIDTH / 247;
const precision = 2;

export default function DensityPlot(props) {
    const [avgScore, setAvgScore] = useState();
    const [maxX, setMaxX] = useState();
    const [showPoints, setShowPoints] = useState(false);

    useEffect(() => {
        fetch(globalVal.baseUrl + 'getCPTAvgScores/' + props.proteinId + "?dataSource=" + props.dataSource, {
            method: "GET"
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAvgScore(data["avg_scores"]);
                setMaxX(data["avg_scores"].length);
            })
    }, [props.cptScores]);

    const handleShowPoints = (event) => {
        setShowPoints(!showPoints)
    }

    return (
        <div>
            <p style={{ fontSize: 20,
                        color: "black",
                        textAlign: "left",
                        fontFamily: "Helvetica",
                        fontWeight: "bold"
                }}>
                    Average Predicted Effect Per Position
                </p>
            <div className='trendline'>
                {avgScore &&
                    <TrendLine
                    avgScore={avgScore}
                    width={PLOT_WIDTH}
                    height={PLOT_HEIGHT}
                    precision={2}
                    maxY={1}
                    // maxX={maxX}
                    maxX={246}
                    cptScores={props.cptScores}
                    showPoints={showPoints}
                        />}
            </div>

            <div className='controlPanel' style={{ marginTop: '2px'}}>
                <Box component="FormGroup" row sx={{ border: 1, borderRadius: '10px', borderColor: 'primary.main' }} p={0.8}>
                    {/* bgcolor: 'rgba(167, 199, 231, 0.3) */}
                    <FormControlLabel
                        control={<Checkbox size="small" showPoints={showPoints} onChange={handleShowPoints} inputProps={{ 'aria-label': 'controlled' }}/>}
                        label={<span style={{ fontSize: '14px' }}>Display All Scores</span>} />
                </Box>      
            </div>
        </div>
    )
}