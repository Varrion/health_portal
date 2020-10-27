import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BuyDrug, DeleteDrug, GetDrugDetails} from "../../services/DrugService";
import Card from "react-bootstrap/Card";
import DefaultDrug from "../../assets/defaultDrug.jpg";
import {Button, Form} from "react-bootstrap";
import AddUpdateDrug from "./AddUpdateDrug";
import {useHistory} from "react-router-dom";
import {GetCompanyByOwner, UpdateCompanyDrugs} from "../../services/CompanyService";
import StripeCheckout from 'react-stripe-checkout';
import {StripePublicKey} from "../../services/UserService";
import Col from "react-bootstrap/Col";
import {useToasts} from "react-toast-notifications";

function DrugDetails(props) {
    const {addToast} = useToasts();
    const {drugId} = useParams();
    const history = useHistory();
    const [drug, setDrug] = useState(null);
    const [isDrugInYourCompany, setIsDrugInYourCompany] = useState(false);
    const [buyingQuantity, setBuyingQuantity] = useState(1);
    const [itemBought, setItemBought] = useState(false);
    const [showEditDrugModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setItemBought(false);
        setBuyingQuantity(1);
        GetDrugDetails(drugId)
            .then(res => {
                setDrug(res.data);
                if (props.profile) {
                    GetCompanyByOwner(props.profile.username)
                        .then(result => {
                            const company = res.data.companies.find(company => company.id === result.data.id);
                            if (company) {
                                setIsDrugInYourCompany(true);
                            }
                        })
                }
            })
    }, [props.profile, showEditDrugModal, itemBought, drugId])

    const handleDelete = () => {
        DeleteDrug(drug.id)
            .then(() => history.push("/"))
    }

    const handleUpdateCompanyDrugs = () => {
        UpdateCompanyDrugs(props.profile.username, drug.id)
            .then(() => setIsDrugInYourCompany(true));
    }

    const onToken = token => {
        const chargeRequest = {
            stripeToken: token.id,
            stripeEmail: props.profile.email,
            drugId: drug.id,
            amount: drug.price * 100,
            quantity: buyingQuantity
        };

        if (buyingQuantity <= drug.quantity) {
            BuyDrug(chargeRequest)
                .then(res => {
                    console.log(res);
                    addToast(`successfully bought ${drug.name}`, {appearance: "success"});
                    setItemBought(true);
                })
                .catch(err => {
                    addToast(`${err.response.data.error} - ${err.response.status}`, {appearance: "error"})
                })
        }
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
                    <Card.Text>{drug.quantity > 0 ? <>Medicine
                        available: {drug.quantity} </> : "Out of stock"}</Card.Text>
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
                    {props.profile && props.profile.hasCreatedCompany && !isDrugInYourCompany &&
                    <div className={"text-center"}>
                        <Button variant={"outline-info"} onClick={handleUpdateCompanyDrugs}>
                            <i className="fas fa-plus-circle"/> Add to your collection
                        </Button>
                    </div>}
                    {props.profile && !props.profile.isCompanyOwner &&
                    <div className={"text-center"}>
                        {drug.quantity > 0 ?
                            <Form.Row>
                                <Col className={"text-right"}>
                                    <StripeCheckout
                                        className={"mb-3"}
                                        amount={buyingQuantity * drug.price * 100}
                                        email={props.profile.email}
                                        description={`Your cost for buying ${drug.name} is ${drug.price * buyingQuantity} EUR`}
                                        name={props.profile.firstName}
                                        currency="EUR"
                                        label={"Buy Now"}
                                        stripeKey={StripePublicKey}
                                        token={onToken}
                                    />
                                </Col>
                                <Col className={"text-left"}>
                                    <input style={{width: "15%", marginTop: "2px"}} value={buyingQuantity}
                                           type={"number"}
                                           min={1} max={drug.quantity}
                                           onChange={event => setBuyingQuantity(+event.target.value)}/>
                                </Col>
                            </Form.Row>
                            : <p>
                                This medicine is out of stock
                            </p>}
                    </div>}
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