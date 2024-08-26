import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shipmentService from "./shipmentService";


export const fetchDetailShipment = createAsyncThunk(
    'shipment/fetchDetailShipment',
    async (shipmentId, thunkAPI) => {
        // console.log(132, plate, callFrom, data)
        try {
            return await shipmentService.fetchDetailShipment(shipmentId);
        } catch (error) {
            let message = "";
            // if (error.response.data.status === 401) {
            //     message = "Username or Password is incorrect"
            // }
            if (error.response.data.status === 500) {
                message = "Cannot connect to server. Please try again later!"
            }
            return thunkAPI.rejectWithValue(message);
        }
    });

const initialState = {
    selectedShipment: null,
    detailShipmentLoading: false,
    selectedShipmentAddDO: null,
    selectedDO: null,
    selectedExpense: null,
    showExpenseForm: false
};

const shipmentSlice = createSlice({
    name: "shipment",
    initialState,
    reducers: {
        setSelectedShipment: (state, action) => {
            state.selectedShipment = action.payload;
        },
        selectedShipmentAddDO: (state, action) => {
            state.selectedShipmentAddDO = action.payload;
        },
        setSelectedDO: (state, action) => {
            state.selectedDO = action.payload;
        },
        setSelectedExpense: (state, action) => {
            state.selectedExpense = action.payload;
        },
        toggleExpenseForm: (state, action) => {
            const value = action.payload
            if(!value){
                state.selectedExpense = null
            }
            state.showExpenseForm = value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailShipment.pending, (state) => {
                return { ...state, detailShipmentLoading: true }
            })
            .addCase(fetchDetailShipment.fulfilled, (state, action) => {
                const value = action.payload
                return {...state, selectedShipment: value}
            })
            .addCase(fetchDetailShipment.rejected, (state) => {

            })
    }
});

export const { 
    setSelectedShipment,
    setSelectedDO,
    setSelectedExpense,
    toggleExpenseForm,
    selectedShipmentAddDO
} = shipmentSlice.actions;

export default shipmentSlice.reducer;
