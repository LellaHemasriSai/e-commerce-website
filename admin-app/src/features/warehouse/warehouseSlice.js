import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import warehouseService from "./warehouseService";

const initialState = {
  warehouses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getWarehouses = createAsyncThunk(
  "warehouse/get-warehouses",
  async (thunkAPI) => {
    try {
      return await warehouseService.getWarehouses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAWarehouse = createAsyncThunk(
  "warehouse/get-warehouse",
  async (id, thunkAPI) => {
    try {
      return await warehouseService.getWarehouse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createWarehouses = createAsyncThunk(
  "warehouse/create-warehouse",
  async (warehouseData, thunkAPI) => {
    try {
      return await warehouseService.createWarehouse(warehouseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAWarehouse = createAsyncThunk(
  "warehouse/update-warehouse",
  async (warehouse, thunkAPI) => {
    try {
      return await warehouseService.updateWarehouse(warehouse);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAWarehouse = createAsyncThunk(
  "warehouse/delete-warehouse",
  async (id, thunkAPI) => {
    try {
      return await warehouseService.deleteWarehouse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const warehouseSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.warehouses = action.payload;
      })
      .addCase(getWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdWarehouse = action.payload;
      })
      .addCase(createWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.warehouseName = action.payload.title;
      })
      .addCase(getAWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedWarehouse = action.payload;
      })
      .addCase(updateAWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedWarehouse = action.payload;
      })
      .addCase(deleteAWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default warehouseSlice.reducer;
