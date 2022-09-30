import axios from "axios";
import authHeader from "./auth.header";
const BASE_URL = "http://localhost:3001/api/v1";

const login = (username, password) => {
  return axios
    .post(BASE_URL + "/user/login", {
      email : username,
      password : password,
    })
    .then((response) => {
      if (response.data.body.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

const updateProfile = (firstName, lastName) => {
  return axios
    .put(BASE_URL + "/user/profile", {
      firstName : firstName,
      lastName : lastName,
    },
    {
      headers : authHeader(),
    })
    .then((response) => {
      if (response.data.body.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
  updateProfile,
}

export default authService;
