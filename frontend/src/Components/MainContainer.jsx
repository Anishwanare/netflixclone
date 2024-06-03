import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import Header from "./Header";

const MainContainer = () => {
  return (
    <div>
      <div className="">
        <VideoBackground />
        <VideoTitle />
      </div>
    </div>
  );
};

export default MainContainer;
