import React, {createContext, useState, useEffect} from 'react';

export const authContext = createContext({});

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    const setAuthData = (data) => {
        setAuth({...auth, data: data});
    };

    useEffect(() => {
        setAuth(JSON.parse(sessionStorage.getItem('userToken')));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('credentials', JSON.stringify(auth.data));
    }, [auth]);

    return (
        <authContext.Provider value={{auth, setAuthData}}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;