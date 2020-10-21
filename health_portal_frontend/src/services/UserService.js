import axios from "../config/Axios"

async function GetAllUsers() {
    return axios.get("user");
}

async function GetUserDetails(username) {
    return axios.get(`user/${username}`);
}

async function RegisterUser(registerForm) {
    return axios.post("user", registerForm);
}

async function LoginUser(loginForm) {
    return axios.post("user/login", loginForm);
}

async function EditUser(username, userDto) {
    return axios.put(`user/${username}`, userDto);
}

async function DeleteUser(username) {
    return axios.delete(`user/${username}`);
}

const BasicAuthToken = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password)
}

export {RegisterUser, LoginUser, GetAllUsers, GetUserDetails, EditUser, DeleteUser, BasicAuthToken}