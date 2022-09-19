import React, { createContext } from 'react';
import { useState } from "react";
import { ActivityIndicator } from 'react-native';
import { persistUserData, removeUserPersistedData } from './Helpers';


type Props = {
    children: JSX.Element
};

export type UserCredentials = { email: string, password: string } | null
export type Login = (userCredentials: UserCredentials) => void | null
interface IState {
    user: UserCredentials | null;
    login: Login
    logout: () => void | null;
}

const initialState: IState = {
    user: null,
    login: () => null,
    logout: () => null,

}

const UserContext = createContext(initialState);


export const UserProvider: React.FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<UserCredentials | null>(null)


    const login = (userCredentials: UserCredentials) => {
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