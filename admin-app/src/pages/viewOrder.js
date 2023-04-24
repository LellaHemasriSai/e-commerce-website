import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUserId } from "../features/auth/authSlice";

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
  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUserId(orderId));
  }, [orderId]);
  const orderstate = useSelector((state) => state?.auth?.singleorder);
  console.log(orderstate);
  const data1 = [];
  for (let i = 0; i < orderstate?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate?.orderItems[i]?.product.title,
      brand: orderstate?.orderItems[i]?.product.brand,
      count: orderstate?.orderItems[i]?.quantity,
      amount: orderstate?.orderItems[i]?.price,
      color: orderstate?.orderItems[i]?.color?.title,
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
