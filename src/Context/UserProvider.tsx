import React, { createContext } from 'react';
import { useState } from "react";
import { ActivityIndicator } from 'react-native';
import { persistUserData, removeUserPersistedData } from './Helpers';


type Props = {
    children: JSX.Element
};

const initialState = {
    user: null,
    login: {},
    logout: {},

}

const UserContext = createContext(initialState);


export const UserProvider: React.FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    console.log('UserContext', UserContext);

    const login = (userCredentials) => {
        persistUserData(userCredentials)
        setUser(userCredentials);
    }

    const logout = () => {
        removeUserPersistedData()
        setUser(null);
    }

    if (loading) return <ActivityIndicator size={"large"} />

    const data = { user, login, logout, setLoading }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext