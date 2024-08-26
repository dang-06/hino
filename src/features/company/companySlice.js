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
        'company_name': { id: 8, key: 'company_name', label: 'Company Name', isNested: false, children: [] },
        'customer_code': { id: 1, key: "customer_code", label: 'Customer Code', isNested: false, children: [] },
        'customer_name': { id: 1, key: "customer_name", label: 'Customer Name', isNested: false, children: [] },
        'business_type': { id: 2, key: 'business_type', label: 'Business Type', isNested: false, children: [] },
        'address': { id: 4, key: 'address', label: 'Address', isNested: false, children: [] },
        'phone_no': { id: 4, key: 'phone_no', label: 'Phone No.', isNested: false, children: [] },
        'position': { id: 5, key: 'position', label: 'Position', isNested: false, children: [] },
        'platform': { id: 3, key: 'platform', label: 'Working for', isNested: true, children: [
            {name: 'iov_onelink', id: 'iov_onelink', checked: true, value: 'iov_onelink', label: 'iOV Onelink'},
            {name: 'hino_connect', id: 'hino_connect', checked: true, value: 'hino_connect', label: 'Hino Connect'},
            {name: 'scgl', id: 'scgl', checked: true, value: 'scgl', label: 'Scgl'},
            {name: 'dutchmill', id: 'dutchmill', checked: true, value: 'dutchmill', label: 'Dutchmill'},
            {name: 'yanmar', id: 'yanmar', checked: true, value: 'yanmar', label: 'Yanmar'},
        ] },
        // 'role': { id: 6, key: 'role', label: 'Position', isNested: true, children: [
        //     {name: 'administrator', id: 'administrator', checked: true, value: 'administrator', label: 'Administrator'},
        //     {name: 'dealer_admin', id: 'dealer_admin', checked: true, value: 'dealer_admin', label: 'Dealer Admin'},
        //     {name: 'user', id: 'user', checked: true, value: 'user', label: 'User'},
        // ] },
        // 'register_date': { id: 7, key: 'register_date', label: 'Register Date.', isNested: false, children: [] },
        // 'last_access': { id: 9, key: 'last_access', label: 'Last access', isNested: false, children: [] },
    }
  },
  status: '',
  isLoading: false,
  isFetching: false,
  isError: false,
  errorMessage: ''
};

const company = createSlice({
  name: "company",
  initialState,
  reducers: {
    addDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    updateFilter: (state, action) => {
        state.filter = action.payload
    },
    updateFilterFieldCompany: (state, action) => {
        state.filter.searchField = action.payload
    },
    updateFilterValueCompany: (state, action) => {
        state.filter.searchValue = action.payload
    },
    updateFilterPropertyCompany: (state, action) => {
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

export const { addDay, updateFilter, updateValue, updateFilterFieldCompany, updateFilterValueCompany, updateFilterPropertyCompany} = company.actions;
export default company.reducer;
