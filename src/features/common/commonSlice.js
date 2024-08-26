import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: '',
    totalRecord: 0,
    status: '',
    isLoading: false,
    isFetching: false,
    isError: false,
    errorMessage: ''
};

const common = createSlice({
    name: "common",
    initialState,
    reducers: {
        updateCommonValue: (state, action) => {
            let field = action.payload.field
            let value = action.payload.value
            state[field] = value
        }
    },
});

export const { addDay, updateFilter, updateCommonValue, updateFilterField, updateFilterValue, updateFilterProperty } = common.actions;
export default common.reducer;
