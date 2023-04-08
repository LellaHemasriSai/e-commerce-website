import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${getTokenfromLocalStorage.token}`,
    Accept: "application/json",
  },
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrder = async () => {
  // console.log(getTokenfromLocalStorage.token);
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const authService = { getOrder, login };
export default authService;
