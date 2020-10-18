import React from 'react';
import './App.css';
import Switch from "react-bootstrap/Switch";
import Route from "react-router-dom";
import Redirect from "react-router-dom";
import Login from "./pages/user/Register";
import Register from "./pages/user/Register";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path={"/register"}>
                    <Register/>
                </Route>
                <Route path="*">
                    <Redirect to={"/"}/>
                    <Dashboard/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
