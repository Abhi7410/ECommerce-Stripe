import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/users'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const contextValue = {
        user,
        setUser,
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        axios.get(`${baseURL}/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }).then((response) => {
            console.log(response.data)
            setUser(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);

