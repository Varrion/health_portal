import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {AddCompany} from "../../services/CompanyService";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";

function AddUpdateCompany(props) {
    const history = useHistory();
    const [company, setCompany] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        createdOn: new Date(),
        companyOwner: props.owner
    });

    const [companyPicture, setCompanyPicture] = useState(null);
    const handleDateChange = date => {
        setCompany({...company, createdOn: date})
    }

    const handleChange = name => event => {
        setCompany({...company, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        AddCompany(company)
            .then(res => {
                history.push(`/company/${res.data.id}`)
                window.location.reload();
            })
    };

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
                                        companyPicture ? companyPicture.name :
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                    }
                                </div>
                            </section>
                        )}
                    </Dropzone>

                    <div>
                        <Button type="submit" className={"mb-3"}>
                            Add Company
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddUpdateCompany;