import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import productCategoryReducer from "../features/productCategory/productCategorySlice";
import colorReducer from "../features/color/colorSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: productCategoryReducer,
    color: colorReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
