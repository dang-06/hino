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
        'vehicle_name': { id: 1, key: "vehicle_name", label: 'Vehicle Name', isNested: false, children: [] },
        'license_plate': { id: 2, key: 'license_plate', label: 'License Plate', isNested: false, children: [] },
        'vehicle_brand': { id: 3, key: 'vehicle_brand', label: 'Brand', isNested: false, children: [] },
        'vehicle_model': { id: 4, key: 'vehicle_model', label: 'Model', isNested: false, children: [] },
        'vehicle_type': { id: 5, key: 'vehicle_type', label: 'Vehicle Type', isNested: false, children: [] },
        'chassis_no': { id: 6, key: 'chassis_no', label: 'Chassis No', isNested: false, children: [] },
        'vin_no': { id: 7, key: 'vin_no', label: 'VIN No.', isNested: false, children: [] },
        'vehicle_status': { id: 8, key: 'vehicle_status', label: 'Status.', isNested: true, children: [
            {name: 'Dealer Stock', id: '31', checked: true, value: '31', label: 'Dealer Stock'},
            {name: 'DIRT Stock', id: '23', checked: true, value: '23', label: 'DIRT Stock'},
            {name: 'Sold', id: '41', checked: true, value: '41', label: 'Sold'},
            {name: 'HTML Stock', id: '22', checked: true, value: '22', label: 'HTML Stock'},
            {name: 'HMST Stock', id: '21', checked: true, value: '21', label: 'HMST Stock'},
        ] },
        'license_date': { id: 9, key: 'license_date', label: 'License Date', isNested: false, children: [] },
        'vehicle_fleet':  { id: 10, key: 'vehicle_fleet', label: 'Fleet', isNested: false, children: [] },
        'customer': { id: 11, key: 'customer', label: 'Customer', isNested: false, children: [] },
        'vehicle_dlt': { id: 12, key: 'vehicle_dlt', label: 'DLT', isNested: false, children: [] },
    }
  },
  status: '',
  isLoading: false,
  isFetching: false,
  isError: false,
  errorMessage: ''
};

const vehicle = createSlice({
  name: "users",
  initialState,
  reducers: {
    addDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    updateFilter: (state, action) => {
        state.filter = action.payload
    },
    updateFilterField: (state, action) => {
        console.log('here')
        state.filter.searchField = action.payload
    },
    updateFilterValue: (state, action) => {
        state.filter.searchValue = action.payload
    },
    updateFilterProperty: (state, action) => {
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

export const { addDay, updateFilter, updateValue, updateFilterField, updateFilterValue, updateFilterProperty} = vehicle.actions;
export default vehicle.reducer;
