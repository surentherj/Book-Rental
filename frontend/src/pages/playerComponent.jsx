import React, { useEffect } from "react";

const PlayerComponent = ({ videoSrc, onVideoUpdate, videoRef }) => {
  useEffect(() => {
    if (videoRef?.current) {
      const video = videoRef.current;
      const handleVideoEvent = () => {
        onVideoUpdate(video);
      };

      video.addEventListener("timeupdate", handleVideoEvent);

      return () => {
        video.removeEventListener("timeupdate", handleVideoEvent);
      };
    }
  }, [onVideoUpdate]);

  return (
    <div>
      <video ref={videoRef} src={videoSrc} controls />
    </div>
  );
};

export default PlayerComponent;
