import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getYearlyData } from "../features/auth/authSlice";
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
    title: "Status",
    dataIndex: "staus",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthstate = useSelector((state) => state.auth.monthlyData);
  const yearstate = useSelector((state) => state.auth.yearlyData);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
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
  }, [monthstate]);
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
            <h4 className="mb-0 sub-title">{yearstate[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Yearly Total Income</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{yearstate[0]?.count}</h4>
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
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
