import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = () => {
  return (
    <>
      <div className="col-3">
        <Link
          className="product-card position-relative"
          style={{ width: "300px" }}
        >
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src="images/wish.svg" alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src="images/category-1.jpg" alt="product" />
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
            <p className="description text-black d-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              repudiandae voluptates ratione quia perspiciatis. Delectus
              voluptate perspiciatis natus nihil, nostrum officiis mollitia
              consequuntur voluptatum sunt. Rerum nesciunt tempora similique
              nisi!
            </p>
            <p className="price text-black">100</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column">
              <Link>
                <img src="images/prodcompare.svg" alt="compare" />
              </Link>
              <Link>
                <img src="images/view.svg" alt="view" />
              </Link>

              <Link>
                <img src="images/add-cart.svg" alt="addcart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
