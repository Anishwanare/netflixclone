import axios from "axios";
import { options } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTrailer } from "../../redux/movieSlice";

const useMovieById = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        console.log(response.data.results);
        // Filter and store the trailer in Redux
        const trailer = response.data.results.find(
          (item) => item.type === "Trailer"
        );
        if (trailer) {
          dispatch(setTrailer({ trailer: trailer }));
        } else if (response.data.results.length > 0) {
          dispatch(setTrailer({ trailer: response.data.results[0] }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovieById();
  }, [movieId, dispatch]);
};

export default useMovieById;
