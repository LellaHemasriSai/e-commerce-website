import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Container from "../components/container";
import cat1 from "../images/category-1.jpg";
const Checkout = () => {
  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Ecommerce</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item  total-price active">
                    Shipping
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item total-price active"
                    aaria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title">Contact Information</h4>
              <p className="user-details">Hemasri (hemasri.lella@gmail.com)</p>
              <p className="total-price">Shipping Address</p>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Appartment"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link className="button" to="/cart">
                      Continue to Shopping
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              <div className="d-flex mb-2 gap-10 align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle position-absolute p-2"
                    ></span>
                    <img className="img-fluid" src={cat1} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">hsgja</h5>
                    <p className="total-price">s / #nddhfh</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total-price">100</h5>
                </div>
              </div>
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">100</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">100</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">100</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
