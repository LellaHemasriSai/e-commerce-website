import React, { useEffect } from "react";
import Container from "../components/container";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlist();
  }, []);
  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  };
  const wishliststate = useSelector((state) => state.auth.wishlist.wishlist);
  console.log(useSelector((state) => state.auth.wishlist));
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  // console.log(wishliststate[0]);
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper py-5 home-wrapper-2">
        <div className="row">
          {wishliststate?.length === 0 && (
            <div className="text-center fs-3">No Data</div>
          )}
          {wishliststate?.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="wishlist-card w-100 position-relative">
                  <img
                    onClick={() => {
                      removeFromWishlist(item?._id);
                    }}
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-image">
                    <img
                      src={
                        item?.images[0].url
                          ? item?.images[0].url
                          : "images/category-1.jpg"
                      }
                      alt="women's-dress"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="px-2 py-3">
                    <h5 className="title">{item?.title}</h5>
                    <h6 className="price">{item?.price}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
