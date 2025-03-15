import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPopup = ({ onClose }) => {
  const videos = [
    {
      title: "video 1",
      url: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
    },
    {
      title: "video 2",
      url: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
    },
    {
      title: "video 3",
      url: "https://www.youtube.com/watch?v=R6MlUcmOul8",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-blue-500/30 backdrop-blur-sm z-10 flex justify-center items-center ">
      <div className=" bg-white p-10 rounded-2xl flex flex-col gap-3 items-end w-[700px]">
        <h1 className="w-full text-center text-2xl font-semibold">
          {videos[currentIndex].title}
        </h1>
        <ReactPlayer url={videos[currentIndex].url} controls width="100%" />
        <div>
          {currentIndex < videos.length - 1 ? (
            <button
              className="bg-green-500 px-7 py-1 rounded-md text-white"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 px-7 py-1 rounded-md text-white"
              onClick={onClose}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "600px",
    textAlign: "center",
  },
  buttons: {
    marginTop: "10px",
  },
};

export default VideoPopup;
