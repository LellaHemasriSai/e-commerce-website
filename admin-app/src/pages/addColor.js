import { React, useEffect } from "react";
import CustomInput from "../components/customInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createColor, resetState } from "../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();

  const newcolor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newcolor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!!");
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
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
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
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
