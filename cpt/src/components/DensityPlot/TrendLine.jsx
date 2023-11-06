import React, { useState } from 'react';

export default function TrendLine({
    avgScore, width, height, precision, maxY, maxX, cptScores, showPoints}) {
    
    const FONT_SIZE = 6;
    const padding = 12;
    const chartWidth = width - padding;
    const chartHeight = height - padding * 2;

    // const [showPoints, setShowPoints] = useState(false);

    const points = avgScore.map(score => {
        const x = (score.x / maxX) * chartWidth + padding;
        const y = chartHeight - (score.y / maxY) * chartHeight + padding;
        return `${x},${y}`;
        })
        .join(" ");

    const AxisX = () => (
        <polyline fill="none" stroke="black" strokeWidth=".8"
            points={`${padding},${height - padding} ${width},${height - padding}`} />
    );

    const AxisY = () => (
        <polyline fill="none" stroke="black" strokeWidth=".8"
            points={`${padding},${padding} ${padding},${height - padding}`} />
    );
    
    const plotPoints = () => {
        const drawPoints = []
        let x = 0;
        let cx = 0;
        let cy = 0;

        cptScores.map(eachProtein => {
            cx = (x / maxX) * chartWidth + padding;
            for (const [key, value] of Object.entries(eachProtein)) {
                for (var k in value) {
                    cy = chartHeight - (value[k] / maxY) * chartHeight + padding;
                    drawPoints.push(
                        <circle id={value[k]} cx={cx} cy={cy} r="0.7" fill="#0074d9"/>
                    )
                }
            }
            x += 1;
        })
        // for (var eachProtein in cptScores) {
        //     cx = (x / maxX) * chartWidth + padding;
        //     for (var key in cptScores[eachProtein]) {
        //         let y = cptScores[eachProtein][key];
        //         cy = chartHeight - (y / maxY) * chartHeight + padding;
        //         drawPoints.push(
        //             <circle id={y} cx={cx} cy={cy} r="0.7" fill="#0074d9"/>
        //         )
        //     }
        //     x += 1;
        // }
        return drawPoints;
    }

    const XLabels = () => {
        const y = height - padding + FONT_SIZE * 2 - 3;
        
        const xAxis = Array.from({ length: 49 }, (_, i) => (i + 1) * 5);
        
        return xAxis.map((element, index) => {
            const x =
                (element / maxX) * chartWidth + padding - FONT_SIZE / 2;
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
                    {element}
                </text>
                    </g>
            );
            });
    };

    const YLabels = () => {        
        const yAxis = Array.from({ length: 4 }, (_, i) => ((i + 1) * 0.2).toFixed(1));
        
        return yAxis.map((element, index) => {
            const y_line = (element / maxY) * chartHeight + padding;
            const y_text = (height - y_line) + FONT_SIZE/3;
            return (
                <g className='labelXAxis'>
                <line
                    key={element + "yline"}
                    x1={9}
                    y1={y_line}
                    x2={padding}
                    y2={y_line}
                    stroke="#808080"
                    strokeWidth=".8" />
                <text
                    key={element + "ytext"}
                    x={-0.5}
                    y={y_text}
                    style={{
                        fill: "#808080",
                        fontSize: FONT_SIZE,
                        fontFamily: "Helvetica"
                    }}
                >
                    {element}
                </text>
                    </g>
            );
            });
    };

    return (
        <div className="TrendLine">
            <svg viewBox={`0 0 ${width} ${height}`}>
                <g id="axisLines">
                    <AxisX />
                    <AxisY />
                    <polyline
                        fill="none"
                        stroke="#D21111"
                        strokeWidth={1.1}
                        points={points}
                    />
                </g>

                <g id="labels">
                    <text x={0} y={7} fontSize="8">Pathogenic</text>
                    <text x={0} y={15} fontSize="8">1</text>
                    <line x1={6} y1={padding} x2={padding} y2={padding} stroke="black" strokeWidth=".8"/>
                    <text x={-0.8} y={13.5 + chartHeight} fontSize="8">0</text>
                    <line x1={6} y1={padding+chartHeight} x2={padding} y2={padding+chartHeight} stroke="black" strokeWidth=".8"/>
                    <text x={-1} y={padding+chartHeight+10} fontSize="8">Benign</text>
                </g>

                <g id="labelAxis">
                    <XLabels />
                    <YLabels />
                </g>

                {
                    showPoints &&
                    <g id="points">
                        {plotPoints()}
                    </g>
                }

            </svg>
        </div>
    )
   
}