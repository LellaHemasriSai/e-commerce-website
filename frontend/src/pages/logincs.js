import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import Container from "../components/container";

const Logincs = () => {
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card mb-3">
              <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                <Link to="/login" className="button signup">
                  Customer
                </Link>
                <Link to="/seller-register" className="button signup">
                  Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Logincs;
