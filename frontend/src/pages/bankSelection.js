import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import BreadCrumb from "../components/Store";
import Container from "../components/container";
import { getBanks } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const BankSelection = () => {
  const bankstate = useSelector((state) => state?.auth?.bank);
  console.log(bankstate);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBanks();
  }, []);
  const getAllBanks = () => {
    dispatch(getBanks());
  };
  return (
    <>
      <Meta title={"Bank Accounts"} />
      <BreadCrumb title="Bank Accounts" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card mb-3">
              <h3 className="text-center">Bank Accounts</h3>
              {bankstate &&
                bankstate?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <p className="text-center">Bank Name: {item?.title}</p>
                        <p className="text-center">Amount: {item?.amount}</p>
                      </div>

                      <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                        <Link
                          to="/checkout"
                          className="button"
                          state={{ account: parseInt(index) }}
                        >
                          Use this Account
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BankSelection;
