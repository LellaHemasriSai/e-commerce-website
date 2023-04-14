import { React, useEffect } from "react";
import CustomInput from "../components/customInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createProductCategory,
  resetState,
  updateAProductCategory,
  getProductCategory,
} from "../features/productCategory/productCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Category name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCategoryId = location.pathname.split("/")[3];
  const newcategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProductCategory,
    categoryName,
    updatedCategory,
  } = newcategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getProductCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Product Category Added Successfully!!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createProductCategory(values));
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
        {getCategoryId !== undefined ? "Edit" : "Add"} Product Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Category"
            name="title"
            val={formik.values.title}
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCategoryId !== undefined ? "Edit" : "Add"} Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
