import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getWarehouses = async () => {
  const response = await axios.get(`${base_url}warehouse/`);
  return response.data;
};

const createWarehouse = async (warehouse) => {
  const response = await axios.post(`${base_url}warehouse/`, warehouse, config);
  return response.data;
};
const updateWarehouse = async (warehouse) => {
  const response = await axios.put(
    `${base_url}warehouse/${warehouse.id}`,
    { title: warehouse.warehouseData.title },
    config
  );
  return response.data;
};

const getWarehouse = async (id) => {
  const response = await axios.get(`${base_url}warehouse/${id}`, config);
  return response.data;
};

const deleteWarehouse = async (id) => {
  const response = await axios.delete(`${base_url}warehouse/${id}`, config);
  return response.data;
};

const warehouseService = {
  getWarehouses,
  createWarehouse,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
export default warehouseService;
