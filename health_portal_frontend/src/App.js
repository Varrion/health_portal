import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CompanyDetails from "./pages/company/CompanyDetails";
import Header from "./components/Header";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import AddEditCategory from "./pages/category/AddEditCategory";
import {GetUserDetails} from "./services/UserService";
import {authContext} from "./config/Authentication";
import PrivateRoute from "./config/PrivateRoute";

function App() {
    const [user, setUser] = useState(null);

    const {auth} = useContext(authContext);

    const getUsernameFromSession = userToken => {
        let username = userToken.split(" ")[1];
        username = atob(username);
        return username.split(":")[0]
    }

    useEffect(() => {
        if (auth) {
            const username = getUsernameFromSession(auth);
            GetUserDetails(username)
                .then(res => {
                    setUser(res.data)
                })
        }
    }, [auth])

    return (
        <Router>
            <Header loggedUser={user}/>
            <div className="container mt-4 mb-4 App">
                <Switch>
                    <Route path={"/login"}>
                        <SignIn/>
                    </Route>
                    <Route path={"/register"}>
                        <SignUp/>
                    </Route>
                    <Route path={"/company/:companyId"}>
                        <CompanyDetails/>
                    </Route>
                    <PrivateRoute path={"/category/add"}>
                        <AddEditCategory/>
                    </PrivateRoute>
                    <PrivateRoute path={"/category/edit"}>
                        <AddEditCategory/>
                    </PrivateRoute>
                    <Route path="*">
                        <Redirect to={"/"}/>
                        <Dashboard/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
