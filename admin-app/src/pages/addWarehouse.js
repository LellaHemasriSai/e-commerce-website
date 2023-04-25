import { React, useEffect } from "react";
import CustomInput from "../components/customInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createWarehouses,
  getAWarehouse,
  resetState,
  updateAWarehouse,
} from "../features/warehouse/warehouseSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Brand name is Required"),
});

const AddWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getWarehouseId = location.pathname.split("/")[3];
  const newwarehouse = useSelector((state) => state.warehouse);
  const {
    isSuccess,
    isError,
    isLoading,
    createdWarehouse,
    warehouseName,
    updatedWarehouse,
  } = newwarehouse;
  useEffect(() => {
    if (getWarehouseId !== undefined) {
      dispatch(getAWarehouse(getWarehouseId));
    } else {
      dispatch(resetState());
    }
  }, [getWarehouseId]);

  useEffect(() => {
    if (isSuccess && createdWarehouse) {
      toast.success("Warehouse Added Successfully!!");
    }
    if (isSuccess && updatedWarehouse) {
      toast.success("Warehouse Updated Successfullly!");
      navigate("/admin/warehouse-list");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: warehouseName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getWarehouseId !== undefined) {
        const data = { id: getWarehouseId, warehouseData: values };
        dispatch(updateAWarehouse(data));
        dispatch(resetState());
      } else {
        dispatch(createWarehouses(values));
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
        {getWarehouseId !== undefined ? "Edit" : "Add"} Warehouse
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Warehouse"
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
            {getWarehouseId !== undefined ? "Edit" : "Add"} Warehouse
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWarehouse;
