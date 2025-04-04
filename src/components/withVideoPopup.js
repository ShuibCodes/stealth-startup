import React, { useState, useEffect } from "react";
import VideoPopupTTT from "./VideoPopupTTT";

// This is a higher-order component that adds video popup functionality
const withVideoPopup = (WrappedComponent) => {
  return function WithVideoPopup(props) {
    const { currentStepIndex, gameType, ...otherProps } = props;
    const [showVideoPopup, setShowVideoPopup] = useState(true);
    
    // When the step index changes back to 0, we should show the video
    useEffect(() => {
      if (currentStepIndex === 0) {
        setShowVideoPopup(true);
      }
    }, [currentStepIndex]);

    // If we're on step 0 and should show the video, render both the video and the component
    return (
      <div className="modal-container">
        {currentStepIndex === 0 && showVideoPopup && (
          <VideoPopupTTT 
            onClose={() => setShowVideoPopup(false)}
            gameType={gameType}
          />
        )}
        <WrappedComponent 
          currentStepIndex={currentStepIndex}
          gameType={gameType}
          {...otherProps} 
        />
      </div>
    );
  };
};

export default withVideoPopup; 