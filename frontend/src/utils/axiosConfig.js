export const base_url = "http://localhost:5000/api/";

const getToken = localStorage.getItem("token");
export const config = {
  headers: {
    Authorization: `Bearer ${getToken !== null ? getToken : ""}`,
    Accept: "application/json",
  },
};
