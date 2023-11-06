import React from "react";

export default function GradientBar() {
    const FONT_SIZE = 13;
    const BAR_WIDTH = 20;
    const BAR_HEIGHT = 200;
    const padding = 5;

    const Labels = () => {
        const label_list = [0.8, 0.6, 0.4, 0.2];
        const x = BAR_WIDTH + 2;
        const LABEL_SIZE = 12;

        return label_list.map((element, index) => {
            const y = ((1 - element) / 1) * 200 + FONT_SIZE + LABEL_SIZE / 3 + padding;
            return (
                <g className='barLabel'>
                    <text key={element} x={x} y={y}
                        style={{
                            fill: "#808080",
                            fontSize: LABEL_SIZE ,
                            fontFamily: "Helvetica"
                        }}>
                        {element}
                    </text>
                </g>
            );
        });
    };

    return (
        <div>
                <div className="gradientbar-and-label" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <svg width="80" height="240">
                    
                    <defs>
                        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#D21111" />
                        <stop offset="50%" stopColor="#EEEEEE" />
                        <stop offset="100%" stopColor="#6FA8DC" />
                        </linearGradient>
                    </defs>
                    <rect x="0" y={FONT_SIZE + padding} width="18" height="200" fill="url(#Gradient2)" stroke="black" strokeWidth=".4"/>

                    <text x="0" y={FONT_SIZE} style={{ fill: "black", fontSize: FONT_SIZE, fontFamily: "Helvetica" }}>
                        Pathogenic
                    </text>
                    <g id="BarLabels">
                        <Labels />
                    </g>

                    <text x="0" y={FONT_SIZE + 220} style={{ fill: "black", fontSize: FONT_SIZE, fontFamily: "Helvetica" }}>
                        Benign
                    </text>
                </svg>
                </div>

           
        </div>
    )
}