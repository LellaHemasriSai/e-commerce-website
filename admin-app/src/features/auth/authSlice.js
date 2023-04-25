import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

// getting data from local storage
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// admin login
export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// get monthly data
export const getMonthlyData = createAsyncThunk(
  "order/monthlydata",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get yearly data
export const getYearlyData = createAsyncThunk(
  "order/yearlydata",
  async (thunkAPI) => {
    try {
      return await authService.getYearlyStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get all orders
export const getOrder = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get a single order
export const getOrderByUserId = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrderById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//update an order
export const updateAOrder = createAsyncThunk(
  "order/update-order",
  async (data, thunkAPI) => {
    try {
      return await authService.updateOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//update warehouse of order
export const updateAOrderWarehouse = createAsyncThunk(
  "order/update-order-warehouse",
  async (data, thunkAPI) => {
    try {
      return await authService.updateOrderWarehouse(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//update balance in bank account
export const updateAmount = createAsyncThunk(
  "auth/bank-amount",
  async (bankamount, thunkAPI) => {
    try {
      return await authService.UpdateBankAmount(bankamount);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//add bank account
export const addBankAccount = createAsyncThunk(
  "auth/addbank",
  async (userData, thunkAPI) => {
    try {
      return await authService.addBank(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get all banks
export const getBanks = createAsyncThunk("auth/get-banks", async (thunkAPI) => {
  try {
    return await authService.getBanks();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
//get a single bank
export const getABank = createAsyncThunk(
  "auth/get-bank",
  async (id, thunkAPI) => {
    try {
      return await authService.getBank(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// update a bank account
export const updateABank = createAsyncThunk(
  "auth/update-bank",
  async (bank, thunkAPI) => {
    // console.log(bank);
    try {
      return await authService.updateBank(bank);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// delete a bank account
export const deleteABank = createAsyncThunk(
  "auth/delete-bank",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteBank(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOrderByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleorder = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getMonthlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getYearlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(getYearlyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(updateAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAOrderWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAOrderWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(updateAOrderWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBankAmount = action.payload;
      })
      .addCase(updateAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addBankAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBankAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bankaccount = action.payload;

        if (state.isSuccess === true) {
          toast.info("Bank Account Added Successfully");
        }
      })
      .addCase(addBankAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBanks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bank = action.payload;
      })
      .addCase(getBanks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bankName = action.payload.title;
      })
      .addCase(getABank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBank = action.payload;
      })
      .addCase(updateABank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBank = action.payload;
      })
      .addCase(deleteABank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
