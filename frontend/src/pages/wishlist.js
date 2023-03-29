import React from "react";
import Container from "../components/container";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
const Wishlist = () => {
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="wishlist-card w-100 position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-image">
                <img
                  src="images/category-1.jpg"
                  alt="women's-dress"
                  className="img-fluid w-100"
                />
              </div>
              <div className="px-2 py-3">
                <h5 className="title">Blazer</h5>
                <h6 className="price">400</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
