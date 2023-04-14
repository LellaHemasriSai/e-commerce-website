import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  getProductCategories,
  deleteAProductCategory,
  resetState,
} from "../features/productCategory/productCategorySlice";
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

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, []);
  const productCategorystate = useSelector(
    (state) => state.productCategory.productCategory
  );
  // console.log(state);
  const data1 = [];
  for (let i = 0; i < productCategorystate.length; i++) {
    data1.push({
      key: i + 1,
      title: productCategorystate[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${productCategorystate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productCategorystate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoryList;
