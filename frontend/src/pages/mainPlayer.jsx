import React, { useState } from 'react';
import PlayerComponent from './playerComponent';
import Sidedraw from "../../components/sidedraw";

const MainPlayer = () => {
    const promotions = [
        { timestamp: 9, title: 'Promotion 1', description: "Promo Description 1", video: "file.mp4" },
        { timestamp: 140, title: 'Promotion 2', description: "Promo Description 2", video: "file.mp4" },
        { timestamp: 100, title: 'Promotion 3', description: "Promo Description 3", video: "file.mp4" }
    ];
    const [showPromotion, setShowPromotion] = useState(undefined);
    const [lastShownTime, setLastShownTime] = useState(0);
    const handleTimeUpdate = (currentTime) => {
        const promotion = promotions.find((ts) => {
            return ts.timestamp === Math.trunc(currentTime);
        });
        if(promotion && lastShownTime !== Math.trunc(currentTime)){
            setShowPromotion(promotion);
            setLastShownTime(Math.trunc(currentTime));
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
                    onTimeUpdate={handleTimeUpdate}
                    showPromotion={showPromotion}
                />
            </div>

        {showPromotion && 
            <Sidedraw
            size="small"
            title={showPromotion.title}
            setOverlay={setShowPromotion}
            contentComponent={
              <div className="wd-100 mt-two-s mr-one-s ml-one-s">
                <h1>{showPromotion.title}</h1>
                <h3>{showPromotion.description}</h3>
                <PlayerComponent
                    videoSrc={showPromotion.video}
                    onTimeUpdate={handleTimeUpdate}
                    showPromotion={showPromotion}
                />
              </div>
            }
          />
        }
        </div>
    </>
    );
};

export default MainPlayer;

