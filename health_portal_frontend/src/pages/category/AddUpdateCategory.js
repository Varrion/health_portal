import React, {useState} from "react";
import {AddCategory} from "../../services/CategoryService";
import {useHistory} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {useToasts} from "react-toast-notifications";

function AddUpdateCategory(props) {
    const {addToast} = useToasts();
    const history = useHistory();
    const [category, setCategory] = useState({
        name: "",
        description: ""
    })

    const handleChange = name => event => {
        setCategory({...category, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        AddCategory(category)
            .then(res => {
                history.push(`/category/${res.data.id}`)
                addToast("successfully created category", {appearance: "success"})
            })
    };

    return (
        <Card>
            <Card.Body>
                <h2 className="title-font mb-3">Add Category</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Name</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control placeholder="Category name"
                                          value={category.name} onChange={handleChange("name")}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Description</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <Form.Control as={"textarea"}
                                          rows={6}
                                          value={category.description}
                                          onChange={handleChange("description")}
                                          placeholder="Write something about this category..."/>
                        </InputGroup>
                    </Form.Group>

                    <div className={"text-right"}>
                        <Button variant={"outline-primary"} type="submit" className={"mb-3"}>
                            Add Category
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddUpdateCategory;