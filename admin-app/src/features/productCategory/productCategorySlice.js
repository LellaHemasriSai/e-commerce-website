import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

const initialState = {
  productCategory: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProductCategory = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await productCategoryService.getProductCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "category/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await productCategoryService.createProductCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

export const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategory = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProductCategory = action.payload;
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productCategorySlice.reducer;
