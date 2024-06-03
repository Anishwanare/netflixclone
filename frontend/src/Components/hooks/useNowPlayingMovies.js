import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNowPlayingMovie } from "../../redux/movieSlice";
import { now_Playing, options } from "../../utils/constants";
import axios from "axios";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await axios.get(now_Playing, options);
        // console.log(response.data.results);
        dispatch(getNowPlayingMovie({ nowPlaying: response.data.results }));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    fetchNowPlaying();
  }, [dispatch]); // Don't forget to include dispatch in the dependency array

  // You can return any additional data or functions if needed
};

export default useNowPlayingMovies;
