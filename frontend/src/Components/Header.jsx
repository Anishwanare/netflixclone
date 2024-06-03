import React, { useEffect, useState } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const Header = () => {
  const token = useSelector((state) => state.app.token);
  const user = useSelector((state) => state.app.userName);

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
      dispatch(logout());
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex w-full items-center justify-around px-10 pb-4 absolute z-50 top-0 bg-gradient-to-b to-black">
      <Link to="/">
        <img src="/netflxlogo.png" className="w-72" alt="NETFLIX LOGO" />
      </Link>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <InsertEmoticonIcon style={{ fontSize: "2rem" }} />
          <h1 className="text-4xl">{user}</h1>
        </div>
        <div className="flex gap-10">
          {token ? (
            <>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-900 px-6 py-3 text-3xl text-white rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                {loading ? "Loading..." : "Logout"}
              </button>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-900 px-6 py-3 text-3xl text-white rounded-md cursor-pointer"
              >
                Search Movies
              </button>
            </>
          ) : (
            <button
              type="button"
              className="bg-white hover:bg-gray-200 px-6 py-3 text-3xl text-black rounded-md cursor-pointer"
            >
              {loading ? "Loading..." : "English"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
