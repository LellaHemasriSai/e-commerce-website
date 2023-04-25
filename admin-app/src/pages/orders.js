import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  updateAOrder,
  updateAOrderWarehouse,
} from "../features/auth/authSlice";

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
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Path",
    dataIndex: "path",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  const orderstate = useSelector((state) => state.auth.orders);
  const warehousestate = useSelector((state) => state.warehouse.warehouses);
  const data1 = [];
  for (let i = 0; i < orderstate?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i]?.user?.firstname,
      product: (
        <Link to={`/admin/order/${orderstate[i]?._id}`}>View Orders</Link>
      ),
      amount: orderstate[i]?.totalPriceAfterDiscount,
      date: new Date(orderstate[i]?.createdAt).toLocaleString(),
      status: (
        <>
          <select
            name=""
            defaultValue={orderstate[i]?.orderstatus}
            onChange={(e) =>
              updateOrderStatus(orderstate[i]?._id, e.target.value)
            }
            className="form-control form-select"
            id=""
          >
            <option value="Ordered" disabled selected>
              Ordered
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Return">Return</option>
          </select>
        </>
      ),
      path: (
        <>
          <select
            name=""
            defaultValue={orderstate[i]?.warehouse}
            onChange={(e) =>
              updateOrderWarehouse(orderstate[i]?._id, e.target.value)
            }
            className="form-control form-select"
            id=""
          >
            {warehousestate &&
              warehousestate?.map((item1, index1) => {
                return (
                  <option key={index1} value={item1?.title}>
                    {item1?.title}
                  </option>
                );
              })}
            {/* <option value="WareHouse1">WareHouse1</option>
            <option value="WareHouse2">WareHouse2</option>
            <option value="WareHouse3">WareHouse3</option>
            <option value="WareHouse4">WareHouse4</option>
            <option value="Delivered">Delivered</option> */}
          </select>
        </>
      ),
    });
  }
  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }));
  };
  const updateOrderWarehouse = (a, b) => {
    dispatch(updateAOrderWarehouse({ id: a, warehouse: b }));
  };
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
