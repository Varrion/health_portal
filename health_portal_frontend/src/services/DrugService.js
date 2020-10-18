import axios from "../config/Axios";

async function GetAllDrugs() {
    return axios.get("drug");
}

async function GetDrugDetails(drugId) {
    return axios.get(`drug/${drugId}`);
}

async function AddDrug(drugForm) {
    return axios.post("drug", drugForm);
}

async function EditDrug(drugId, drugForm) {
    return axios.put(`drug/${drugId}`, drugForm);
}

async function DeleteDrug(drugId) {
    return axios.delete(`drug/${drugId}`);
}

export {GetAllDrugs, GetDrugDetails, AddDrug, EditDrug, DeleteDrug}