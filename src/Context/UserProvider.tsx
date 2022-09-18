import React, { createContext } from 'react';
import { useState } from "react";
import { ActivityIndicator } from 'react-native';
import { persistUserData, removeUserPersistedData } from './Helpers';


type Props = {
    //   url: string;
    //   maxResultsPerPage: number;
    children: JSX.Element;
};

const initialUser = null

const UserContext = createContext("defaultValue");


export function UserProvider({ children }: Props) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(initialUser)


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