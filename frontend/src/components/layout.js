import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default layout;
