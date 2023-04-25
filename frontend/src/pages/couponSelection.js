import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import Container from "../components/container";
import { getAllCoupon } from "../features/coupon/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const CouponSelection = () => {
  const couponstate = useSelector((state) => state.coupon.coupons);
  //   console.log(couponstate);
  const dispatch = useDispatch();
  useEffect(() => {
    getCoupons();
  }, []);
  const getCoupons = () => {
    dispatch(getAllCoupon());
  };
  return (
    <>
      <Meta title={"Coupons"} />
      <BreadCrumb title="Coupon" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card mb-3">
              <h3 className="text-center">Coupons</h3>
              {couponstate &&
                couponstate?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <p className="text-center">Coupon Name: {item?.name}</p>
                        <p className="text-center">
                          Coupon Discount: {item?.discount}
                        </p>
                      </div>

                      <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                        <Link
                          to="/bankselection"
                          className="button"
                          state={{ discount: item?.discount }}
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CouponSelection;
