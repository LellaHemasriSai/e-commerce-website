import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrder = async () => {
  // console.log(getTokenfromLocalStorage.token);
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};
const getOrderById = async (id) => {
  const response = await axios.get(`${base_url}user/getorder/${id}`, config);
  return response.data;
};
const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getmonthwiseorderincome`,
    config
  );
  return response.data;
};
const getYearlyStats = async () => {
  const response = await axios.get(
    `${base_url}user/getyearlytotalorders`,
    config
  );
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateorderstatus/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};
const updateOrderWarehouse = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateorderwarehouse/${data.id}`,
    { warehouse: data.warehouse },
    config
  );
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
const addBank = async (bank) => {
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
const getBanks = async () => {
  const response = await axios.get(`${base_url}user/bank`, config);
  return response.data;
};

const updateBank = async (bank) => {
  const response = await axios.put(
    `${base_url}user/update-bank/${bank.id}`,
    { title: bank.bankData.title, amount: bank.bankData.amount },
    config
  );
  return response.data;
};
const getBank = async (id) => {
  const response = await axios.get(`${base_url}user/bank/${id}`, config);
  return response.data;
};

const deleteBank = async (id) => {
  const response = await axios.delete(
    `${base_url}user/delete-bank/${id}`,
    config
  );
  return response.data;
};
const authService = {
  getOrder,
  login,
  getOrderById,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
  updateOrderWarehouse,
  UpdateBankAmount,
  addBank,
  getBanks,
  getBank,
  updateBank,
  deleteBank,
};
export default authService;
