import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductCategory = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const createProductCategory = async (pc) => {
  const response = await axios.post(`${base_url}category/`, pc, config);

  return response.data;
};

const productCategoryService = { getProductCategory, createProductCategory };
export default productCategoryService;
