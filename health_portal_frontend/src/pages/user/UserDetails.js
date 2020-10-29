import React, {useContext, useEffect, useState} from "react";
import {DeleteUser, GetUserDetails} from "../../services/UserService";
import {useHistory, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import UnknownPicture from "../../assets/2243483191f43583fce49e99e642f5b1.png";
import Badge from "react-bootstrap/Badge";
import {Button} from "react-bootstrap";
import UpdateUserModal from "./UpdateUserModal";
import {authContext} from "../../config/Authentication";

function UserDetails(props) {
    const {username} = useParams();
    const history = useHistory();
    const {setAuthData} = useContext(authContext);
    const [user, setUser] = useState(null);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);

    useEffect(() => {
        GetUserDetails(username)
            .then(res => {
                setUser(res.data);
            })
    }, [showUpdateProfile])

    const handleDelete = () => {
        DeleteUser(user.username)
            .then(() => {
                history.push("/");
                setAuthData(null);
                window.location.reload();
            })
    }

    return (
        <>
            {user && <Card>
                <Card.Body className={"row"}>
                    <div className={"col-md-9"}>
                        <Card.Title className={"text-center"}><h2>User Profile </h2></Card.Title>
                        <h4> {user.firstName} {user.lastName} </h4>
                        <Card.Subtitle className={"mt-2 text-muted font-italic"}>
                            as {user.username}
                        </Card.Subtitle>
                        <hr width={"40%"}/>
                        <Card.Text>
                            <i className="fas fa-at"/> {user.email}
                        </Card.Text>
                        {user.isCompanyOwner
                            ? <Badge pill variant="success">
                                <i className="fas fa-user-nurse"/> Company Owner
                            </Badge>
                            : <Badge pill variant="info">
                                <i className="fas fa-user"/> Participant
                            </Badge>}

                        {props.profile && user.username === props.profile.username &&
                        <div className={"text-center mt-3"}>
                            <Button onClick={() => setShowUpdateProfile(true)} className={"mr-4"}
                                    variant={"outline-warning"}>
                                <i className="fas fa-edit"/> Edit
                            </Button>
                            <Button variant={"outline-danger"} onClick={handleDelete}>
                                <i className="fas fa-trash-alt"/> Delete
                            </Button>
                        </div>}
                    </div>
                    <div className={"col-md-3"}>
                        <Card.Img className={"rounded-content"}
                                  src={user.picture ? "data:image/jpeg;base64," + user.picture : UnknownPicture}/>
                    </div>
                    {showUpdateProfile &&
                    <UpdateUserModal profile={user} show={showUpdateProfile}
                                     onHide={() => setShowUpdateProfile(false)}/>}
                </Card.Body>
            </Card>}
        </>
    )
}

export default UserDetails;