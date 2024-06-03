import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Browser from './Browser';
import Private from './Private';
import { login } from '../redux/userSlice';
import Movies from './Movies';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const userName = localStorage.getItem('userName');
        if (token && userName) {
            dispatch(login({ token, userName }));
        }
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<Private />}>
                    <Route path='/browser' element={<Browser />} />
                    <Route path='/movies' element={<Movies/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
