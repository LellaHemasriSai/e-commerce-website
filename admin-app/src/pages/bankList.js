import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/customModal";
import { getBanks, resetState, deleteABank } from "../features/auth/authSlice";

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
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BankList = () => {
  const [open, setOpen] = useState(false);
  const [bankId, setbankId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbankId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBanks());
  }, []);
  const bankstate = useSelector((state) => state?.auth?.bank);
  // console.log(bankstate);
  const data1 = [];
  for (let i = 0; i < bankstate?.length; i++) {
    data1.push({
      key: i + 1,
      title: bankstate[i]?.title,
      amount: bankstate[i]?.amount,
      action: (
        <>
          <Link
            to={`/admin/bank/${bankstate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bankstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBank = (e) => {
    dispatch(deleteABank(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBanks());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Banks</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBank(bankId);
        }}
        title="Are you sure you want to delete this bank?"
      />
    </div>
  );
};

export default BankList;
