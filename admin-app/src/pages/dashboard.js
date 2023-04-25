import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getYearlyData,
  updateAmount,
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
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },

  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  const monthstate = useSelector((state) => state?.auth?.monthlyData);
  const yearstate = useSelector((state) => state?.auth?.yearlyData);
  const orderstate = useSelector((state) => state?.auth?.orders);

  const [bankamount, setBankamount] = useState({
    amount: "",
    title: "",
    userId: "",
  });
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  let c = yearstate && yearstate[0]?.count;
  let a = yearstate && yearstate[0]?.amount;
  let amt, amount1, title1, userId1;
  for (let index = 0; index < orderstate?.length; index++) {
    if (
      orderstate[index]?.orderstatus === "Return" &&
      orderstate[index]?.warehouse === "Warehouse1"
    ) {
      c = c - 1;
      a = a - orderstate[index]?.totalPriceAfterDiscount;
    }
  }
  // setBankamount(amount1);
  for (let index = 0; index < orderstate?.length; index++) {
    if (
      orderstate[index]?.orderstatus === "Return" &&
      orderstate[index]?.warehouse === "Warehouse1"
    ) {
      for (
        let index2 = 0;
        index2 < orderstate[index]?.user?.bank.length;
        index2++
      ) {
        if (
          orderstate[index]?.orderItems[0]?.bankId ===
          orderstate[index]?.user?.bank[index2]._id
        ) {
          amt = orderstate[index]?.totalPriceAfterDiscount + 100;
          amount1 = amt + orderstate[index]?.user?.bank[index2]?.amount;
          title1 = orderstate[index]?.user?.bank[index2]?._id;
          userId1 = orderstate[index]?.user?._id;
        }
      }
    }
  }
  // console.log(bankamount);
  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
  }, []);
  useEffect(() => {
    setBankamount({
      amount: parseInt(amount1),
      title: title1,
      userId: userId1,
    });
    dispatch(updateAmount(bankamount));
  }, []);
  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlycount = [];
    for (let index = 0; index < monthstate?.length; index++) {
      const element = monthstate[index];
      if (monthNames[element?._id.month] === undefined) {
        data.push({ type: "March", income: element?.amount });
        monthlycount.push({
          type: "March",
          sales: element?.count,
        });
      } else {
        data.push({
          type: monthNames[element?._id.month],
          income: element?.amount,
        });
        monthlycount.push({
          type: monthNames[element?._id.month],
          sales: element?.count,
        });
      }
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlycount);

    const data1 = [];
    for (let i = 0; i < orderstate?.length; i++) {
      data1.push({
        key: i + 1,
        name: orderstate[i]?.user?.firstname,
        product: orderstate[i]?.orderItems?.length,
        price: orderstate[i]?.totalPrice,
        dprice: orderstate[i]?.totalPriceAfterDiscount,
        status: orderstate[i]?.orderstatus,
      });
      setOrderData(data1);
    }
  }, [orderstate, monthstate, yearstate]);
  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex  justify-content-between align-items-end  flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">{a}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Yearly Total Income</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{c}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Yearly Total Sales</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statistics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statistics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
