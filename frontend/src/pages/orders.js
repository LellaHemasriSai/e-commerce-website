import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import Container from "../components/container";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrder } from "../features/user/userSlice";
import { useFormik } from "formik";

const Orders = () => {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state?.auth?.getorderedProduct);
  const [orderData, setorderData] = useState(null);
  // console.log(orderData);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const formik = useFormik({
    initialValues: {
      id: "",
      orderstatus: "",
      warehouse: "",
    },
    onSubmit: () => {
      dispatch(updateOrder(orderData));
      setTimeout(() => {
        dispatch(getOrders());
      }, 300);
    },
  });

  return (
    <>
      <Meta title={"My Orders"} />
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-1">
                <h5>Number</h5>
              </div>
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-2">
                <h5>Total Amount</h5>
              </div>
              <div className="col-2">
                <h5>Total Amount After Discount</h5>
              </div>
              <div className="col-1">
                <h5>Status</h5>
              </div>
              <div className="col-1">
                <h5>Path</h5>
              </div>
              <div className="col-2">
                <h5>Return</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderstate &&
              orderstate?.map((item, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col-1">
                      <p>{index + 1}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-2">
                      <p>{item?.totalPrice}</p>
                    </div>
                    <div className="col-2">
                      <p>{item?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className="col-1">
                      <p>{item?.orderstatus}</p>
                    </div>
                    <div className="col-1">
                      <p>{item?.warehouse}</p>
                    </div>
                    <div className="col-2">
                      <form
                        action=""
                        onSubmit={formik.handleSubmit}
                        className="d-flex gap-15 flex-wrap justify-content-between"
                      >
                        <button
                          className="button border-0 mt-0 mb-3 align-items-center justify-content-center"
                          type="submit"
                          onClick={() =>
                            setorderData({
                              id: item?._id,
                              orderstatus: "Return",
                              warehouse: "WareHouse2",
                            })
                          }
                        >
                          Return
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
