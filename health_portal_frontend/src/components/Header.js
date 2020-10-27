import Navbar from "react-bootstrap/Navbar";
import React, {useContext, useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {GetAllCompanies, GetCompanyByOwner} from "../services/CompanyService";
import {Link, useHistory} from "react-router-dom";
import {authContext} from "../config/Authentication";
import Button from "react-bootstrap/Button";
import renderTooltip from "./ToolTip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Header(props) {
    const {setAuthData} = useContext(authContext)
    const history = useHistory("/");
    const [myCompany, setMyCompany] = useState(null);
    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        if (props.profile && props.profile.isCompanyOwner) {
            GetCompanyByOwner(props.profile.username)
                .then(res => {
                    setMyCompany(res.data);
                })
        }
        GetAllCompanies()
            .then(res => {
                setCompanies(res.data)
            })
    }, [props.profile])

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
                            <Link key={company.id} className={"dropdown-item"}
                                  to={`/company/${company.id}`}>{company.name}</Link>
                        )}
                        {props.profile && props.profile.isCompanyOwner && <>
                            <NavDropdown.Divider/>
                            {myCompany
                                ? <Link className={"dropdown-item"} to={`/company/${myCompany.id}`}>Your company</Link>
                                : <Link className={"dropdown-item"} to={"/company/admin"}>Add company</Link>
                            }
                        </>}
                    </NavDropdown>
                </Nav>
                <Nav>
                    {!props.profile
                        ? <>
                            <Link className={"nav-link"} to={"/login"}>Sign In</Link>
                            <Link className={"nav-link"} to={"/register"}>Sign Up</Link>
                        </>
                        : <>
                            <Link className={"nav-link"}
                                  to={`/user/${props.profile.username}`}>
                                <i className="fas fa-user-circle"/>
                                <span> {props.profile.firstName}</span>
                            </Link>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{show: 250, hide: 400}}
                                overlay={renderTooltip("Sign Out")}
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