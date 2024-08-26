import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  selectedDay: null,
  tableSetting: {
   
    
  },
  filter: {
    searchField: { id: 'all', label: "All" },
    searchValue: '',
    searchProperty: {
        '0': { id: 'all', label: "All" },
        'users_status': { id: 8, key: 'users_status', label: 'Status.', isNested: true, children: [
            {name: 'active', id: 'active', checked: true, value: 'active', label: 'Active'},
            {name: 'locked', id: 'locked', checked: true, value: 'locked', label: 'Locked'},
            {name: 'blocked', id: 'blocked', checked: true, value: 'blocked', label: 'Blocked'},
            {name: 'expired', id: 'expired', checked: true, value: 'expired', label: 'Expired'},
        ] },
        'username': { id: 1, key: "username", label: 'UserName', isNested: false, children: [] },
        'display_name': { id: 2, key: 'display_name', label: 'Display Name', isNested: false, children: [] },
        'working_for': { id: 4, key: 'working_for', label: 'Working for', isNested: false, children: [] },
        'user_email': { id: 4, key: 'user_email', label: 'Email', isNested: false, children: [] },
        'user_phone': { id: 5, key: 'user_phone', label: 'Phone No.', isNested: false, children: [] },
        'platform': { id: 3, key: 'platform', label: 'Working for', isNested: true, children: [
            {name: 'iov_onelink', id: 'iov_onelink', checked: true, value: 'iov_onelink', label: 'iOV Onelink'},
            {name: 'hino_connect', id: 'hino_connect', checked: true, value: 'hino_connect', label: 'Hino Connect'},
            {name: 'scgl', id: 'scgl', checked: true, value: 'scgl', label: 'Scgl'},
            {name: 'dutchmill', id: 'dutchmill', checked: true, value: 'dutchmill', label: 'Dutchmill'},
            {name: 'yanmar', id: 'yanmar', checked: true, value: 'yanmar', label: 'Yanmar'},
        ] },
        'role': { id: 6, key: 'role', label: 'Position', isNested: true, children: [
            {name: 'administrator', id: 'administrator', checked: true, value: 'administrator', label: 'Administrator'},
            {name: 'dealer_admin', id: 'dealer_admin', checked: true, value: 'dealer_admin', label: 'Dealer Admin'},
            {name: 'user', id: 'user', checked: true, value: 'user', label: 'User'},
        ] },
        'register_date': { id: 7, key: 'register_date', label: 'Register Date.', isNested: false, children: [] },
        'last_access': { id: 9, key: 'last_access', label: 'Last access', isNested: false, children: [] },
    }
  },
  status: '',
  isLoading: false,
  isFetching: false,
  isError: false,
  errorMessage: ''
};

const device = createSlice({
  name: "device",
  initialState,
  reducers: {
    addDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    updateFilter: (state, action) => {
        state.filter = action.payload
    },
    updateFilterFieldUser: (state, action) => {
        state.filter.searchField = action.payload
    },
    updateFilterValueUser: (state, action) => {
        state.filter.searchValue = action.payload
    },
    updateFilterPropertyUser: (state, action) => {
        const {field, value} = action.payload
        state.filter.searchProperty[field] = value
    },
    updateValue: (state, action) => {
        let field = action.payload.field
        let value = action.payload.value
        state[field] = value
    }
  },
});

export const { addDay, updateFilter, updateValue, updateFilterFieldDevice, updateFilterValueDevice, updateFilterPropertyDevice} = device.actions;
export default device.reducer;
