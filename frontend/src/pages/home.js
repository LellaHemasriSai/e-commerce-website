import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="images/main.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4 className="text-black">SUPERCHARGED FOR PROS</h4>
                  <h5>ipad S13+ Pro.</h5>
                  <p>From 10,000</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="side-banner position-relative ">
                <img
                  src="images/side.jpg"
                  className="img-fluid rounded-3"
                  alt="side banner"
                />
                <div className="side-banner-content position-absolute">
                  <h4 className="text-black">Offer of the week</h4>
                  <h5 className="text-black">Min. 65% off</h5>
                  <p className="text-black">+ Extra 5% off</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-1.png" alt="service" />
                  <h6 className="mt-3">Daily Offers</h6>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-2.png" alt="service" />
                  <h6 className="mt-3">Affordable Prices</h6>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-3.png" alt="service" />
                  <h6 className="mt-3">
                    Free shipping
                    <br /> On orders over 200/-
                  </h6>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-4.png" alt="service" />
                  <h6 className="mt-3">24/7 Support</h6>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-5.png" alt="service" />
                  <h6 className="mt-3">Secure Payments</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between align-items-center">
                <div>
                  <img src="images/category-1.jpg" alt="women's clothing" />
                  <h6>women's clothing</h6>
                </div>
                <div>
                  <img src="images/category-2.jpg" alt="women's clothing" />
                  <h6 className="mb-0">men's clothing</h6>
                </div>
                <div>
                  <img src="images/category-3.jpg" alt="women's clothing" />
                  <h6>kid's clothing</h6>
                </div>
                <div>
                  <img src="images/category-4.jpg" alt="women's clothing" />
                  <h6>Electronic Gadgets</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
