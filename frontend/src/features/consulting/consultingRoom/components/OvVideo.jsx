import React, { useRef, useEffect, useState } from "react";

const OpenViduVideoComponent = (props) => {
  // streamManager state
  const [streamManager, setStreamManager] = useState(props.streamManager);
  const videoRef = useRef();

  // streamManager useEffect
  useEffect(() => {
    if (props.streamManager) {
      setStreamManager(props.streamManager.addVideoElement(videoRef.current));
    }
  }, [props.streamManager]);

  return (
    <video autoPlay={true} ref={videoRef} />
  );
}

export default OpenViduVideoComponent
