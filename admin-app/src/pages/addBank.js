import { React, useEffect } from "react";
import CustomInput from "../components/customInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  addBankAccount,
  resetState,
  updateABank,
  getABank,
} from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object({
  title: yup.string().required("Bank Name is required"),
  amount: yup.number().required("Amount is required"),
});
const AddBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getbankId = location.pathname.split("/")[3];
  // console.log(getbankId);
  const newbank = useSelector((state) => state.auth);
  const { isSuccess, isError, isLoading, bankaccount, bankName, updatedBank } =
    newbank;
  useEffect(() => {
    if (getbankId !== undefined) {
      dispatch(getABank(getbankId));
    } else {
      dispatch(resetState());
    }
  }, [getbankId]);

  useEffect(() => {
    if (isSuccess && bankaccount) {
      toast.success("Bank Account Added Successfully!!");
    }
    if (isSuccess && updatedBank) {
      toast.success("Bank Account Updated Successfullly!");
      navigate("/admin/bank-list");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bankName || "",
      amount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getbankId !== undefined) {
        const data = { id: getbankId, bankData: values };
        dispatch(updateABank(data));
        dispatch(resetState());
      } else {
        dispatch(addBankAccount(values));
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
        {getbankId !== undefined ? "Edit" : "Add"} Bank
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="string"
            name="title"
            label="Bank Name"
            val={formik.values.title}
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            className="mt-1"
            type="number"
            name="amount"
            label="Amount in the account"
            val={formik.values.amount}
            onCh={formik.handleChange("amount")}
            onBlr={formik.handleBlur("amount")}
          />
          <div className="error">
            {formik.touched.amount && formik.errors.amount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getbankId !== undefined ? "Edit" : "Add"} Bank
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBank;
