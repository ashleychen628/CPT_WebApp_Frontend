import React, {useState, useEffect} from "react";
// import './InteractiveHeatMap.scss';
import { MapInteractionCSS } from 'react-map-interaction';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function InteractiveHeatMap({
  xLabels,
  yLabels,
  cpt_scores,
  colorMap,
  handleCellClick,
  selectedCell,
  cellSelectionStyle,
  labelLengthMax,
  // xValue,
  // setXValue,
  // scale,
  // setScale
  mapValue,
  setMapValue,
  mapValueX,
  setMapValueX,
  mapValueY,
  setMapValueY,
  // maxDistance,
  // minDistance
}) {

  // const [mapValueX, setMapValueX] = useState({ scale: 1, translation: { x: xValue, y: -9 } });
  // const [mapValueY, setMapValueY] = useState({ scale: 1, translation: { x: xValue, y: 0 } });
  // const [mapValue, setMapValue] = useState({ scale: 1, translation: { x: xValue, y: 0 } });

  useEffect(() => {
    handleReset();
  }, []);

  if (!cellSelectionStyle) {
    // cellSelectionStyle = "2px solid #E8B10C";
    cellSelectionStyle = "1px solid white";
  }

  // compute fixed width of x-axis labels so doesn't jitter
  // e.g. when switching to bold rendering for highlighting
  // const xLabelHeight = (labelLengthMax * mapValue.scale * 6) + "px";
  const xLabelHeight = (labelLengthMax * 6) + "px";
  let showCells = [];
  let xlabelContent = [];
    
  const renderColumnBase = (i, columnContent, xLabel) => {
    let paddingLeft = '0px';
    let paddingRight = '0px';
    let align = 'center';
    
    if (i === 0) {
      paddingLeft = '0px';
      paddingRight = '0px';
      align = 'end';
    }
    return (
      <div
        className="columnContent"
        id={xLabel}
        key={"xlabel_" + i}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "10px",
          paddingLeft: paddingLeft,
          paddingRight: paddingRight,
        }}
      >
        {columnContent}
       
        <div
          style={{
            fontSize: 'xx-small',
            display: "flex",
            justifyContent: "flex-end",
            alignItems: align,
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            paddingLeft: paddingLeft ,
            paddingRight: paddingRight,
            MozBoxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
            boxSizing: 'border-box',
          }}
        >
          {xLabel && '-'}
        </div>
        <div
          style={{
            fontSize: 'xx-small',
            height: xLabelHeight,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: align,
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            paddingLeft: paddingLeft ,
            paddingRight: paddingRight,
            MozBoxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
            boxSizing: 'border-box',
          }}
        >
          {xLabel}
          </div>
        </div>
    );
  };

  const renderYLabels = () => {
    if (yLabels) {
      const yLabelContent = yLabels.map((yLabel, j) => {
        return (
          <div
            key={"ylabel_" + j}
            style={{
              fontSize: 'xx-small',
              height: "10px",
              width: "12px",
              lineHeight: "10px",
              textAlign: "center",
              horizontalAlign: "middle",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
              cursor: "default"
            }}
          >
            {yLabel}
          </div>
        );
      });
        const yTickContent = yLabels.map((yLabel, j) => {
          return (
            <div
              key={yLabel + "_" + j}
              style={{
                fontSize: 'xx-small',
                height: "10px",
                width: "10px",
                lineHeight: "10px",
                textAlign: "right",
                horizontalAlign: "middle",
                cursor: "default"
              }}
            >
              {'-'}
            </div>
          );
      });
      
      return (
        <MapInteractionCSS disablePan disableZoom value={mapValueY} minScale={1} maxScale={3}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "hidden",
              justifyContent: "top",
              zIndex: 18
            }}
          > 
          
          <div
            key={"xlabel_" + '-2'}
            style={{
              display: "flex",
              flexDirection: "column",
              // width: 10 * mapValue.scale,
              width: 10,
              backgroundColor: 'white'
            }}
          >
            {yLabelContent}
            <div
              style={{
                fontSize: 'xx-small',
                width: "10px",
                height: (labelLengthMax * 8) + "px",
                textAlign: "center",
                horizontalAlign: "middle",
                cursor: "default"
              }}
            >
              {}
            </div>
            </div>
          <div
            key={"xlabel_" + '-1'}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "10px",
              // position: 'absolute',
              // marginLeft: "10px",
              backgroundColor: 'white'
            }}
          >
            {yTickContent}
            <div
              style={{
                fontSize: 'xx-small',
                width: "10px",
                height: (labelLengthMax * 8) + "px",
                textAlign: "right",
                horizontalAlign: "middle",
                cursor: "default",
              }}
            >
              {}
            </div>
          </div>
          </div>
        </MapInteractionCSS>
      );
    } else {
      return <></>;
    }
  };
  
  const renderDataColumn = (column, i) => {
    let x = xLabels[i];
    const columnContent = yLabels.map((y_label, j) => (
      <div
        key={i + "_" + j}
        onClick={event => {
          if (handleCellClick) {
            handleCellClick(i, j, column[xLabels[i]][y_label]);
          }
          event.stopPropagation();
        }}
        data-tooltip-id="cell-tooltip"
        data-tooltip-content={x}
        data-some-relevant-attr={y_label}
        data-some-relevant-attr2={column[xLabels[i]][y_label]}
        style={{
          height: "10px",
          width: "10px",
          textAlign: "justify",
          // backgroundColor: colorMap(cellValue),
          backgroundColor: colorMap(column[xLabels[i]][y_label]),
          border:
            selectedCell && i === selectedCell['i'] && j === selectedCell['j']
              ? cellSelectionStyle
              : null
        }}
        />
    ));
    return renderColumnBase(i, columnContent, xLabels[i]);
  };

  const renderXLabels = () => {
    if (xLabels) {
      cpt_scores.map((column, i) => {
        let x_label = xLabels[i];
        const columnContent = yLabels.map((y_label, j) => {
          return (
            <div
              key={i + "_" + j}
              onClick={event => {
                if (handleCellClick) {
                  handleCellClick(i, j, column[xLabels[i]][y_label]);
                }
                event.stopPropagation();
              }}
              data-tooltip-id="cell-tooltip"
              data-tooltip-content={x_label}
              data-some-relevant-attr={y_label}
              data-some-relevant-attr2={column[xLabels[i]][y_label]}
              style={{
                height: "10px",
                width: "10px",
                textAlign: "justify",
                // backgroundColor: colorMap(cellValue),
                backgroundColor: colorMap(column[xLabels[i]][y_label]),
                border:
                  selectedCell && i === selectedCell['i'] && j === selectedCell['j']
                    ? cellSelectionStyle
                    : null
              }} 
            />
          )
        })
        showCells.push(
          <div
            className="columnContent"
            id={x_label+"_cells"}
            key={"xCell_" + i}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "10px",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            {columnContent}
          </div>
        )
        xlabelContent.push(
          <div
            className="columnContent"
            id={x_label}
            key={"xLabel_" + i}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "10px",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
          <div
          style={{
            fontSize: 'xx-small',
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            paddingLeft: '0px',
            paddingRight: '0px',
            MozBoxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
            boxSizing: 'border-box',
          }}
        >
          {x_label && '-'}
        </div>
        <div
          style={{
            fontSize: 'xx-small',
            height: xLabelHeight,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            paddingLeft: '0px',
            paddingRight: '0px',
            MozBoxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
            boxSizing: 'border-box',
          }}
        >
          {x_label}
            </div>
          </div>
        )
      })
    }
  }

  const handleReset = () => {
    setMapValue({ scale: 1, translation: { x: 0, y: 0 } });
    setMapValueX({ scale: 1, translation: { x: 0, y: -9 } });
    // setMapValueY({ scale: 1, translation: { x: 0, y: 0 } });
    setValue([1, maxDistance]);
    document.getElementById("x-labels").style.gap = "0px";
    document.getElementById("x-labels").style.paddingLeft = "0px";
  };

  // const updateXLableGap = (scale) => {
  //   // let p = document.getElementById("M1_cells").getBoundingClientRect()['width'] - 10;
  //   let newGap = scale * 10 - 10;
  //   document.getElementById("x-labels").style.gap = newGap + "px";
  //   document.getElementById("x-labels").style.paddingLeft = newGap / 2 + "px";
  // }

  const showHeatMap = () => {

    var viewportWidth = document.getElementById("heatmap-item") &&
                        document.getElementById("heatmap-item").clientWidth;
    // var viewportHeight = document.getElementById("heatmap-item").clientHeight;
    
    
    var xMin = -((cpt_scores.length * 10 + 20) * mapValue.scale - viewportWidth);
    var xMax = 0;
    // var yMin = Math.min(0, -((20 * 10 + 35) * mapValue.scale - viewportHeight));
    var yMin = 0;
    var yMax = 0;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "hidden",
          width: "100%"
        }}
      > 
    
      <div className="y-labels">
        {renderYLabels()}
      </div>
        {renderXLabels()}
          <div className="main-contents"
              style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                overflow: "hidden"
          }}>
          <MapInteractionCSS value={mapValue} 
              translationBounds={{ xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax }}
              onChange={(value) => {
                // updateXLableGap(value.scale)
                setMapValue(value);
                setMapValueX({ scale: 1, translation: { x: value.translation.x, y: -9 } });
             
                var left = Math.ceil(- value.translation.x / (value.scale * 10));
                var right = left + Math.ceil(viewportWidth / (value.scale * 10)) - 1;
                setValue([left, right]);
                // setMapValueY({ scale: value.scale, translation: { x: 0, y: mapValue.translation.y } }); 
              }}
              minScale={1} maxScale={8} showControls>
            <div className="color-cells" id="color-cells"
                  style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "top", 
                    }}>
              {showCells}
            </div>
          </MapInteractionCSS>
{/* 
          <MapInteractionCSS disablePan disableZoom minScale={1} maxScale={5}
              value={mapValueX}
              translationBounds={{ xMin: xMin, xMax: xMax }}
            onChange={(value) => {
                    setMapValueX(value);
                  }}> */}
          
          <MapInteractionCSS disablePan disableZoom minScale={1} maxScale={1}
              value={mapValueX}
              translationBounds={{ xMin: xMin, xMax: xMax }}
              onChange={(value) => {
                    setMapValueX(value);
                  }}>
            <div className="x-labels" id="x-labels"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "top", 
                    paddingLeft: "0px",
                    gap: '0px'
                  }}>
           
              {xlabelContent}
            
            </div>
          </MapInteractionCSS>
        </div>
      </div>
    )
  }

  var viewportWidth = document.getElementById("heatmap-item") &&
                      document.getElementById("heatmap-item").clientWidth;
  var viewportWidth2 = Math.floor((window.innerWidth - 200) * 0.96);

  const minDistance = Math.trunc((viewportWidth2 - 20) / (10 * 8));
  const maxDistance = Math.floor((viewportWidth2 - 20) / 10) - 1;
  const [value, setValue] = React.useState([1, maxDistance]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // if (activeThumb === 0) {
    //   let leftMost = Math.max(newValue[0], value1[1] - maxDistance)
    //   setValue1([Math.min(leftMost, value1[1] - minDistance), value1[1]]);
    // } else {
    //   let leftMost = Math.min(newValue[1], value1[0] + maxDistance)
    //   setValue1([value1[0], Math.max(leftMost, value1[0] + minDistance)]);
    // }
    var right = 0;
    var left = 0;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], cpt_scores.length - minDistance);
        left = clamped;
        right = clamped + minDistance;
        setValue([left, right]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        left = clamped - minDistance;
        right = clamped;
        setValue([left, right]);
      }
    } else if (newValue[1] - newValue[0] > maxDistance || newValue[1] - newValue[0] === maxDistance) {
      if (activeThumb === 0) {
          const clamped = newValue[0];
          left = clamped;
          right = clamped + maxDistance;
          setValue([left, right]);
        } else {
          const clamped = newValue[1];
          left = clamped - maxDistance;
          right = clamped;
          setValue([left, right]);
        }
    }
    else {
      console.log(newValue[1] - newValue[0]) 
      left = newValue[0];
      right = newValue[1];
      setValue(newValue);
    }
   
    let newScale = (viewportWidth - 20) / ((right - left) * 10);
    console.log(newScale);
    let newX = -(((left) * 10 * newScale));
    console.log(newX);
    // let newX = mapValueX.translation.x;
    setMapValue({ scale: newScale, translation: { x: newX, y: 0 } })
    setMapValueX({ scale: 1, translation: { x: newX, y: -9 } })
    let newGap = newScale * 10 - 10;
    document.getElementById("x-labels").style.gap = newGap + "px";
    document.getElementById("x-labels").style.paddingLeft = newGap / 2 + "px";
  };

  return (
    <div>

      {showHeatMap()}

      {/* <Box sx={{ width: "100%" }}>
        <Slider
          // getAriaLabel={() => 'Minimum distance'}
          value={value}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
          disableSwap
          min={1}
          max={cpt_scores.length}
        />
      </Box> */}

      <button style={{ float: "right", position: 'relative' }}
              onClick={() => handleReset()}>
        Back to the origin
      </button>
    </div>
  );
};
