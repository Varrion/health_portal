import React, {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Card from "react-bootstrap/Card";
import {BasicAuthToken, LoginUser} from "../../services/UserService";
import {authContext} from "../../config/Authentication";
import {useHistory} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

function SignIn(props) {
    const {addToast} = useToasts();
    const {setAuthData} = useContext(authContext);
    const history = useHistory();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        LoginUser(user)
            .then(res => {
                setAuthData(BasicAuthToken(res.data.username, res.data.password));
                history.push(`/user/${res.data.username}`);
                window.location.reload();
            })
            .catch(err => {
                addToast("Invalid credentials", {appearance: "error"})
            })
    };

    return (
        <Card>
            <Card.Body className={"flex-column-center"}>
                <h1 className={"mb-5 text-center"}>Sign In</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <i className="fas fa-user"/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control placeholder="Enter your username here..."
                                          value={user.username} onChange={handleChange("username")}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control value={user.password} onChange={handleChange("password")} type="password"
                                          placeholder="Enter your password here..."/>
                        </InputGroup>
                    </Form.Group>

                    <div className={"text-center"}>
                        <Button variant={"outline-primary"} type="submit" className={"mb-3"}>
                            Sign in
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default SignIn;