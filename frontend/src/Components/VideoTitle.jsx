import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const VideoTitle = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-start px-20 justify-center text-center text-white z-20">
      <h1 className="text-5xl font-bold mb-4">Anish Wanare</h1>
      <p className="text-2xl mb-20 max-w-6xl text-start">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quas
        provident ad velit perferendis labore esse natus quidem debitis
        explicabo. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Nam, possimus.
      </p>
      <div className="flex gap-5 items-center">
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white font-bold rounded text-lg hover:bg-opacity-75 flex items-center gap-3"
        >
          <PlayCircleOutlineIcon />
          Play
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-700 text-white font-bold rounded text-lg hover:bg-opacity-75"
        >
          Watch More
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
