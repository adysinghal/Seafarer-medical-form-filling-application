import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router';

export default function PrivateRoute({children}) {
    const {currentUser} = useAuth();
    
    if(!currentUser){
        return <Navigate to="/login" />
    }

    return children;
}
