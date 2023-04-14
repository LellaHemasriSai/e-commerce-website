import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

const initialState = {
  productCategory: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProductCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await productCategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "productCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await productCategoryService.createProductCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductCategory = createAsyncThunk(
  "productCategory/get-product-category",
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.getProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAProductCategory = createAsyncThunk(
  "productCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await productCategoryService.updateProductCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProductCategory = createAsyncThunk(
  "productCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.deleteProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("RevertAll");

export const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategory = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
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
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productCategorySlice.reducer;
