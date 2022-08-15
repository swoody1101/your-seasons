import React, { useRef, useEffect, useState } from "react";
import * as faceapi from 'face-api.js';

const OpenViduVideoComponent = (props) => {
  // streamManager state
  const [streamManager, setStreamManager] = useState(props.streamManager);
  const videoRef = useRef();

  // face api state
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const canvasRef = useRef();
  const videoWidth = 640;
  const videoHeight = 480;

  // streamManager useEffect
  useEffect(() => {
    if (props.streamManager) {
      setStreamManager(props.streamManager.addVideoElement(videoRef.current));
      console.log(videoRef.current)
    }
  }, [props.streamManager]);

  // face api useEffect
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    }
    loadModels();
  }, []);
  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 100)
  }

  return (
    <div style={{ position: "relative" }}>
      <video autoPlay={true} ref={videoRef} onPlay={handleVideoOnPlay} />
      <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: '20000' }} />
    </div>
  );
}

export default OpenViduVideoComponent
