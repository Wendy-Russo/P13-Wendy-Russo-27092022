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
      return response.data;
    });
}

const updateProfile = (firstName, lastName,currentUser) => {
  //console.log("service",currentUser.body.token)
  return axios
    .put(BASE_URL + "/user/profile", {
      firstName : firstName,
      lastName : lastName,
    },
    { headers : authHeader(currentUser)}
    )
    .then((response) => {
      return response.data;
    });
}

const logout = () => {
  localStorage.removeItem("user");
};

const getUserProfile = (user) => {
  return axios.post( BASE_URL + "/user/profile" , "",{headers: authHeader(user) });
}

const authService = {
  login,
  logout,
  updateProfile,
  getUserProfile,
}

export default authService;
