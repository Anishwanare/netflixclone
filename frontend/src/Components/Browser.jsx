// Browser.js
import React, { useEffect } from "react";
import Header from "./Header";
import Movies from "./Movies";
import MainContainer from "./MainContainer";
import axios from "axios";
import {
  now_Playing,
  Popular,
  options,
  top_Rated,
  upComming,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getNowPlayingMovie,
  getPopularMovie,
  getTopRated,
  getUpComming,
} from "../redux/movieSlice";
import { useNavigate } from "react-router-dom";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import useFetchPopularMovies from "./hooks/useFetchPopularMovies";
import SearchBar from "./SearchBar";

const Browser = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const nowPlayingData = useSelector((state) => state.movie.nowPlaying); // Access state property directly
  const popularData = useSelector((state) => state.movie.popularMovie);
  const topRatedData = useSelector((state) => state.movie.topRated);
  const upcomingData = useSelector((state) => state.movie.upComming); // Fix variable name
  //
  const token = useSelector((state) => state.app.token);
  const toggle = useSelector((state) => state.movie.toggle);

  useEffect(() => {
    if (!token) {
      navigateTo("/");
      return;
    }
  }, [token]);

  //custom Hooles
  useNowPlayingMovies();
  useFetchPopularMovies();

  // i can also create custom hook for this but for understanding i dont make
  useEffect(() => {
    const fetchTopRated = async () => {
      // Fix function name
      try {
        const response = await axios.get(top_Rated, options);
        // console.log(response.data.results);
        dispatch(getTopRated({ topRated: response.data.results }));
      } catch (error) {
        console.error("Error fetching top rated movies:", error); //
      }
    };
    fetchTopRated(); // Fix function call
  }, []);

  useEffect(() => {
    const fetchUpcoming = async () => {
      // Fix function name
      try {
        const response = await axios.get(upComming, options);
        // console.log(response.data.results);
        dispatch(getUpComming({ upComming: response.data.results }));
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    fetchUpcoming(); // Fix function call
  }, []);

  return (
    <>
      <Header />
      <div className="">
        {toggle ? (
          <SearchBar />
        ) : (
          <>
            <MainContainer />
            <div className="flex  flex-col gap-10 overflow-hidden">
              <Movies movieData={nowPlayingData} title={"Now Playing"} />
              <Movies movieData={popularData} title={"Popular Movies"} />
              <Movies movieData={topRatedData} title={"Top Rated"} />
              <Movies movieData={upcomingData} title={"Upcoming"} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Browser;
