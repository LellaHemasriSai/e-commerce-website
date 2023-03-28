import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import wish from "../images/wish.svg";
import cat1 from "../images/category-1.jpg";
import comp from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addcart from "../images/add-cart.svg";
const ProductCard = () => {
  return (
    <>
      <div className="col-3">
        <Link
          to=":id"
          className="product-card position-relative"
          style={{ width: "300px" }}
        >
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src={wish} alt="wishlist" />
            </Link>
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
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price text-black">100</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column">
              <Link>
                <img src={comp} alt="compare" />
              </Link>
              <Link>
                <img src={view} alt="view" />
              </Link>

              <Link>
                <img src={addcart} alt="addcart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
