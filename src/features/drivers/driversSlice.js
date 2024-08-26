import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  drivers: [],
  status: "idle", // idle || loading || successed || failed
  error: null,
};

export const fetchDrivers = createAsyncThunk(
  "drivers/fetchDrivers",
  async (driverData) => {
    try {
      const response = await api.fetchDrivers(driverData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const driversSlice = createSlice({
  name: "drivers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.status = "successed";
        state.drivers = action.payload?.content;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default driversSlice.reducer;
