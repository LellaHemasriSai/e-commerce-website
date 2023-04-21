import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [prodUpdate, setProdUpdate] = useState(null);
  const [amount, setAmount] = useState(null);
  // console.log(amount);
  const cartstate = useSelector((state) => state.auth.cartProducts);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  useEffect(() => {
    if (prodUpdate !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: prodUpdate?.cartItemId,
          quantity: prodUpdate?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 300);
    }
  }, [prodUpdate]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartstate?.length; index++) {
      sum = sum + Number(cartstate[index].quantity) * cartstate[index].price;
      setAmount(sum);
    }
  }, [cartstate]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 300);
  };
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Price</h4>
              <h4 className="cart-col-2">Product</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {cartstate &&
              cartstate?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data mb-2 py-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          className="img-fluid"
                          src={item?.productId?.images[0].url}
                          alt="Product"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId?.title}</p>
                        <p className="d-flex gap-3">
                          Color:{" "}
                          <li
                            style={{ backgroundColor: item?.color.title }}
                          ></li>
                        </p>
                        <p>{item?.color?.title}</p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex gap-15 align-items-center">
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          name=""
                          id=""
                          min={1}
                          max={10}
                          defaultValue={
                            prodUpdate?.quantity
                              ? prodUpdate?.quantity
                              : item?.quantity
                          }
                          onChange={(e) => {
                            setProdUpdate({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">{item?.price * item?.quantity}</h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue to Shopping
              </Link>
              {(amount !== null || amount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: {amount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
