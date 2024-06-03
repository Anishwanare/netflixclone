import React, { useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigateTo = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/login`, {
                email, password
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            })
            console.log(response.data);
            if (response.data.token) {
                toast.success(response.data?.message)
                setEmail("")
                setPassword("")
                dispatch(login({ token: response.data.token, userName: response.data.user.name }))
                navigateTo("/browser")
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />
            <div className="relative flex flex-col justify-center items-center h-screen">
                <img
                    src="/banner.jpg"
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    alt="Banner"
                />
                <div className="absolute top-0 w-full h-full bg-black opacity-70 -z-10"></div>
                <div className="relative z-10 w-full max-w-2xl  bg-black bg-opacity-50 rounded-md mt-20 mx-4 p-20">
                    <h2 className="text-6xl font-bold text-white mb-6 py-10">Sign In</h2>
                    <form className="flex flex-col space-y-4 gap-10" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">

                            <label htmlFor="email" className='text-white text-2xl '>Email:</label>
                            <input
                                type="email"
                                placeholder="Email or phone number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" w-full p-7 rounded bg-black bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:border-white text-4xl"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">

                            <label htmlFor="password" className='text-white text-2xl'>Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=" w-full p-7 rounded bg-black bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:border-white text-4xl"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-3 rounded mt-4 hover:bg-red-700 transition text-3xl"

                        >

                            {loading ? "Loading..." : "Sign In"}
                        </button>
                    </form>
                    <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                        <a href="#" className="hover:underline">Need help?</a>
                    </div>
                    <div className="text-gray-500 mt-8 text-3xl">
                        <span>New to Netflix? </span>
                        <Link to="/register" className="text-white hover:underline">Sign up now.</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
