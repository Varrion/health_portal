import axios from "../config/Axios";

async function GetAllCompanies() {
    return axios.get("company");
}

async function GetCompanyDetails(companyId) {
    return axios.get(`company/${companyId}`);
}

async function AddCompany(companyForm) {
    return axios.post("company", companyForm);
}

async function EditCompany(companyId, companyForm) {
    return axios.put(`company/${companyId}`, companyForm);
}

async function DeleteCompany(companyId) {
    return axios.delete(`company/${companyId}`);
}

async function GetCompanyByOwner(username) {
    return axios.get(`company/owner/${username}`);
}

async function UpdateCompanyDrugs(username, drugId) {
    return axios.post(`company/drugs`, null, {
        params: {
            username: username,
            drugId: drugId
        }
    })
}

export {
    GetAllCompanies,
    GetCompanyDetails,
    AddCompany,
    EditCompany,
    GetCompanyByOwner,
    DeleteCompany,
    UpdateCompanyDrugs
}