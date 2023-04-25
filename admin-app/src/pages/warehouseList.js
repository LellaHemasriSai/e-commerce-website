import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAWarehouse,
  getWarehouses,
  resetState,
} from "../features/warehouse/warehouseSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/customModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const WarehouseList = () => {
  const [open, setOpen] = useState(false);
  const [warehouseId, setwarehouseId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setwarehouseId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getWarehouses());
  }, []);
  const warehousestate = useSelector((state) => state.warehouse.warehouses);
  // console.log(state);
  const data1 = [];
  for (let i = 0; i < warehousestate.length; i++) {
    data1.push({
      key: i + 1,
      title: warehousestate[i].title,
      action: (
        <>
          <Link
            to={`/admin/warehouse/${warehousestate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(warehousestate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteWarehouse = (e) => {
    dispatch(deleteAWarehouse(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getWarehouses());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Warehouses</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteWarehouse(warehouseId);
        }}
        title="Are you sure you want to delete this warehouse?"
      />
    </div>
  );
};

export default WarehouseList;
