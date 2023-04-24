import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import Container from "../components/container";
import CustomInput from "../components/customInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBankAccount } from "../features/user/userSlice";

const bankSchema = yup.object({
  title: yup.string().required("Bank Name is required"),
  amount: yup.number().required("Amount is required"),
});

const AddBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
    },
    validationSchema: bankSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addBankAccount(values));
      setTimeout(() => {
        navigate("/");
      }, 300);
    },
  });
  return (
    <>
      <Meta title={"Bank"} />
      <BreadCrumb title="Bank" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card mb-3">
              <h3 className="text-center">Bank Account</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="string"
                  name="title"
                  placeholder="Bank Name"
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                />
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
                <CustomInput
                  className="mt-1"
                  type="number"
                  name="amount"
                  placeholder="Amount in the account"
                  value={formik.values.amount}
                  onChange={formik.handleChange("amount")}
                  onBlur={formik.handleBlur("amount")}
                />
                <div className="error">
                  {formik.touched.amount && formik.errors.amount}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">
                      Add Bank Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddBank;
