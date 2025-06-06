import React, { useContext } from 'react';
import { AuthContext } from '../Components/Providers/AuthProviders';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <span className="loading loading-dots loading-lg "></span>
    }

    if (user) {
        return children
    }

    return (
        <Navigate to='/signin'></Navigate>
    );
};

export default PrivateRoute;