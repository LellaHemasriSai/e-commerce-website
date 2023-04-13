import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/auth/authSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
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

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  const orderstate = useSelector((state) => state.auth.orders);
  // console.log(orderstate);
  const data1 = [];
  for (let i = 0; i < orderstate.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i].orderby.firstname,
      product: (
        <Link to={`/admin/order/${orderstate[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      // product: orderstate[i].products.map((i, j) => {
      //   return (
      //     <ul key={j}>
      //       <li>{i.product.title}</li>
      //     </ul>
      //   );
      // }),
      amount: orderstate[i].paymentIntent.amount,
      date: new Date(orderstate[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
