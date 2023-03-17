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
                  <h4>SUPERCHARGED FOR PROS</h4>
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
    </>
  );
};

export default Home;
