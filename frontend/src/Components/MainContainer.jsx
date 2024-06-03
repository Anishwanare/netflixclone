import React, { useEffect, useState } from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import Header from "./Header";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movie = useSelector((state) => state.movie?.nowPlaying);
  const [movieIndex, setMovieindex] = useState(0);
    // console.log("main container",movie);

  useEffect(() => {
    const interval = setInterval(() => {
      setMovieindex(movieIndex < 19 ? movieIndex + 1 : 0);
    }, 1 * 60 * 1000);
    return ()=>{
        clearTimeout(interval);
    }
  },[]);

  if (!movie || movie.length <= 1 || !movie[movieIndex]) {
    return <div>Loading...</div>;
  }

  const { original_title, overview,id } = movie[movieIndex];
  return (
    <div>
      <div className="">
        <VideoBackground movieId={id} />
        <VideoTitle title={original_title} desc={overview} />
      </div>
    </div>
  );
};

export default MainContainer;
