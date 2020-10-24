import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CompanyDetails from "./pages/company/CompanyDetails";
import Header from "./components/Header";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import AddUpdateCategory from "./pages/category/AddUpdateCategory";
import {GetUserDetails} from "./services/UserService";
import {authContext} from "./config/Authentication";
import PrivateRoute from "./config/PrivateRoute";
import CategoryDetails from "./pages/category/CategoryDetails";
import UserDetails from "./pages/user/UserDetails";
import AddUpdateCompany from "./pages/company/AddUpdateCompany";
import DrugDetails from "./pages/drug/DrugDetails";

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
                    setUser(res.data);
                })
        }
    }, [auth])

    return (
        <Router>
            <Header loggedUser={user}/>
            <div className="container mt-4 mb-4 App">
                <Switch>
                    <Route path={"/login"}>
                        {!user ? <SignIn/> : <Redirect to={"/"}/>}
                    </Route>
                    <Route path={"/register"}>
                        {!user ? <SignUp/> : <Redirect to={"/"}/>}
                    </Route>
                    <PrivateRoute exact path={"/company/add"} component={AddUpdateCompany}/>
                    <Route exact path={"/company/:companyId"}>
                        <CompanyDetails/>
                    </Route>
                    <Route exact path={"/drug/:drugId"}>
                        <DrugDetails profile={user}/>
                    </Route>
                    <PrivateRoute exact path={"/category/add"} component={AddUpdateCategory}/>
                    <Route exact path={"/category/:categoryId"}>
                        <CategoryDetails profile={user}/>
                    </Route>
                    <PrivateRoute exact path={"/category/:categoryId/edit"} component={AddUpdateCategory}/>
                    <Route exact path={"/user/:username"}>
                        <UserDetails/>
                    </Route>
                    <Route path="*">
                        <Redirect to={"/"}/>
                        <Dashboard profile={user}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
