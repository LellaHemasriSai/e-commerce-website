import { React, useEffect } from "react";
import CustomInput from "../components/customInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createBrands } from "../features/brand/brandSlice";
import { useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Brand name is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newbrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand } = newbrand;
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!!");
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
      dispatch(createBrands(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/brand-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
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
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
