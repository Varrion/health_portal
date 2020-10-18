import axios from "../config/Axios";

async function GetAllManufacturers() {
    return axios.get("manufacturer");
}

async function GetManufacturerDetails(manufacturerId) {
    return axios.get(`manufacturer/${manufacturerId}`);
}

async function AddManufacturer(manufacturerForm) {
    return axios.post("manufacturer", manufacturerForm);
}

async function EditManufacturer(manufacturerId, manufacturerForm) {
    return axios.put(`manufacturer/${manufacturerId}`, manufacturerForm);
}

async function DeleteManufacturer(manufacturerId) {
    return axios.delete(`manufacturer/${manufacturerId}`);
}

export {GetAllManufacturers, GetManufacturerDetails, AddManufacturer, EditManufacturer, DeleteManufacturer}