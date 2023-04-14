import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/customInput";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/productCategory/productCategorySlice";
import { Select } from "antd";
import { getColors } from "../features/color/colorSlice";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { uploadImage, deleteImage } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import { createProducts, resetState } from "../features/product/productSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  quantity: yup.number().required("Quantity is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, []);
  const brandstate = useSelector((state) => state.brand.brands);
  const colorstate = useSelector((state) => state.color.color);
  const categorystate = useSelector(
    (state) => state.productCategory.productCategory
  );
  const imagestate = useSelector((state) => state.upload.images);
  const newproduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newproduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!!");
    }
    if (isError) {
      toast.error("Something went wrong!!");
    }
  }, [isSuccess, isError, isLoading]);
  const coloroptions = [];
  colorstate.forEach((i) => {
    coloroptions.push({ label: i.title, value: i._id });
  });
  const img = [];
  imagestate.forEach((i) => {
    img.push({ public_id: i.public_id, url: i.url });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      color: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const handlecolors = (e) => {
    setColor(e);
    console.log(color);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          action=""
          className="d-flex gap-3 flex-column"
          onSubmit={formik.handleSubmit}
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            val={formik.values.title}
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error ">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            val={formik.values.price}
            onCh={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
          />
          <div className="error ">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            className="form-control py-3 "
            id=""
          >
            <option value="">Select Brand</option>
            {brandstate.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error ">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            className="form-control py-3 "
            id=""
          >
            <option value="">Select Category</option>
            {categorystate.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error ">
            {formik.touched.category && formik.errors.category}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handlecolors(i)}
            options={coloroptions}
          />
          <div className="error ">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            val={formik.values.quantity}
            onCh={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
          />
          <div className="error ">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag n drop files or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imagestate?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImage(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
