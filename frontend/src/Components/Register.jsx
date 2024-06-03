import React, { useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigateTo = useNavigate()

    const handleRegister = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/register`, {
                email, password, name
            }, {
                withCredentials: true,
                headers: {
                    "content-type": "application/json"
                }
            })
            console.log(response.data);
            if (response.data.token) {
                toast.success(response.data?.message)
                setEmail("")
                setPassword("")
                setName("")
                navigateTo("/")
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
                <div className="relative z-10 w-full max-w-2xl bg-black bg-opacity-50 rounded-md mt-20 mx-4 p-20">
                    <h2 className="text-6xl font-bold text-white mb-6 py-10">Sign Up</h2>
                    <form className="flex flex-col space-y-4 gap-10" onSubmit={handleRegister}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullname" className="text-white text-2xl">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Full Name"
                                className="w-full p-7 rounded bg-black bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:border-white text-4xl"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-white text-2xl">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="w-full p-7 rounded bg-black bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:border-white text-4xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-white text-2xl">Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="w-full p-7 rounded bg-black bg-opacity-50 text-white border border-gray-700 focus:outline-none focus:border-white text-4xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-3 rounded mt-4 hover:bg-red-700 transition text-3xl"
                        >
                            {loading ? "Loading.....":"Sign Up"}
                        </button>
                    </form>
                    <div className="text-gray-500 mt-8 text-3xl">
                        <span>Already have an account? </span>
                        <Link to="/" className="text-white hover:underline">Sign in now.</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
