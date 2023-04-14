import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUserId } from "../features/auth/authSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUserId(userId));
  }, [userId]);
  const orderstate = useSelector((state) => state.auth.orders[0].products);
  console.log(orderstate);
  const data1 = [];
  for (let i = 0; i < orderstate.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i].product.title,
      brand: orderstate[i].product.brand,
      count: orderstate[i].count,
      amount: orderstate[i].product.price,
      color: orderstate[i].product.color,
      date: orderstate[i].product.createdAt,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
