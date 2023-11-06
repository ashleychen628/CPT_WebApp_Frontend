import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import GradientBar from './GradientBar';
import InteractiveHeatMap from './InteractiveHeatMap';
import Customize from "./Customize";
import SelectRange from "./SelectRange";
import './index.scss';

export default function Heatmap({
    xLabels,
    getYLabels,
    cpt_scores,
    colorMap,
    handleCellClick,
    selectedCell,
    cellSelectionStyle
}) {

    const [yLabels, setYlabel] = useState(getYLabels);
    const [mapValueX, setMapValueX] = useState({ scale: 1, translation: { x: 0, y: -9 } });
    const [mapValueY, setMapValueY] = useState({ scale: 1, translation: { x: 0, y: 0 } });
    const [mapValue, setMapValue] = useState({ scale: 1, translation: { x: 0, y: 0 } });
    const labelLengthMax = Math.max(...xLabels.map(l => l.length));

    const handleEditYLabels = (yLabels) => {
        setYlabel(yLabels);
    }

    const jumpedIntoView = (value) => {
        var jumpPosition = parseInt(value.replace(/[^0-9]/g, ''));
        var heatmapElem = document.getElementById("heatmap-item");
        if (heatmapElem !== null) {
        var viewportWidth = document.getElementById("heatmap-item").clientWidth;
        }

        var jumpLength = - ((jumpPosition * 10) * mapValue.scale - viewportWidth / 2);

        setMapValueX({ scale: 1, translation: { x: jumpLength, y: -9 } });
        setMapValue({ scale: mapValue.scale, translation: { x: jumpLength, y: mapValue.translation.y } });

    }

    return (
        <div>
            <div className="heatmap-section">
                <div className="heatmap-part">
                    <div className="heatmap-item" id="heatmap-item">
                        <div className="tooltip" style={{ zIndex: 19 }}>
                            <Tooltip
                                id="cell-tooltip"
                                style={{ backgroundColor: "rgb(255,255,255, 0.9)", color: "#222", zIndex: 19 }}
                                render={({ content, activeAnchor }) => (
                                    <span>
                                        Wild-type amino acid and position: {content}
                                        <br />
                                        Mutant amino acid: {activeAnchor?.getAttribute('data-some-relevant-attr')}
                                        <br />
                                        Prediction: {activeAnchor?.getAttribute('data-some-relevant-attr2')}
                                    </span>
                                )}
                            />
                        </div>

                        {/* {showHeatMap()} */}
                        <InteractiveHeatMap 
                            xLabels={xLabels}
                            yLabels={yLabels}
                            cpt_scores={cpt_scores}
                            colorMap={colorMap}
                            handleCellClick={handleCellClick}
                            selectedCell={selectedCell}
                            cellSelectionStyle={cellSelectionStyle}
                            handleEditYLabels={handleEditYLabels}
                            labelLengthMax={labelLengthMax}
                            mapValue={mapValue}
                            setMapValue={setMapValue}
                            mapValueX={mapValueX}
                            setMapValueX={setMapValueX}
                            mapValueY={mapValueY}
                            setMapValueY={setMapValueY}
                        />

                    </div>
                </div>

                <div className="gradientbar">
                    <GradientBar />
                </div>
            </div>
      
            <div className="customize">
                {yLabels && <Customize yLabels={yLabels} handleEditYLabels={handleEditYLabels} />}

                {xLabels && <SelectRange xLabels={xLabels} jumpedIntoView={jumpedIntoView} />}
            </div>

        </div>
    );
};