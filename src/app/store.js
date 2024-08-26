import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/auth/authSlice";
import vehicleReducer from "../features/vehicle/vehicleSlice";
import usersReducer from "../features/users/usersSlice";
import deviceReducer from "../features/device/deviceSlice";
import companyReducer from "../features/company/companySlice";
import dealerReducer from "../features/dealer/dealerSlice";
import commonReducer from "../features/common/commonSlice";
import driversReducer from "../features/drivers/driversSlice";
import masterDatasReducer from "../features/masterDatas/masterDatasSlice";
import { apiSlice } from "../services/apiSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import createMigrate from "redux-persist/es/createMigrate";


const migrations = {
    0: (state) => {
      // migration clear out device state
      return {
        ...state,
        masterDatas: undefined   
      }
    },
    // 1: (state) => {
    //   // migration to keep only device state
    //   return {
    //     masterDatas: state.masterDatas
    //   }
    // }
}
  
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    // migrate: createMigrate(migrations, { debug: false }),
    blackList: [
        'masterDatas'
    ]
}

const rootReducer = combineReducers({ 
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    common: commonReducer,
    vehicle: vehicleReducer,
    users: usersReducer,
    device: deviceReducer,
    company: companyReducer,
    dealer: dealerReducer,
    masterDatas: masterDatasReducer,
    // drivers: driversReducer,
    // fleets: fleetsReducer,
    // calendar: calendarReducer,
    // truck: truckReducer,
    // mapTracking: mapTrackingReducer,
    // mapLocation: mapLocationReducer,
    // shipment: shipmentReducer,

  })
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
//   reducer: persistedReducer,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    common: commonReducer,
    vehicle: vehicleReducer,
    users: usersReducer,
    device: deviceReducer,
    company: companyReducer,
    dealer: dealerReducer,
    masterDatas: masterDatasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiSlice.middleware),
});

// setupListeners(store.dispatch);


export const persistor = persistStore(store)
