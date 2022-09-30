import axios from "axios";
import authHeader from "./auth.header";

const BASE_URL = "http://localhost:3001/api/v1";

const getUserProfile = () => {
  return axios.post( BASE_URL + "/user/profile" , "",{headers: authHeader() });
}


const userService = {
  getUserProfile,
}

export default userService
