import { React, useEffect } from "react";
import CustomInput from "../components/customInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCoupons,
  resetState,
  getACoupon,
  updateACoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  name: yup.string().required("Coupon name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newcoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    updatedCoupon,
    couponDiscount,
    couponExpiry,
  } = newcoupon;
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/admin/coupon-list");
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon"
            name="name"
            val={formik.values.name}
            onCh={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
          />
          <div className="error ">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            val={formik.values.expiry}
            onCh={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
          />
          <div className="error ">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            val={formik.values.discount}
            onCh={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
          />
          <div className="error ">
            {formik.touched.discount && formik.errors.discount}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
