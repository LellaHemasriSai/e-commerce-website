import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import Color from "../components/Color";
const CompareProduct = () => {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/category-1.jpg" alt="women's-dress" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Blazer</h5>
                  <h6 className="price mb-3 mt-3">400</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Zara</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Blazer</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>InStock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/category-1.jpg" alt="women's-dress" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Blazer</h5>
                  <h6 className="price mb-3 mt-3">400</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Zara</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Blazer</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>InStock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/category-1.jpg" alt="women's-dress" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Blazer</h5>
                  <h6 className="price mb-3 mt-3">400</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Zara</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Blazer</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>InStock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/category-1.jpg" alt="women's-dress" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Blazer</h5>
                  <h6 className="price mb-3 mt-3">400</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Zara</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Blazer</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>InStock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
