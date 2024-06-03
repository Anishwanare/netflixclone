import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieName: null,
    searchedMovie: null,
  },

  reducers: {
    setSearchMoviesDetails: (state, action) => {
      const { searchMovie, movie } = action.payload;
      state.movieName = searchMovie;
      state.searchedMovie = movie;
    },
  },
});

export const { setSearchMoviesDetails } = searchSlice.actions;
export default searchSlice.reducer;
