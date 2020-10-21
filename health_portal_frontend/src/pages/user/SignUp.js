import Form from 'react-bootstrap/Form'
import React, {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {BasicAuthToken, RegisterUser} from "../../services/UserService";
import Dropzone from "react-dropzone";
import {useHistory} from "react-router-dom";
import "./User.css";
import {authContext} from "../../config/Authentication";

function SignUp() {
    const { setAuthData } = useContext(authContext);
    const history = useHistory();
    const initialUser = {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        isCompanyOwner: false
    }

    const [user, setUser] = useState(initialUser);

    const [userPhoto, setUserPhoto] = useState(null);

    const handleChange = name => event => {
        if (name !== "isCompanyOwner") {
            setUser({...user, [name]: event.target.value});
        } else {
            setUser({...user, [name]: event.target.checked});
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("userDto", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));
        formData.append("userPicture", userPhoto);

        RegisterUser(formData)
            .then(r => {
                setAuthData(BasicAuthToken(user.username, user.password));
                sessionStorage.setItem("companyOwner", user.isCompanyOwner);
                history.push(`/user/${r.data.username}`)
            })
            .catch(err => {

            })
    };

    return (
        <Card>
            <Card.Body>
                <h1 className={"mb-5 text-center"}>Sign up</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formUserFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={user.firstName} onChange={handleChange("firstName")}
                                          placeholder="Enter your first name here"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formUserLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={user.lastName} onChange={handleChange("lastName")}
                                          placeholder="Enter your last name here"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formIsSeller">
                        <Form.Check value={user.isCompanyOwner} onChange={handleChange("isCompanyOwner")}
                                    type="switch"
                                    label="Are you a drug manufacturer?"/>
                    </Form.Group>

                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={user.username} onChange={handleChange("username")}
                                      placeholder="Enter your username"/>
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={user.password} onChange={handleChange("password")} type="password"
                                      placeholder="We recommend using strong password for your safety"/>
                    </Form.Group>

                    <Form.Group controlId="formUserEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={user.email} onChange={handleChange("email")} type="email"
                                      placeholder="Enter your email address"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Dropzone onDrop={acceptedFiles => setUserPhoto(acceptedFiles[0])} className={"customDropzone"}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <div>
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default SignUp;