import { Navigate } from "react-router-dom";

export const OpenRoute = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("token");
  console.log(getTokenFromLocalStorage);
  return getTokenFromLocalStorage === null ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
