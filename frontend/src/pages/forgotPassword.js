import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/container";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";

const ForgotPassword = () => {
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card mb-3">
              <h3 className="text-center">Reset your Password</h3>
              <p className="text-center mt-2 mb-3">
                Email will be sent for password reset
              </p>
              <form action="" className="d-flex flex-column gap-15">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                <div>
                  <div className="mt-3 d-flex flex-column justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
