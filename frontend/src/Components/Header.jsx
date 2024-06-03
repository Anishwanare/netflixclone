import React, { useEffect, useState } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import {
  getNowPlayingMovie,
  getPopularMovie,
  getTopRated,
  getUpComming,
  setToggle,
  setTrailer,
} from "../redux/movieSlice";

const Header = () => {
  const token = useSelector((state) => state.app.token);
  const user = useSelector((state) => state.app.userName);
  const toggle = useSelector((state) => state.movie.toggle);

  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigateTo("/browser");
    }
  }, [token, navigateTo]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      dispatch(logout({}));
      dispatch(setToggle());
      dispatch(getNowPlayingMovie({ nowPlaying: [] }));
      dispatch(getPopularMovie({ popularMovie: [] }));
      dispatch(getTopRated({ topRated: [] }));
      dispatch(getUpComming({ upComming: [] }));
      dispatch(setTrailer({ trailer: null }));
      dispatch(setSearchMoviesDetails({ searchMovie: null, movie: null }));
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  return (
    <div className="bg-black flex w-full items-center justify-between px-10 py-4 absolute z-50 top-0">
      <Link to={token ? "/browser" : "/"}>
        <img src="/netflxlogo.png" className="w-32" alt="NETFLIX LOGO" />
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {token && (
            <InsertEmoticonIcon style={{ fontSize: "2rem", color: "white" }} />
          )}
          <h1 className="text-2xl text-white">{user}</h1>
        </div>

        {token && (
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg text-white rounded-md cursor-pointer"
            onClick={handleLogout}
          >
            {loading ? "Loading..." : "Logout"}
          </button>
        )}

        {token && (
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg text-white rounded-md cursor-pointer"
            onClick={toggleHandler}
          >
            {toggle ? "Home" : "Search"}
          </button>
        )}
        {!token && (
          <button
            type="button"
            className="bg-white px-6 py-3 text-lg text-black font-semibold rounded-md cursor-pointer"
          >
            {"English"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
