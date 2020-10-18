import axios from "../config/Axios"

async function GetAllUsers() {
    return axios.get("user");
}

async function GetUserDetails(userId) {
    return axios.get(`user/${userId}`);
}

async function RegisterUser(registerForm) {
    return axios.post("user", registerForm);
}

async function LoginUser(loginForm) {
    return axios.post("user/login", loginForm);
}

async function EditUser(userId, userDto) {
    return axios.put(`user/${userId}`, userDto);
}

async function DeleteUser(userId) {
    return axios.delete(`user/${userId}`);
}

export {RegisterUser, LoginUser, GetAllUsers, GetUserDetails, EditUser, DeleteUser}