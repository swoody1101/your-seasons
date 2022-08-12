import React, { useState, useEffect } from "react";
import Slider from "react-input-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRefresh, faBackward, faDownload } from "@fortawesome/free-solid-svg-icons";
import { exportComponentAsJPEG } from 'react-component-export-image';


const Tools = ({ handleToolChange, brushRadius, setBrushRadius, canvasRef }) => {
  const [brushSize, setBrushSize] = useState(30);

  useEffect(() => {
    setBrushSize(brushRadius);
  }, [brushRadius]);

  return (
    <div style={{ boxShadow: "none", textAlign: "center" }}>
      <div className="slider-container">
        <div className="icon-container">
          <FontAwesomeIcon
            onClick={() => handleToolChange("pen", brushSize)}
            icon={faPen}
          />
        </div>
        <Slider
          axis="y"
          y={brushSize * -1 + 31}
          ymin={1}
          ymax={30}
          onChange={({ y }) => {
            setBrushRadius(y * -1 + 31);
            setBrushSize(y * -1 + 31);
          }}
          onDragEnd={() => {
            handleToolChange("pen");
          }}
        />
        <p style={{ marginBottom: "4px", marginTop: "4px" }}>{brushSize}</p>
      </div>
      <div className="slider-container">
        <div style={{ marginBottom: "12px", cursor: "pointer" }}>
          <FontAwesomeIcon icon={faBackward} onClick={() => canvasRef.current.undo()} />
          <p style={{ marginTop: "0px" }}>undo</p>
        </div>
        <div style={{ marginBottom: "12px", cursor: "pointer" }}>
          <FontAwesomeIcon icon={faRefresh} onClick={() => canvasRef.current.clear()} />
          <p style={{ marginTop: "0px" }}>clear</p>
        </div>
        <div style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faDownload} onClick={() => exportComponentAsJPEG(canvasRef, { fileName: "consulting results" })} />
          <p style={{ marginTop: "0px" }}>save</p>
        </div>
      </div>
    </div>
  );
}

export default Tools