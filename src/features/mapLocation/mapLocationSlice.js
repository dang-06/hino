import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const fetchLocation = createAsyncThunk(
  "mapLocation/fetchLocations",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.fetchSiteLocation({rowsPerPage: 1000, page: 0});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

const initialState = {
  listSiteLocation: [],
  selectedLocation: null,
  status: "idle", // idle || loading || successed || failed
  error: null,
};


export const mapLocationSlice = createSlice({
  name: "mapLocation",
  initialState,
  reducers: {
    setListLocation: (state, action) => {
        const value = action.payload
        state.listSiteLocation = [...value]
    },
    setSelectedLocation: (state, action) => {
        console.log(action)
        const value = action.payload
        state.selectedLocation = {...value}
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLocation.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchLocation.fulfilled, (state, action) => {
      state.status = "successed";
      state.listSiteLocation = action.payload?.content;
    })
    .addCase(fetchLocation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});
export const { setListLocation, setSelectedLocation } = mapLocationSlice.actions;
export default mapLocationSlice.reducer;
