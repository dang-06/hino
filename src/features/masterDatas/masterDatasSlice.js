import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as api from "../../api";
import { fetchBusinessType, fetchCorporateType, fetchDLTBodyType, fetchDLTVehicleType, fetchDealer, fetchPartner, fetchPartnerType, fetchProduct, fetchVehicleBrand, fetchVehicleBrandModel, fetchVehicleFleet, fetchVehicleType, fetchVendorBusinessType } from "./masterDataService";



const initialState = {
    masterDatas: [],
    vehicleType: {
        isUpdated: false,
        data: [],
        obj: {}
    },
    vehicleBrand: {
        isUpdated: false,
        data: [],
        obj: {}
    },
    product: {
        isUpdated: false,
        data: [],
        obj: {}
    },
    vehicleStatus: {
        isUpdated: false,
        data: [
            {
                label: 'Active',
                name: 'active'
            },
            {
                label: 'Wait to Install',
                name: 'wait_to_install'
            },
            {
                label: 'Install',
                name: 'install'
            },
            {
                label: 'Suspense',
                name: 'suspense'
            },
            {
                label: 'Terminate',
                name: 'terminate'
            },
            {
                label: 'Remove',
                name: 'remove'
            },
        ]
    },
    
    vehicleDLT: {
        isUpdated: false,
        data: [
        
            {
                label: 'DLT',
                name: 'dlt'
            },
            {
                label: 'None',
                name: 'none'
            },
            
        ]
    },
    
    vehicleBrandModel:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    vehicleFleet:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    partner:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    partnerType:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    vendorBusinessType:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    businessType:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    corporateType:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    dealer:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    device:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    deviceModel:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    dltBodyType:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    dltBranch:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    dltVehicleType:  {
        isUpdated: false,
        data: []
    },
    dltProvince:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    subscriberStatus:  {
        isUpdated: false,
        data: [],
        obj: {}
    },
    masterDataNew: {
        caculationOrder: [],
        deliveryTypes: [],
        documentTypes: [],
        typeOfCargos: [],
        units: [],
        idPickups: [],
        idtbRttCompanies: [],
    },
    status: "idle", // idle || loading || successed || failed
    error: null,
};


export const masterDatasSlice = createSlice({
    name: "masterDatas",
    initialState,
    reducers: {
        updateMasterDataFieldValue: (state, action) => {
            let field = action.payload.field
            let value = action.payload.value
            state[field] = value
        },
        updateStateOfFilter: (state, action) => {
            const {field, value} = action.payload
            state[field]['isUpdated'] = value
        }
    },
    extraReducers: (builder) => {
        builder
            // Vehicle Type
            .addCase(fetchVehicleType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVehicleType.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.vehicleType.data.length != fetchData.length){
                    state.vehicleType.isUpdated = true
                    state.vehicleType.data = fetchData;
                    state.vehicleType.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});
                }
            })
            .addCase(fetchVehicleType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Vehicle Brand
            .addCase(fetchVehicleBrand.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVehicleBrand.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.vehicleBrand.data.length != fetchData.length){
                    state.vehicleBrand.isUpdated = true
                    state.vehicleBrand.data = action.payload.data;
                    state.vehicleBrand.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchVehicleBrand.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Vehicle Brand Model
            .addCase(fetchVehicleBrandModel.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVehicleBrandModel.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.vehicleBrandModel.data.length != fetchData.length){
                    state.vehicleBrandModel.isUpdated = true
                    state.vehicleBrandModel.data = action.payload.data;
                    state.vehicleBrandModel.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchVehicleBrandModel.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Vehicle Fleet
            .addCase(fetchVehicleFleet.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVehicleFleet.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.vehicleFleet.data.length != fetchData.length){
                    state.vehicleFleet.isUpdated = true
                    state.vehicleFleet.data = action.payload.data;
                    state.vehicleFleet.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchVehicleFleet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // DLT Vehicle  Type
            .addCase(fetchDLTVehicleType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDLTVehicleType.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.dltVehicleType.data.length != fetchData.length){
                    state.dltVehicleType.isUpdated = true
                    state.dltVehicleType.data = action.payload.data;
                    state.dltVehicleType.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchDLTVehicleType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Product
            .addCase(fetchProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.product.data.length != fetchData.length){
                    state.product.isUpdated = true
                    state.product.data = action.payload.data;
                    state.product.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Partner Type
            .addCase(fetchPartnerType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPartnerType.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.partnerType.data.length != fetchData.length){
                    state.partnerType.isUpdated = true
                    state.partnerType.data = action.payload.data;
                    state.partnerType.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchPartnerType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Partner 
            .addCase(fetchPartner.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPartner.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.partner.data.length != fetchData.length){
                    state.partner.isUpdated = true
                    state.partner.data = action.payload.data;
                    state.partner.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchPartner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Business Type
            .addCase(fetchBusinessType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBusinessType.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.businessType.data.length != fetchData.length){
                    state.businessType.isUpdated = true
                    state.businessType.data = action.payload.data;
                    state.businessType.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchBusinessType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Corporate Type
            .addCase(fetchCorporateType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCorporateType.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.corporateType.data.length != fetchData.length){
                    state.corporateType.isUpdated = true
                    state.corporateType.data = action.payload.data;
                    state.corporateType.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchCorporateType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Vendor Business Type
            .addCase(fetchVendorBusinessType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVendorBusinessType.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.vendorBusinessType.data.length != fetchData.length){
                    state.vendorBusinessType.isUpdated = true
                    state.vendorBusinessType.data = action.payload.data;
                    state.vendorBusinessType.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchVendorBusinessType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            //
            // Dealer
            .addCase(fetchDealer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDealer.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.dealer.data.length != fetchData.length){
                    state.dealer.isUpdated = true
                    state.dealer.data = action.payload.data;
                    state.dealer.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchDealer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            //
            .addCase(fetchDLTBodyType.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDLTBodyType.fulfilled, (state, action) => {
                state.status = "success";
                const fetchData =  action.payload.data;
                if(state.dltBodyType.data.length != fetchData.length){
                    state.dltBodyType.isUpdated = true
                    state.dltBodyType.data = action.payload.data;
                    state.dltBodyType.obj = fetchData.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{});

                }
            })
            .addCase(fetchDLTBodyType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { updateMasterDataFieldValue, updateStateOfFilter } = masterDatasSlice.actions;

export default masterDatasSlice.reducer;
