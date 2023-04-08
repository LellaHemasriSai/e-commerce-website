import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
// const getUserfromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const initialState = {
  user: "",
  // orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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

// export const getOrder = createAsyncThunk(
//   "order/get-orders",
//   async (thunkAPI) => {
//     try {
//       return await authService.getOrder();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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
      });
    // .addCase(getOrder.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getOrder.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.orders = action.payload;
    //   state.message = "success";
    // })
    // .addCase(getOrder.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.isSuccess = false;
    //   state.message = action.error;
    // });
  },
});

export default authSlice.reducer;
