import React from "react";
import CustomInput from "../components/customInput";
const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#3d5a80", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center mt-2 mb-3">
          Email will be sent for password reset
        </p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#3d5a80" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
