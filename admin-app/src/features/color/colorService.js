import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
// get all colors
const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data;
};
// create a color
const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);
  return response.data;
};
// update a color
const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title },
    config
  );
  return response.data;
};
// get single color
const getColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, config);
  return response.data;
};
// delete a color
const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data;
};

const colorService = {
  getColors,
  createColor,
  getColor,
  updateColor,
  deleteColor,
};
export default colorService;
