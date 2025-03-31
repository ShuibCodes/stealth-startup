import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPopup = ({ onClose }) => {
  const videos = [
    {
      title: "JavaScript Basics TTT",
      url: "https://youtu.be/Ell_i-IanCA?si=zF_CULfpQ2KzEsZi",
    },
    {
      title: "JavaScript Basics: Data Types ",
      url: "https://youtu.be/HE3WFVHsZdk?si=xqUofsGPNe4GIG5o",
    },
    

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-blue-500/30 backdrop-blur-sm z-10 flex justify-center items-center ">
      <div className=" bg-white p-10 rounded-2xl flex flex-col gap-3 items-end w-[700px] relative">
        <button
          className="absolute top-3 right-3 bg-[#5FA5F9] hover:bg-[#4a94e8] p-1 rounded-md w-8 h-8 flex items-center justify-center text-white"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        </button>
        <h1 className="w-full text-center text-2xl font-semibold">
          {videos[currentIndex].title}
        </h1>
        <ReactPlayer url={videos[currentIndex].url} controls width="100%" />
        <div className="flex gap-3">
          {currentIndex > 0 && (
            <button
              className="bg-blue-500 px-7 py-1 rounded-md text-white"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
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

export default VideoPopup;
