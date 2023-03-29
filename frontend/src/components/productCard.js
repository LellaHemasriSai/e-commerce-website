import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import wish from "../images/wish.svg";
import cat1 from "../images/category-1.jpg";
import comp from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addcart from "../images/add-cart.svg";
const ProductCard = (props) => {
  // const { grid } = props;
  // console.log(grid);
  let location = useLocation();
  return (
    <>
      <div
        // className={`${
        //   location.pathname == "/product" ? `gr-${grid}` : "col-3"
        // }`}
        className="col-3"
      >
        <Link
          to={`${location.pathname === "/" ? "product/:id" : ":id"}`}
          className="product-card position-relative"
          style={{ width: "300px" }}
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={cat1} alt="product" />
          </div>
          <div className="product-details">
            <h6 className="brand">Zara</h6>
            <h5 className="product-title">
              kids headphones bulk 10 pack multi colored for students
            </h5>

            <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price text-black">100</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column">
              <button className="border-0 bg-transparent">
                <img src={comp} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
