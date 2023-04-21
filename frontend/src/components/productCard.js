import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import wish from "../images/wish.svg";
import comp from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addcart from "../images/add-cart.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      {data &&
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                location.pathname === "/product" ? `col-${grid}` : "col-3"
              }`}
            >
              <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button className="border-0 bg-transparent">
                    <img
                      onClick={() => {
                        addToWish(item?._id);
                      }}
                      src={wish}
                      alt="wishlist"
                    />
                  </button>
                </div>
                <div className="product-image">
                  <img src={item?.images[0].url} alt="product" />
                </div>
                <div className="product-details">
                  <h6 className="brand">{item?.brand}</h6>
                  <h5 className="product-title">{item?.title}</h5>

                  <ReactStars
                    count={5}
                    size={24}
                    // value={item?.totalrating.toString()}
                    value={3}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p
                    className="d-block text-dark"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                  <p className="price text-black">{item?.price}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column">
                    <button className="border-0 bg-transparent">
                      <img src={comp} alt="compare" />
                    </button>
                    <Link
                      to={"/product/" + item?._id}
                      className="border-0 bg-transparent"
                    >
                      <img src={view} alt="view" />
                    </Link>
                    <button className="border-0 bg-transparent">
                      <img src={addcart} alt="addcart" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
