import React from "react";
import useMovieById from "./hooks/useMovieById";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  useMovieById(movieId);
//   console.log();
const trailer = useSelector((state)=>state.movie.trailer)

 if (!trailer) {
   return <div>Loading video...</div>;
 }

  return (
    <div className="w-[100%] h-screen   -z-50">
      <iframe
        width="560"
        height="315 "
        src={`https://www.youtube.com/embed/${trailer.key}?si=iUY3t3Fl5r0iZm9a&autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-[100%] hover:bg-opacity-80 -z-50"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
