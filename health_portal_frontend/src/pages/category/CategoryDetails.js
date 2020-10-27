import React, {useEffect, useState} from "react";
import {DeleteCategory, GetCategoryDetails} from "../../services/CategoryService";
import {useParams, useHistory} from "react-router-dom";
import {Card} from "react-bootstrap";
import AddUpdateDrug from "../drug/AddUpdateDrug";
import Button from "react-bootstrap/Button";
import {GetAllDrugsByCategory} from "../../services/DrugService";
import DrugCardItem from "../../components/DrugCardItem";
import {useToasts} from "react-toast-notifications";

function CategoryDetails(props) {
    const {addToast} = useToasts();
    const {categoryId} = useParams();
    const history = useHistory();
    const [category, setCategory] = useState(null);
    const [categoryDrugs, setCategoryDrugs] = useState(null);
    const [showAddDrugModal, setShowAddDrugModal] = useState(false);
    useEffect(() => {
        GetCategoryDetails(categoryId)
            .then(res => {
                setCategory(res.data);

                GetAllDrugsByCategory(res.data.id)
                    .then(result => {
                        setCategoryDrugs(result.data);
                    })
            })
    }, [showAddDrugModal])

    const handleDeleteCategory = () => {
        DeleteCategory(categoryId)
            .then(res => {
                addToast("Category successfully deleted", {appearance: "error"});
                history.push("/");
            })
    }

    return (
        <Card className={"pl-5 pt-2"}>
            {category && <>
                <Card.Title className={"text-center"}>
                    <h3>{category.name}</h3>
                </Card.Title>
                <Card.Body>
                    <p>{category.description}</p>
                    <div className={"row"}>
                        {categoryDrugs && categoryDrugs.length > 0 && categoryDrugs.map(drug =>
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
                    {props.profile && props.profile.isCompanyOwner &&
                    <div className={"mt-4 text-right"}>
                        <Button variant={"outline-danger mr-3"} onClick={handleDeleteCategory}>
                            Delete Category
                        </Button>
                        <Button variant={"outline-primary"} onClick={() => setShowAddDrugModal(true)}>
                            Add Drug
                        </Button>
                    </div>}
                </Card.Body>
                {showAddDrugModal && <AddUpdateDrug categoryid={category.id}
                                                    show={showAddDrugModal}
                                                    onHide={() => setShowAddDrugModal(false)}/>}
            </>}
        </Card>
    )
}

export default CategoryDetails