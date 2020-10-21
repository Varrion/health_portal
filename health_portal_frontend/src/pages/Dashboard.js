import React, {useEffect, useState} from "react";
import {GetAllDrugs} from "../services/DrugService";
import {GetAllCategories} from "../services/CategoryService";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function Dashboard(props) {
    const history = useHistory();
    const [drugs, setDrugs] = useState(null);
    const [categories, setCategires] = useState(null);

    useEffect(() => {
        GetAllDrugs()
            .then(res => {
                setDrugs(res.data);
            })

        GetAllCategories()
            .then(res => {
                setCategires(res.data)
            })
    }, [])

    return (
        <>
            <div className={"dashboardImage"}>
            </div>
            <div className={"row mt-2"}>
                <div className={"col-md-9"}>

                </div>
                <div className={"col-md-3"}>
                    <div className={"list-group"}>
                        {categories && categories.length > 0 ? categories.map((category, index) =>
                                <Link key={index}
                                      className={`list-group-item list-group-item-action listItem mb-4 ${index === 0 && "borderless"}`}
                                      to={`/category/${category.id}`}>{category.name} </Link>)
                            : <p>No categories have been added yet. Add some</p>
                        }
                        <Button onClick={() => history.push("/category/add")} variant={"outline-primary"}>
                            <i className="fas fa-plus-circle"/> Add category</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;