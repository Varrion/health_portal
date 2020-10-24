import React, {useEffect, useState} from "react";
import {GetAllDrugs} from "../services/DrugService";
import {GetAllCategories} from "../services/CategoryService";
import {Link, useHistory} from "react-router-dom";
import DrugMediaItem from "../components/DrugMediaItem";

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
                    <ul className="list-unstyled scrolling-list">
                        {drugs && drugs.length > 0 && drugs.map(drug =>
                            <DrugMediaItem key={drug.id}
                                           picture={drug.picture}
                                           id={drug.id}
                                           title={drug.name}
                                           text={drug.description}/>)}
                    </ul>
                </div>
                <div className={"col-md-3"}>
                    <div className={"list-group"}>
                        {categories && categories.length > 0 ? categories.map((category, index) =>
                                <Link key={index}
                                      className={`list-group-item list-group-item-action listItem mb-4 ${index === 0 && "borderless"}`}
                                      to={`/category/${category.id}`}>{category.name} </Link>)
                            : <p>No categories have been added yet. Add some</p>
                        }
                        {props.profile && props.profile.isCompanyOwner &&
                        <Link className={"btn btn-outline-primary"} to={"/category/add"}>
                            <i className="fas fa-plus-circle"/> Add category
                        </Link>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;