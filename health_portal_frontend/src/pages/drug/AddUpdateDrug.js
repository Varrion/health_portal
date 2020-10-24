import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {AddDrug, EditDrug, Illness} from "../../services/DrugService";
import {useHistory} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import DateRangePicker from "react-bootstrap-daterangepicker";
import 'bootstrap-daterangepicker/daterangepicker.css';
import Dropzone from "react-dropzone";
import Col from "react-bootstrap/Col";

function AddUpdateDrug(props) {
    const history = useHistory();
    const [drug, setDrug] = useState({
        name: props.drug?.name ?? "",
        description: props.drug?.description ?? "",
        validFrom: new Date(props.drug?.validFrom) ?? new Date(),
        validTo: new Date(props.drug?.validTo) ?? new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        price: props.drug?.price ?? 0,
        quantity: props.drug?.quantity ?? 0,
        categoryId: props.categoryid ?? 0,
        cures: props.drug?.cures ?? ""
    })
    const [drugPicture, setDrugPicture] = useState(props.drug?.picture ?? null);

    const handleChange = name => event => {
        setDrug({...drug, [name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("drugDto", new Blob([JSON.stringify({...drug})], {
            type: "application/json"
        }));
        formData.append("drugPicture", drugPicture);

        if (!props.drug) {
            AddDrug(formData)
                .then(r => {
                    history.push(`/drug/${r.data.id}`)
                })
                .catch(err => {

                })
        } else {
            EditDrug(props.drug.id, formData)
                .then(() => props.onHide())
        }
    };

    const handleCallback = (start, end) => {
        setDrug({...drug, validFrom: start._d, validTo: end._d})
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Drug details
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Name</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control placeholder="Analgin"
                                          value={drug.name} onChange={handleChange("name")}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Valid date</Form.Label>
                        <DateRangePicker onCallback={handleCallback}
                                         initialSettings={{startDate: drug.validFrom, endDate: drug.validTo}}>
                            <input type="text" className="form-control"/>
                        </DateRangePicker>
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Description</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control as={"textarea"}
                                          rows={6}
                                          value={drug.description}
                                          onChange={handleChange("description")}
                                          placeholder="Write something about this drug..."/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Cures </Form.Label>
                        <Form.Control as={"select"} value={drug.cures} onChange={handleChange("cures")}>
                            <option value={""}>Select one</option>
                            {Illness.map((illness, index) =>
                                <option key={index} value={illness}>{illness}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Price in <i className="fas fa-euro-sign"/></Form.Label>
                            <InputGroup className="mb-2 mr-sm-2">
                                <Form.Control type={"number"}
                                              value={drug.price} onChange={handleChange("price")}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup className="mb-2 mr-sm-2">
                                <Form.Control type={"number"}
                                              value={drug.quantity} onChange={handleChange("quantity")}/>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Dropzone onDrop={acceptedFiles => setDrugPicture(acceptedFiles[0])} className={"customDropzone"}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div className={"text-center"} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        drugPicture ?
                                            <img
                                                className={"image-fit"}
                                                src={typeof drugPicture === "string" ? "data:image/jpeg;base64," + drugPicture : URL.createObjectURL(drugPicture)}
                                                width={"100%"} height={250}/> :
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

export default AddUpdateDrug;