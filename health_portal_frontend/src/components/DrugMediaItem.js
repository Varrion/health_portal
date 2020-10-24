import React from "react";
import Media from "react-bootstrap/Media";
import DefaultDrug from "../assets/defaultDrug.jpg";
import {Link} from "react-router-dom";

function DrugMediaItem(props) {
    return (
        <>
            <Media as="li">
                <img
                    width={100}
                    height={100}
                    className="mr-3"
                    src={props.picture ? "data:image/jpeg;base64," + props.picture : DefaultDrug}
                    alt="Generic placeholder"
                />
                <Media.Body>
                    <h5>{props.title}</h5>
                    <p>
                        {props.text}
                    </p>
                    <div className={"text-right"}>
                        <Link to={`/drug/${props.id}`}>More details...</Link>
                    </div>
                </Media.Body>
            </Media>
            <hr/>
        </>
    )
}

export default DrugMediaItem;