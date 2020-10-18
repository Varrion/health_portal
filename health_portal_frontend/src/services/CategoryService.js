import axios from "../config/Axios";

async function GetAllCategories() {
    return axios.get("category");
}

async function GetCategoryDetails(categoryId) {
    return axios.get(`category/${categoryId}`);
}

async function AddCategory(categoryForm) {
    return axios.post("category", categoryForm);
}

async function EditCategory(categoryId, categoryForm) {
    return axios.put(`category/${categoryId}`, categoryForm);
}

async function DeleteCategory(categoryId) {
    return axios.delete(`category/${categoryId}`);
}

export {GetAllCategories, GetCategoryDetails, AddCategory, EditCategory, DeleteCategory}