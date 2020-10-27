import React, {useEffect, useState} from "react";
import {DeleteCompany, GetCompanyDetails} from "../../services/CompanyService";
import {useHistory, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
import DefaultDrug from "../../assets/defaultDrug.jpg";
import {GetAllDrugsByCompany} from "../../services/DrugService";
import DrugCardItem from "../../components/DrugCardItem";

function CompanyDetails(props) {
    const {companyId} = useParams();
    const history = useHistory();
    const [company, setCompany] = useState(null);
    const [companyDrugs, setCompanyDrugs] = useState(null);

    useEffect(() => {
        GetCompanyDetails(companyId)
            .then(res => {
                setCompany(res.data);
                GetAllDrugsByCompany(companyId)
                    .then(result => {
                        setCompanyDrugs(result.data);
                    })
            })
    }, [props.profile, companyId]);

    const handleDelete = () => {
        DeleteCompany(company.id)
            .then(() => {
                history.push("/");
                window.location.reload();
            })
    }

    return (
        <>
            {company && <Card>
                <Card.Img variant="top"
                          className={"image-fit image-top-rounded"}
                          height={"350px"}
                          src={company.picture ? "data:image/jpeg;base64," + company.picture : DefaultDrug}/>
                <Card.Body>
                    <Card.Title className={"text-center"}><h2>{company.name}</h2></Card.Title>
                    <Card.Text className={"mt-4"}> {company.description} </Card.Text>
                    <Card.Text
                        className={"mt-4"}> Since {company.createdOn.split("T")[0]} </Card.Text>
                    <hr width={"30%"}/>
                    <div className={"row"}>
                        {companyDrugs && companyDrugs.length > 0 && companyDrugs.map(drug =>
                            <div className={"col-md-3 mb-4"} key={drug.id}>
                                <DrugCardItem
                                    id={drug.id}
                                    title={drug.name}
                                    text={drug.description}
                                    price={drug.price}
                                    cures={drug.cures}/>
                            </div>
                        )}
                    </div>
                    <div className={"text-center"}>
                        {props.profile && props.profile.username === company.companyOwner.username &&
                        <>
                            <Button onClick={() => history.push("/company/admin")} className={"mr-4"}
                                    variant={"outline-warning"}>
                                <i className="fas fa-edit"/> Edit
                            </Button>
                            <Button variant={"outline-danger"} onClick={handleDelete}>
                                <i className="fas fa-trash-alt"/> Delete
                            </Button>
                        </>}
                    </div>
                </Card.Body>
            </Card>}
        </>
    )
}

export default CompanyDetails;