import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  getAllCoupon,
  deleteACoupon,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/customModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCoupon());
  }, []);
  const couponstate = useSelector((state) => state.coupon.coupons);
  // console.log(state);
  const data1 = [];
  for (let i = 0; i < couponstate.length; i++) {
    data1.push({
      key: i + 1,
      name: couponstate[i].name,
      discount: couponstate[i].discount,
      expiry: new Date(couponstate[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/coupon/${couponstate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this coupon?"
      />
    </div>
  );
};

export default CouponList;
