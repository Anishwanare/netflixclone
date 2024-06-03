import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  getPopularMovie } from "../../redux/movieSlice";
import { Popular, options } from "../../utils/constants";
import axios from "axios";

const useFetchPopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(Popular, options);
        // console.log(response.data.results);
        dispatch(getPopularMovie({ popularMovie: response.data.results }));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    fetchPopularMovies();
  }, [dispatch]); // Don't forget to include dispatch in the dependency array

};

export default useFetchPopularMovies;
