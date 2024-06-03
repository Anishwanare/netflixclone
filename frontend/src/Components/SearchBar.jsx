import axios from "axios";
import React, { useState } from "react";
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMoviesDetails } from "../redux/searchSlice";
import Movies from "./Movies";

const SearchBar = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");

  const searchData = useSelector((state) => state.search.searchedMovie);
  const searchValues = useSelector((state) => state.search.movieName);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&include_adult=false&language=en-US&page=1'`,
        options
      );
      const movie = response?.data?.results;
      dispatch(setSearchMoviesDetails({ searchMovie, movie }));
      console.log(response.data.results, "search");
      setSearchMovie("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="absolute top-1/4 left-1/2  transform -translate-x-1/2 w-1/2 flex items-center ">
        <input
          type="text"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
          placeholder="Search for Movies, TV Shows, and more..."
          className="relative w-full py-5 px-10 pl-10 bg-gray-900 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 text-2xl"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="absolute text-white right-0 px-10 text-2xl hover:text-gray-200"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </div>
      <div className="relative top-96">
        <Movies movieData={searchData} title={searchValues} search={true}/>
      </div>
    </div>
  );
};

export default SearchBar;
