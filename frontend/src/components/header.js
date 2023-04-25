import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const Header = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);
  // const [paginate, setPaginate] = useState(null);
  const productstate = useSelector((state) => state.product.product);
  const cartstate = useSelector((state) => state.auth.cartProducts);
  const authstate = useSelector((state) => state.auth);
  const [productOpt, setProductOpt] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartstate?.length; index++) {
      sum = sum + Number(cartstate[index].quantity) * cartstate[index].price;
      setAmount(sum);
    }
  });
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productstate.length; index++) {
      const element = productstate[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productstate]);
  return (
    <>
      <header className="header-middle py-2">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2 className="text-white">Ecommerce</h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onChange={(selected) => {
                    navigate(`/product/${selected[0].prod}`);
                  }}
                  options={productOpt}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Search for products.."
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch className="fs-5" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-links">
                <div>
                  <Link
                    to="add-bank"
                    className="text-white d-flex align-items-center gap-10"
                  >
                    <AiOutlineBank />
                    <p className="mb-0">
                      Add Bank
                      <br />
                      Accounts
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    to="/wishlist"
                    className="text-white d-flex align-items-center gap-10"
                  >
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favourite
                      <br />
                      Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authstate?.user === null ? "/logincs" : ""}
                    className="text-white d-flex align-items-center gap-10"
                  >
                    <img src="images/user.svg" alt="login" />
                    {authstate?.user === null ? (
                      <p className="mb-0">
                        Log in <br /> My account
                      </p>
                    ) : (
                      <p className="mb-0">
                        Welcome <br />
                        {authstate?.user?.firstname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="text-white d-flex align-items-center gap-10"
                  >
                    <img src="images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartstate?.length ? cartstate?.length : 0}
                      </span>
                      <p className="mb-0">{amount ? amount : "0"}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="menu-links">
                  <div className="d-flex align-tems-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
