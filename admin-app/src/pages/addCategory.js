import { React, useEffect } from "react";
import CustomInput from "../components/customInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProductCategory } from "../features/productCategory/productCategorySlice";
import { useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Category name is Required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newcategory = useSelector((state) => state.productCategory);
  const { isSuccess, isError, isLoading, createdProductCategory } = newcategory;
  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Product Category Added Successfully!!");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProductCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/category-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Product Category</h3>
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
            Add Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
