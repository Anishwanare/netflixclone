import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
    const token  = useSelector((store)=>store.app.token)
    return token ? <Outlet /> : <Navigate to="/" />;
}

export default Private;
