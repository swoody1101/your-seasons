import React, { useCallback, useState, useRef } from "react";
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

  // const saveData = () => {
  //   // const data = canvasRef.current.getSaveData();
  //   // console.log(canvasRef.current.getDataURL("png", ""))
  //   // canvasRef2.current.loadSaveData(data)

  // };

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
          <div className="canvass-container">
            <CanvasDraw
              ref={canvasRef}
              brushColor={brushColor}
              catenaryColor={brushColor}
              brushRadius={brushRadius}
              lazyRadius={0}
              imgSrc={results}
              canvasWidth={440}
              canvasHeight={460}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawing;
