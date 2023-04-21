import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(null);
  const cartstate = useSelector((state) => state.auth.cartProducts);
  const authstate = useSelector((state) => state.auth);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartstate?.length; index++) {
      sum = sum + Number(cartstate[index].quantity) * cartstate[index].price;
      setAmount(sum);
    }
  });
  return (
    <>
      <header className="header-top py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Free shipping over 300 Rupees</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Telephone: <a href="tel:+91 1234567890">+91 1234567890</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-middle py-2">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2 className="text-white">Ecommerce</h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search Product"
                  aria-label="Search Product"
                  aria-describedby="basic-addon2"
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
                    to="compare-product"
                    className="text-white d-flex align-items-center gap-10"
                  >
                    <img src="images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare
                      <br />
                      Products
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
                      <p className="mb-0">{amount ? amount : 0}</p>
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
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle gap-15"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span className="me-5d-inline-block">Categories</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-tems-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/">Blogs</NavLink>
                    <NavLink to="/conatct">Contact</NavLink>
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
