import React, { useRef, useState } from "react";
import PlayerComponent from "./playerComponent";
import Sidedraw from "../components/sidedraw";

const MainPlayer = () => {
  const promotions = [
    {
      timestamp: 10,
      title: "Promotion 1",
      description: "Promo Description 1",
      video: "file.mp4",
    },
    {
      timestamp: 100,
      title: "Promotion 2",
      description: "Promo Description 2",
      video: "file.mp4",
    },
    {
      timestamp: 140,
      title: "Promotion 3",
      description: "Promo Description 3",
      video: "file.mp4",
    },
  ];
  const videoRef = useRef(null);
  const [showPromotion, setShowPromotion] = useState(undefined);
  const [lastShownTime, setLastShownTime] = useState(0);
  const handleVideoUpdate = (videoRef) => {
    const { currentTime, duration, paused, muted, volume } = videoRef;
    console.log(currentTime, duration, paused, muted, volume);
    const promotion = promotions.find((ts) => {
      return ts.timestamp === Math.trunc(currentTime);
    });
    if (promotion && lastShownTime !== Math.trunc(currentTime)) {
      videoRef.pause();
      setShowPromotion(promotion);
      setLastShownTime(Math.trunc(currentTime));
    }
  };
  const playVideo = () => {
    setShowPromotion(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  return (
    <>
      <div className="content-wrapper">
        <div className="container-fluid" id="homePageHeader">
          <h1>Thaya Thaya Song Video</h1>
          <h3>A R Rahman | Shah Rukh Khan | Manirathanam</h3>
          <PlayerComponent
            videoSrc="sample.mp4"
            videoRef={videoRef}
            onVideoUpdate={handleVideoUpdate}
          />
        </div>

        {showPromotion && (
          <Sidedraw
            size="small"
            title={showPromotion.title}
            setOverlay={playVideo}
            contentComponent={
              <div className="wd-100 mt-two-s mr-one-s ml-one-s">
                <h1>{showPromotion.title}</h1>
                <h3>{showPromotion.description}</h3>
                <PlayerComponent
                  videoSrc={showPromotion.video}
                  onVideoUpdate={() => {}}
                />
              </div>
            }
          />
        )}
      </div>
    </>
  );
};

export default MainPlayer;
