import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  fleets: [],
  status: "idle", // idle || loading || successed || failed
  error: null,
};

export const fetchFleets = createAsyncThunk(
  "fleets/fetchFleets",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.fetchFleets({});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const fleetsSlice = createSlice({
  name: "fleets",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFleets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFleets.fulfilled, (state, action) => {
        state.status = "successed";
        state.fleets = action.payload?.content;
      })
      .addCase(fetchFleets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default fleetsSlice.reducer;
