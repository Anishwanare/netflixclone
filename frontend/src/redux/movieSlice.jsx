// movieSlice.js
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlaying: [],
    popularMovie: [],
    topRated: [],
    upComming: [],
    toggle: false,
    trailer: null,
  },
  reducers: {
    getNowPlayingMovie: (state, action) => {
      state.nowPlaying = action.payload.nowPlaying;
    },
    getPopularMovie: (state, action) => {
      state.popularMovie = action.payload.popularMovie;
    },
    getTopRated: (state, action) => {
      state.topRated = action.payload.topRated;
    },
    getUpComming: (state, action) => {
      state.upComming = action.payload.upComming;
    },
    setToggle: (state) => {
      state.toggle = !state.toggle;
      localStorage.setItem("toggle", !state.toggle);
    },
    setTrailer: (state, action) => {
      state.trailer = action.payload.trailer;
    },
  },
});

export const {
  getNowPlayingMovie,
  getPopularMovie,
  getTopRated,
  getUpComming,
  setToggle,
  setTrailer,
} = movieSlice.actions; // Fix export statement
export default movieSlice.reducer;
