import Navbar from "react-bootstrap/Navbar";
import React, {useContext, useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {GetAllCompanies} from "../services/CompanyService";
import {Link} from "react-router-dom";
import {authContext} from "../config/Authentication";
import {useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button";
import renderTooltip from "./ToolTip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Header(props) {
    const {setAuthData} = useContext(authContext)
    const history = useHistory("/")
    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        GetAllCompanies()
            .then(res => {
                setCompanies(res.data)
            })
    }, [])

    const logoutUser = () => {
        setAuthData(null);
        history.push('/');
        window.location.reload();
    }

    return (
        <Navbar className={"customHeader"} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link className={"navbar-brand"} to={"/"}>Health Portal</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Companies" id="collasible-nav-dropdown">
                        {companies && companies.length > 0 && companies.map(company =>
                            <Link className={"dropdown-item"} to={`/company/${company.id}`}>{company.name}</Link>
                        )}
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        {props.loggedUser && props.loggedUser.isCompanyOwner && <>
                            <NavDropdown.Divider/>
                            <Link className={"dropdown-item"} to={"/category/add"}>Add category</Link>
                        </>}
                    </NavDropdown>
                </Nav>
                <Nav>
                    {!props.loggedUser
                        ? <>
                            <Link className={"nav-link"} to={"/login"}>Login</Link>
                            <Link className={"nav-link"} to={"/register"}>Register</Link>
                        </>
                        : <>
                            <Link className={"nav-link"}
                                  to={`/user/${props.loggedUser.username}`}>
                                <i className="fas fa-user-circle"/>
                                <span> {props.loggedUser.firstName}</span>
                            </Link>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{show: 250, hide: 400}}
                                overlay={renderTooltip("logout")}
                            >
                                <Button variant={"link"} onClick={logoutUser} className={"nav-link"}>
                                    <i className="fas fa-sign-out-alt"/></Button>
                            </OverlayTrigger>
                        </>}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;