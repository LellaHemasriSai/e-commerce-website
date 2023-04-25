import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
// get all coupons
const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);
  return response.data;
};
// create a coupon
const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);
  return response.data;
};
// update a coupon
const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );
  return response.data;
};
// get a single coupon
const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);
  return response.data;
};
// delete a coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
};
export default couponService;
