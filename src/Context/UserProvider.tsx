import React, { createContext } from 'react';
import { useState } from "react";
import { persistUserData, removeUserPersistedData } from './Helpers';


type Props = {
    //   url: string;
    //   maxResultsPerPage: number;
    children: JSX.Element;
};

const initialUser = null

const UserContext = createContext("defaultValue");


export function UserProvider({ children }: Props) {
    const [user, setUser] = useState(initialUser)


    const login = (userCredentials) => {
        persistUserData(userCredentials)
        setUser(userCredentials);
    }

    const logout = () => {
        removeUserPersistedData()
        setUser(null);
    }

    const data = { user, login, logout }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext