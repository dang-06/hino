import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const defaultParams = {
    "offset": 0,
    "limit": 99999,
    "valueField": "",
    "search": []
}

export const fetchVehicleType = createAsyncThunk(
    "masterDatas/fetchVehicleType",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchVehicleType(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchVehicleBrand = createAsyncThunk(
    "masterDatas/fetchVehicleBrand",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchVehicleBrand(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchVehicleBrandModel = createAsyncThunk(
    "masterDatas/fetchVehicleBrandModel",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchVehicleBrandModel(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchVehicleFleet = createAsyncThunk(
    "masterDatas/fetchVehicleFleet",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchVehicleFleet(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchPartner = createAsyncThunk(
    "masterDatas/fetchPartner",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchPartner(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchPartnerType = createAsyncThunk(
    "masterDatas/fetchPartnerType",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchPartnerType(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchProduct = createAsyncThunk(
    "masterDatas/fetchProduct",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchProduct(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchDealer = createAsyncThunk(
    "masterDatas/fetchDealer",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchDealer(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchDevice = createAsyncThunk(
    "masterDatas/fetchDevice",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchDevice(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchDeviceModel = createAsyncThunk(
    "masterDatas/fetchDeviceModel",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchDeviceModel(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchDLTBodyType = createAsyncThunk(
    "masterDatas/fetchDLTBodyType",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchDLTBodyType(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchDLTProvince = createAsyncThunk(
    "masterDatas/fetchDLTProvince",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchDLTProvince(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchDLTVehicleType = createAsyncThunk(
    "masterDatas/fetchDLTVehicleType",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchDLTVehicleType(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);
export const fetchSubscriberStatus = createAsyncThunk(
    "masterDatas/fetchSubscriberStatus",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchSubscriberStatus(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchBusinessType = createAsyncThunk(
    "masterDatas/fetchBusinessType",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchBusinessType(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchCorporateType = createAsyncThunk(
    "masterDatas/fetchCorporateType",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchCorporateType(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);

export const fetchVendorBusinessType = createAsyncThunk(
    "masterDatas/fetchVendorBusinessType",
    async (type = defaultParams, { rejectWithValue }) => {
        try {
            const response = await api.fetchVendorBusinessType(type);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error);
        }
    }
);


