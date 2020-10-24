import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authContext} from "./Authentication";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {auth} = useContext(authContext);

    return (
        <Route
            {...rest}
            render={routeProps => {
                return auth ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: {from: routeProps.location}
                    }}/>
                );
            }}
        />
    );
};

export default PrivateRoute;