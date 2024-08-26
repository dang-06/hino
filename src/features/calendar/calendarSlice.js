import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDay: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addDay: (state, action) => {
      state.selectedDay = action.payload;
    },
  },
});

export const { addDay } = calendarSlice.actions;
export default calendarSlice.reducer;
