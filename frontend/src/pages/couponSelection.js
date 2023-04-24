import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import Container from "../components/container";

const CouponSelection = () => {
  return (
    <>
      <Meta title={"Coupons"} />
      <BreadCrumb title="Coupon" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card mb-3">
              <h3 className="text-center">Coupons</h3>

              <div>
                <div>
                  <p className="text-center">Coupon Name: rdf</p>
                  <p className="text-center">Coupon Discount: sdfhg</p>
                </div>

                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <Link
                    to="/checkout"
                    className="button"
                    //   state={{ account: parseInt(index) }}
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CouponSelection;
