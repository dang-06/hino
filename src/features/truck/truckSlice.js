import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  listTruck: [],
  trucksByGroup: [],
  status: "idle", // idle || loading || successed || failed
  error: null,
  selected: null,
  position: []
};


const truckSlice = createSlice({
    name: 'trucks',
    initialState,
    reducers: {
        selectTruck: (state, action) => {
            const value = action.payload
            if(state?.selected?.truckId != value.truckId){
                state.position = []
            }
            state.selected = action.payload
        },
        reFetchListTruck:(state, action) => {
            const value = action.payload
            state.listTruck = [...value]
        },
        updateTruckPosition: (state, action) => {
            const value = action.payload
            state.position.push(value)
        }
    }
})
// const { actions, reducer } = truckSlice;
export const { selectTruck, updateTruckPosition } = truckSlice.actions;
export default truckSlice.reducer;
