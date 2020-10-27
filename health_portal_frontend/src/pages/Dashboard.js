import React, {useEffect, useState} from "react";
import {GetAllDrugs} from "../services/DrugService";
import {GetAllCategories} from "../services/CategoryService";
import {Link, useHistory} from "react-router-dom";
import DrugMediaItem from "../components/DrugMediaItem";
import NoDrugs from "../assets/nodrugs.jpg";

function Dashboard(props) {
    const history = useHistory();
    const [drugs, setDrugs] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        GetAllDrugs()
            .then(res => {
                setDrugs(res.data);
            })

        GetAllCategories()
            .then(res => {
                setCategories(res.data)
            })
    }, [])

    return (
        <>
            <div className={"dashboardImage"}>
            </div>
            <hr width={"65%"}/>
            <div className={"row mt-2"}>
                <div className={"col-md-9"}>
                    {drugs && drugs.length > 0 ? <ul className="list-unstyled scrolling-list">
                            {drugs.map(drug =>
                                <DrugMediaItem key={drug.id}
                                               picture={drug.picture}
                                               id={drug.id}
                                               title={drug.name}
                                               text={drug.description}/>)}
                        </ul> :
                        <div className={"text-center"}>
                            <img style={{maxWidth: "100%"}} height={400} src={NoDrugs} width={"inherit"}
                                 alt={"no drug"}/>
                        </div>}

                </div>
                <div className={"col-md-3"}>
                    <div className={"list-group"}>
                        {categories && categories.length > 0 ? categories.map((category, index) =>
                                <Link key={index}
                                      className={`list-group-item list-group-item-action listItem mb-4 ${index === 0 && "borderless"}`}
                                      to={`/category/${category.id}`}>{category.name} </Link>)
                            : <p>No medicine categories have been added yet.</p>
                        }
                        {props.profile && props.profile.isCompanyOwner &&
                        <Link className={"btn btn-outline-primary rounded-content"} to={"/category/add"}>
                            <i className="fas fa-plus-circle"/> Add category
                        </Link>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;