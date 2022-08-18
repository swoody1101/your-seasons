import React, { useCallback, useState, useRef } from "react";
import { Card, styled } from '@mui/material';
import CanvasDraw from "react-canvas-draw";
import './Drawing.css'
import Tools from "./components/Tools";
import results from "assets/images/results.png"
import ColorPicker from "./components/ColorPicker";

function Drawing() {
  const [brushColor, setBrushColor] = useState("#444");
  const [lastPenColor, setLastPenColor] = useState("#444");
  const [brushRadius, setBrushRadius] = useState(3);
  const canvasRef = useRef(null);

  const handleColorChange = useCallback(color => {
    const { rgb: { r, g, b, a } } = color;
    setBrushColor(`rgba(${r}, ${g}, ${b},${a})`);
    setLastPenColor(`rgba(${r}, ${g}, ${b},${a})`);
  }, []);

  const toolChange = useCallback(
    (tool, size) => {
      if (tool === "eraser") {
        setBrushColor("#ffffff");
      }
      if (tool === "pen") {
        setBrushColor(lastPenColor);
      }
    },
    [lastPenColor]
  );


  return (
    <div className="App">
      <div className="container">
        <div className="left-container">
          <div>
            <ColorPicker
              brushColor={brushColor}
              handleColorChange={handleColorChange}
            />
            <p style={{ marginTop: "0px" }}>color</p>
            <Tools
              setBrushRadius={setBrushRadius}
              handleToolChange={toolChange}
              canvasRef={canvasRef}
              brushRadius={brushRadius}
            />
          </div>
          <div>
            <ScrollBar>
              <div className="canvass-container">
                <CanvasDraw
                  ref={canvasRef}
                  brushColor={brushColor}
                  catenaryColor={brushColor}
                  brushRadius={brushRadius}
                  lazyRadius={0}
                  imgSrc={results}
                  canvasWidth={430}
                  canvasHeight={1000}
                />
              </div>
            </ScrollBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawing;

const ScrollBar = styled(Card)((props) => ({
  width: 'auto',
  height: '397px',
  overflow: 'auto',
  // 스크롤바 두께
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    height: '17%',
    backgroundColor: '#5e72e4',
    borderRadius: 10,
  }
}))