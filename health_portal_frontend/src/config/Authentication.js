import React, {createContext, useState, useEffect} from 'react';

export const authContext = createContext({});

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    const setAuthData = (data) => {
        setAuth(data);
    };

    useEffect(() => {
        setAuth(JSON.parse(sessionStorage.getItem('userToken')));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('userToken', auth ? JSON.stringify(auth) : null);
    }, [auth]);

    return (
        <authContext.Provider value={{auth, setAuthData}}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;