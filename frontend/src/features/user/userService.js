import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};
const sellerregister = async (sellerData) => {
  const response = await axios.post(`${base_url}seller/register`, sellerData);
  if (response.data) {
    localStorage.setItem("seller", JSON.stringify(response.data));
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};
const addBank = async (bank) => {
  // console.log(bank);
  const response = await axios.put(
    `${base_url}user/add-bank`,
    {
      bank,
    },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  // console.log(response.data);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};

const removeProductCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const updateProductCart = async (cartDetail) => {
  const response = await axios.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderDetail,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, config);
  if (response.data) {
    return response.data;
  }
};
const getBanks = async () => {
  const response = await axios.get(`${base_url}user/bank`, config);
  return response.data;
};
const UpdateBankAmount = async (bankamount) => {
  const response = await axios.put(
    `${base_url}user/bank-amount`,
    { bankamount },
    config
  );
  return response.data;
};
const UpdateOrder = async (orderData) => {
  const response = await axios.put(
    `${base_url}user/update-order`,
    { orderData },
    config
  );
  return response.data;
};
export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductCart,
  updateProductCart,
  createOrder,
  getUserOrders,
  sellerregister,
  addBank,
  getBanks,
  UpdateBankAmount,
  UpdateOrder,
};
