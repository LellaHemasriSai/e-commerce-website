import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteAProduct,
  resetState,
  updateQuantity,
} from "../features/product/productSlice";
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
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Sold",
    dataIndex: "sold",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productstate = useSelector((state) => state.product.products);
  const orderstate = useSelector((state) => state?.auth?.orders);
  const [productquantity, setproductquantity] = useState({
    quantity: "",
    sold: "",
    prodId: "",
  });
  let quantity1, sold1, prodId1;
  for (let index3 = 0; index3 < productstate?.length; index3++) {
    for (let index = 0; index < orderstate?.length; index++) {
      for (
        let index2 = 0;
        index2 < orderstate[index]?.orderItems?.length;
        index2++
      ) {
        if (
          orderstate[index]?.orderstatus === "Delivered" &&
          orderstate[index]?.warehouse === "Warehouse5" &&
          orderstate[index]?.orderItems[index2]?.product ===
            productstate[index3]?._id
        ) {
          console.log("hi");
          let q = productstate[index3]?.quantity;
          quantity1 = q - orderstate[index]?.orderItems[index2]?.quantity;
          prodId1 = productstate[index3]._id;
          sold1 =
            productstate[index3]?.sold +
            orderstate[index]?.orderItems[index2]?.quantity;
        }
      }
    }
  }

  useEffect(() => {
    setproductquantity({
      quantity: quantity1,
      sold: sold1,
      prodId: prodId1,
    });
    if (productquantity.quantity !== "") {
      console.log(productquantity.quantity);
      dispatch(updateQuantity(productquantity));
    }
  }, []);
  // console.log(state);
  const data1 = [];
  for (let i = 0; i < productstate?.length; i++) {
    data1.push({
      key: i + 1,
      title: productstate[i]?.title,
      brand: productstate[i]?.brand,
      category: productstate[i]?.category,
      color: productstate[i]?.color,
      price: productstate[i]?.price,
      quantity: productstate[i]?.quantity,
      sold: productstate[i]?.sold,
      action: (
        <>
          <Link
            to={`/admin/product/${productstate[i]?._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productstate[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductList;
