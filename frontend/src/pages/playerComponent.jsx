import React, { useRef, useEffect } from 'react';

const PlayerComponent = ({ videoSrc, onTimeUpdate, showPromotion }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const handleTimeUpdate = () => {
            onTimeUpdate(video.currentTime);
        };
        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [onTimeUpdate]);

    useEffect(() => {
        const video = videoRef.current;
        if (showPromotion) {
            video.pause();
        } else {
            video.play();
        }
    }, [showPromotion]);

    return (
        <div>
            <video ref={videoRef} src={videoSrc} controls />
        </div>
    );
};

export default PlayerComponent;
