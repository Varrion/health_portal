import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {Link} from "react-router-dom";
import DefaultDrug from "../assets/defaultDrug.jpg";
import {TruncateText} from "../services/TextTransformation";

function DrugCardItem(props) {
    return (
        <Card className={"rounded-content"} style={{minHeight: "430px"}}>
            <Card.Img className={"image-top-rounded"} variant="top"
                      src={props.picture ? "data:image/jpeg;base64," + props.picture : DefaultDrug}/>
            <Card.Body style={{minHeight: "150px"}}>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {TruncateText(props.text)}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Cures {props.cures}</ListGroupItem>
                <ListGroupItem>Price {props.price}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Link className={"card-link"} to={`/drug/${props.id}`}>More Details</Link>
            </Card.Body>
        </Card>
    )
}

export default DrugCardItem;