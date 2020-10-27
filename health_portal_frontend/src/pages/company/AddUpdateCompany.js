import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {AddCompany, DeleteCompany, EditCompany, GetCompanyByOwner} from "../../services/CompanyService";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";

function AddUpdateCompany(props) {
    const history = useHistory();
    const [companyId, setCompanyId] = useState(null);
    const [company, setCompany] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        createdOn: new Date(),
        companyOwner: props.profile.username ?? null
    });

    const [companyPicture, setCompanyPicture] = useState(null);
    const handleDateChange = date => {
        setCompany({...company, createdOn: date})
    }

    useEffect(() => {
        if (props.profile.isCompanyOwner) {
            GetCompanyByOwner(props.profile.username)
                .then(res => {
                    if (res.data.id) {
                        setCompanyId(res.data.id);
                        setCompany({
                            createdOn: new Date(res.data.createdOn),
                            address: res.data.address,
                            city: res.data.city,
                            description: res.data.description,
                            name: res.data.name,
                            companyOwner: res.data.companyOwner.username
                        });
                        setCompanyPicture(res.data.picture);
                    }
                })
        } else {
            history.push("/")
        }
    }, [])

    const handleChange = name => event => {
        setCompany({...company, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(company)
        const formData = new FormData();
        formData.append("companyDto", new Blob([JSON.stringify({...company})], {
            type: "application/json"
        }));
        formData.append("companyPicture", companyPicture);

        if (!companyId) {
            AddCompany(formData)
                .then(res => {
                    history.push(`/company/${res.data.id}`)
                    window.location.reload();
                })
        } else {
            EditCompany(companyId, formData)
                .then(res => {
                    history.push(`/company/${res.data.id}`)
                    window.location.reload();
                })
        }
    };

    const handleDelete = () => {
        DeleteCompany(companyId)
            .then(() => {
                history.push("/");
                window.location.reload();
            })
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="title-font mb-3">Your Company</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control placeholder="Company name"
                                          value={company.name} onChange={handleChange("name")}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control as={"textarea"}
                                          rows={6}
                                          value={company.description}
                                          onChange={handleChange("description")}
                                          placeholder="Write something about your company..."/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Since</Form.Label> <br/>
                        <Form.Control as={DatePicker} selected={company.createdOn}
                                      onChange={handleDateChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control
                                value={company.city}
                                onChange={handleChange("city")}
                                placeholder="City..."/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control
                                value={company.address}
                                onChange={handleChange("address")}
                                placeholder="Address..."/>
                        </InputGroup>
                    </Form.Group>

                    <Dropzone onDrop={acceptedFiles => setCompanyPicture(acceptedFiles[0])}
                              className={"customDropzone"}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        companyPicture ?
                                            <img
                                                className={"image-fit"}
                                                src={typeof companyPicture === "string" ? "data:image/jpeg;base64," + companyPicture : URL.createObjectURL(companyPicture)}
                                                width={"100%"} height={250}/> :
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                    }
                                </div>
                            </section>
                        )}
                    </Dropzone>

                    <div className={"text-center mt-4 mb-3"}>
                        <Button type="submit" variant={"outline-primary"}>
                            {companyId ? "Edit" : "Add"} Company
                        </Button>
                        {companyId &&
                        <Button onClick={handleDelete} type="submit" variant={"outline-danger"} className={"ml-3"}>
                            Delete Company
                        </Button>}

                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddUpdateCompany;