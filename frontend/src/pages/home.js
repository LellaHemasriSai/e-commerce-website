import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/container";
const Home = () => {
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
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
                <Link to="/product" className="button">
                  BUY NOW
                </Link>
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
                <Link to="/product" className="button">
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
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
      </Container>
    </>
  );
};

export default Home;
