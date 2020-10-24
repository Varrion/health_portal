import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DeleteDrug, GetDrugDetails} from "../../services/DrugService";
import Card from "react-bootstrap/Card";
import DefaultDrug from "../../assets/defaultDrug.jpg";
import {Button} from "react-bootstrap";
import AddUpdateDrug from "./AddUpdateDrug";
import {useHistory} from "react-router-dom";

function DrugDetails(props) {
    const {drugId} = useParams();
    const history = useHistory();
    const [drug, setDrug] = useState(null);
    const [showEditDrugModal, setShowEditModal] = useState(false);

    useEffect(() => {
        GetDrugDetails(drugId)
            .then(res => {
                setDrug(res.data);
            })
    }, [showEditDrugModal])

    const handleDelete = () => {
        DeleteDrug(drug.id)
            .then(() => history.push("/"))
    }

    return (
        <>
            {drug &&
            <Card>
                <Card.Body>
                    <Card.Title><h2>{drug.name}</h2></Card.Title>
                    <Card.Subtitle className="mt-2 text-muted font-italic">-- {drug.category?.name}</Card.Subtitle>
                    <Card.Text className={"mt-4"}> {drug.description} </Card.Text>
                    <Card.Text
                        className={"mt-4"}> Valid
                        from {drug.validFrom.split("T")[0]} to {drug.validTo.split("T")[0]} </Card.Text>
                    <hr width={"50%"}/>
                    <Card.Text>Cures: <span className={"font-weight-bolder font-italic"}>{drug.cures}</span></Card.Text>
                    <Card.Text>Price: {drug.price} <i className="fas fa-euro-sign"/></Card.Text>
                    <Card.Text>Items available: {drug.quantity}</Card.Text>
                    <div className={"text-center"}>
                        {props.profile && props.profile.isCompanyOwner &&
                        <>
                            <Button onClick={() => setShowEditModal(true)} className={"mr-4"}
                                    variant={"outline-warning"}>
                                <i className="fas fa-edit"/> Edit
                            </Button>
                            <Button variant={"outline-danger"} onClick={handleDelete}>
                                <i className="fas fa-trash-alt"/> Delete
                            </Button>
                        </>}
                    </div>
                </Card.Body>
                {showEditDrugModal &&
                <AddUpdateDrug drug={drug} show={showEditDrugModal} onHide={() => setShowEditModal(false)}/>}
                <Card.Img variant="top"
                          className={"image-fit image-bottom-rounded"}
                          height={"350px"}
                          src={drug.picture ? "data:image/jpeg;base64," + drug.picture : DefaultDrug}/>
            </Card>
            }
        </>
    )
}

export default DrugDetails;