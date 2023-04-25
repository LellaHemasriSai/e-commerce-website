import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Container from "../components/container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createAnOrder, updateAmount } from "../features/user/userSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.number().required("Pincode is required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let index1 = location.state.account;
  const discount = location.state.discount;
  // console.log(discount);
  const [bankamount, setBankamount] = useState({
    amount: "",
    title: "",
    userId: "",
  });
  // console.log(bankamount);
  const [tamount, setAmount] = useState(null);
  const [tamountafterdiscount, setAmountAfterDiscount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [productstate, setProductstate] = useState([]);
  const userstate = useSelector((state) => state.auth);
  const cartstate = useSelector((state) => state.auth.cartProducts);
  const bankstate = useSelector((state) => state?.auth?.bank);
  const couponstate = useSelector((state) => state.coupon?.coupons);
  console.log(couponstate);
  let amt1 = bankstate[index1]?.amount;
  amt1 = amt1 - parseInt(tamountafterdiscount + 100);
  let disc = tamount - tamountafterdiscount;
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartstate?.length; index++) {
      sum = sum + Number(cartstate[index].quantity) * cartstate[index].price;
      setAmount(sum);
    }
  }, [cartstate]);
  useEffect(() => {
    setAmountAfterDiscount(tamount - (tamount * discount) / 100);
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setTimeout(() => {
        if (amt1 >= 0) {
          checkOutHandler(amt1, index1);
        } else {
          toast.error("Account Balance is Less!!");
        }
      }, 300);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartstate?.length; index++) {
      items.push({
        product: cartstate[index].productId._id,
        quantity: cartstate[index].quantity,
        color: cartstate[index].color._id,
        price: cartstate[index].price,
        bankId: bankstate[index1]?._id,
      });
    }
    setProductstate(items);
  }, []);
  const checkOutHandler = async (amt, index) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      { amount: tamountafterdiscount + 100 },
      config
    );
    if (!result) {
      alert("Something Went Wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_IkTrsrpynLHLwp",
      amount: amount,
      currency: currency,
      name: "Ecommerce",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          "http://localhost:5000/api/user/order/paymentVerification",
          data,
          config
        );
        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });
        let title1 = bankstate[index]?._id;
        let userId1 = userstate?.user?._id;
        if (amt >= 0) {
          dispatch(
            createAnOrder({
              totalPrice: tamount,
              totalPriceAfterDiscount: tamountafterdiscount,
              orderItems: productstate,
              paymentInfo: paymentInfo,
              shippingInfo: shippingInfo,
            })
          );
          setBankamount({
            amount: amt,
            title: title1,
            userId: userId1,
          });
          dispatch(updateAmount(bankamount));
        }
      },
      prefill: {
        name: "Ecommerce",
        email: "ecommerce@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "IIT Tiruapti",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
              <p className="user-details">
                {userstate?.user?.firstname} ({userstate?.user?.email})
              </p>
              <p className="total-price">Shipping Address</p>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    value={formik.values.country}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    value={formik.values.firstName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Appartment"
                    className="form-control"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    value={formik.values.other}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    value={formik.values.city}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    value={formik.values.state}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="AndhraPradesh">Andhra Pradesh</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name="pincode"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                    value={formik.values.pincode}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
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
                    <button className="button" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartstate &&
                cartstate?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex mb-2 gap-10 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle position-absolute p-2"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={item?.productId?.images[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId.title}
                          </h5>
                          <p className="total-price">{item?.color.title}</p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total-price">
                          {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Before Discount</p>
                <p className="total-price">{tamount ? tamount : "0"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">After Discount</p>
                <p className="total-price">
                  {tamountafterdiscount ? tamountafterdiscount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">100</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                {tamountafterdiscount ? tamountafterdiscount + 100 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
