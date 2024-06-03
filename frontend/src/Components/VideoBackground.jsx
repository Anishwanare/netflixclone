import React from "react";

const VideoBackground = () => {
  return (
    <div className="w-screen h-screen absolute  -z-50">
      <iframe
        src="https://www.youtube.com/embed/IHQQK_Wn5DM?si=04QRkvHr4rg9ihI8&autoplay=1&mute=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-[90%] hover:bg-opacity-80 -z-50"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
