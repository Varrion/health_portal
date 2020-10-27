import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Dropzone from "react-dropzone";
import Button from "react-bootstrap/Button";
import React, {useContext, useState} from "react";
import {BasicAuthToken, EditUser} from "../../services/UserService";
import {authContext} from "../../config/Authentication";

function UpdateUserModal(props) {
    const {setAuthData} = useContext(authContext);
    const [user, setUser] = useState({
        username: props.profile.username ?? "",
        password: props.profile.password ?? "",
        email: props.profile.email ?? "",
        firstName: props.profile.firstName ?? "",
        lastName: props.profile.lastName ?? "",
        isCompanyOwner: props.profile.isCompanyOwner ?? false
    });
    const [userPhoto, setUserPhoto] = useState(props.profile.picture ?? null);

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("userDto", new Blob([JSON.stringify({...user})], {
            type: "application/json"
        }));
        formData.append("userPicture", userPhoto);

        EditUser(props.profile.username, formData)
            .then(res => {
                setAuthData(BasicAuthToken(res.data.username, res.data.password));
                window.location.reload()
            })
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Profile
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
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
                                <div className={"text-center"} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        userPhoto ?
                                            <img
                                                className={"image-fit"}
                                                src={typeof userPhoto === "string" ? "data:image/jpeg;base64," + userPhoto : URL.createObjectURL(userPhoto)}
                                                width={"100%"} height={250} alt={"user"}/> :
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                    }
                                </div>
                            </section>
                        )}
                    </Dropzone>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant={"secondary"}>Close</Button>
                    <Button variant={"primary"} type={"submit"}>Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateUserModal;