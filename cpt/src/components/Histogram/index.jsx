import React, { useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { Tooltip } from 'react-tooltip';

const PLOT_WIDTH = 741;
const PLOT_HEIGHT = 150;

const width = 741;
const height = 150;

const pixelsPerTick = 30;
const padding = 16;
const FONT_SIZE = 6;

export default function Histogram(props) {

    // read the data
    // build buckets from the dataset
    let bin = 50;
    let gap = (1 / bin);
    // console.log(gap)
    const thresholds = Array.from({ length: bin }, (_, i) => (i + 1) * gap);
    // const thresholds = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    // console.log(thresholds)

    const bucketGenerator = d3
    .bin()
    .value((d) => d)
    .domain([0, 1])
    .thresholds(thresholds);
    // build the scales
    const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, PLOT_WIDTH-padding]);

    let buckets = bucketGenerator(props.data);
    const maxY = Math.max(...buckets.map((bucket) => bucket?.length));
    let heighestY = (maxY / 10 + 1) * 10;

    const yScale = useMemo(() => {

    return d3.scaleLinear()
        .range([PLOT_HEIGHT-padding, 0])
        .domain([0,  heighestY]);

    }, [props.data, PLOT_HEIGHT-padding]);

    // build the rectangles
    const allRects = buckets.map((bucket, i) => {
        // console.log(yScale(bucket.length))
        return (
            <g  data-tooltip-id="rect-tooltip"
                data-tooltip-content={bucket.length}
                data-some-relevant-attr={bucket.x0}
                data-some-relevant-attr2={bucket.x1}> 
            <rect
            key={i}
            fill="#A7C7E7"
            stroke="black"
            stroke-width="0.6"
            x={xScale(bucket.x0) + padding}
            width={xScale(bucket.x1) - xScale(bucket.x0)}
            y={yScale(bucket.length)}
            height={PLOT_HEIGHT - padding - yScale(bucket.length)}
                />
            </g>
        );
    });

    const range = xScale.range();

    const ticks = useMemo(() => {
        const width = range[1] - range[0];
        const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

        return xScale.ticks(numberOfTicksTarget).map((value) => ({
        value,
        xOffset: xScale(value),
        }));
    }, [xScale]);

    const AxisX = () => (
        <polyline fill="none" stroke="black" strokeWidth=".8"
            points={`${padding},${height - padding} ${width},${height - padding}`}/>
    );

    const AxisY = () => (
        <polyline fill="none" stroke="black" strokeWidth=".8"
            points={`${padding},${padding} ${padding},${height - padding}`} />
    );

    const XLabels = () => {
        const y = height - padding + FONT_SIZE * 2 - 3;
        
        // const xAxis = Array.from({ length: 49 }, (_, i) => (i + 1) * 5);
        let bin = 50;
        let maxX = 1;
        let gap = (maxX / bin);
        const xAxis = Array.from({ length: bin }, (_, i) => (i + 1) * gap);
         const xText = [" ", 0.04, " ", 0.08, " ", 0.12, " ", 0.16, " ", 0.20, " ", 0.24, " ",
            0.28, " ", 0.32, " ", 0.36, " ", 0.40, " ", 0.44, " ", 0.48, " ", 0.52, " ",
            0.56, " ", 0.60, " ", 0.64, " ", 0.68, " ", 0.72, " ", 0.76, " ", 0.80, " ",
             0.84, " ", 0.88, " ", 0.92, " ", 0.96, " ", 1.00]
        
        return xAxis.map((element, index) => {
            const x =
                (element / maxX) * (PLOT_WIDTH - padding )+ padding;
            // console.log("x: " + x)
            // console.log(chartWidth)
            return (
                <g className='labelXAxis'>
                <line
                    key={element + "xline"}
                    x1={x}
                    y1={height-padding}
                    x2={x}
                    y2={height-padding+4}
                    stroke="#808080"
                    strokeWidth=".8" />
                <text
                    key={element + "xtext"}
                    x={x-4}
                    y={y}
                    style={{
                        fill: "#808080",
                        fontSize: FONT_SIZE,
                        fontFamily: "Helvetica"
                    }}
                >
                    {xText[index]}
                </text>
                </g>
            );
        });
    };

    
    const YLabels = () => {   
        let heighest = maxY / 10 + 1;
        const yAxis = Array.from({ length: heighest }, (_, i) => ((i + 1) * 10));
        // console.log(yAxis)
        return yAxis.map((element, index) => {
            const y_line = (element / heighestY) * (PLOT_HEIGHT - padding);
            const y_text =  PLOT_HEIGHT - y_line + FONT_SIZE/2 - padding;
            return (
                <g className='labelXAxis'>
                <line
                    key={element + "yline"}
                    x1={12}
                    y1={y_line}
                    x2={padding}
                    y2={y_line}
                    stroke="#808080"
                    strokeWidth=".8" />
                <text
                    key={element + "ytext"}
                    x={padding/2 - FONT_SIZE/2}
                    y={y_text}
                    style={{
                        fill: "#808080",
                        fontSize: FONT_SIZE,
                        fontFamily: "Helvetica",
                        textAlign: "end"
                    }}
                    text-anchor="middle"
                >
                    {element}
                </text>
                    </g>
            );
            });
    };

    return (
        <div>
            <p style={{ fontSize: 20,
                    color: "black",
                    textAlign: "left",
                    fontFamily: "Helvetica",
                    fontWeight: "bold"
            }}>
                Histogram
            </p>
            <div className="tooltip" style={{ zIndex: 19 }}>
                    <Tooltip
                        id="rect-tooltip"
                        style={{ backgroundColor: "rgb(211,211,211, 0.8)", color: "#222", zIndex: 19 }}
                        render={({ content, activeAnchor }) => (
                            <span>
                                Range: {activeAnchor?.getAttribute('data-some-relevant-attr')} ~ {activeAnchor?.getAttribute('data-some-relevant-attr2')}
                                <br/>
                                Number of variants : {content}
                            </span>
                        )}
                    />
            </div>
            <svg viewBox={`0 0 ${PLOT_WIDTH} ${PLOT_HEIGHT}`}>
                
                {allRects}
                <g id="axisLines">
                    <AxisX />
                    <AxisY />
                </g>
                <g id="labelAxis">
                    <XLabels />
                    <YLabels />
                </g>
                {/* Main horizontal line */}
                {/* <path
                    d={["M", range[0], 0, "L", range[1], 0].join(" ")}
                    fill="none"
                    stroke="currentColor"
                /> */}

                {/* Ticks and labels */}
                {/* {ticks.map(({ value, xOffset }) => (
                    <g key={value} transform={`translate(${xOffset}, 0)`}>
                    <line y2={5} stroke="currentColor" />
                    <text
                        key={value}
                        style={{
                        fontSize: "10px",
                        textAnchor: "middle",
                        transform: "translateY(20px)",
                        }}
                    >
                        {value}
                    </text>
                    </g>
                ))} */}
            </svg> 
        </div>
    )
}