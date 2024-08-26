import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as api from "../../api";
import moment from "moment";
import mapTrackingService from "./mapTrackingService";
import { get, isEmpty, isEqual } from "lodash";

export const fetchDetailVehicle = createAsyncThunk(
    'mapTracking/fetchDetailVehicle',
    async (data, thunkAPI) => {
        const { plate, callFrom } = data
        // console.log(132, plate, callFrom, data)
        try {
            return await mapTrackingService.fetchDetailVehicle(plate, callFrom);
        } catch (error) {
            let message = "";
            if (error.response.data.status === 401) {
                message = "Username or Password is incorrect"
            }
            if (error.response.data.status === 500) {
                message = "Cannot connect to server. Please try again later!"
            }
            return thunkAPI.rejectWithValue(message);
        }
    });


const initialState = {
    initialVehiclesData: [],
    information: {},
    vehiclesLoading: true,
    hideOverlayPanel: true,
    hideFooter: true,
    expandFooter: false,
    displayVehicle: null, //list vid
    activeTabDashboard: "0",
    activeTabOverlay: "0",
    lastTime: null,
    stateMapControl: {
        legendEnabled: true,
        clusterEnabled: true,
        objectEnabled: false,
        fitObjectEnabled: false,
        mapType: "roadmap",
        geofencesEnabled: [],
        dashboardEnabled: false,
        licensePlateEnabled: false,
        nameGeofEnabled: false,
        tableInfoEnabled: false,
    },
    geofenceByTypes: [],
    defaultZoom: 5,
    isFitBounds: false,
    isZoomPan: false,
    isFocus: false,
    tailMarker: [],
    defaultCenter: { lat: 13.786377, lng: 100.608755 },
    timeLast: "",
    listVideo: null,
    // listVideo: [],
    // listVideo: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    listSteaming: [],
    isShowModalVideo: false,
    isFirstLoadDashboard: false,
    isFilterInteractiveDashboard: false,
    intervalTime: 10000,
    merkerFocusLocation: { lat: 0, lng: 0 },
    //TABLE VEHICLE INFO
    infoLoading: false,
    intitialLoadTable: true,
    dataVehicleInfo: [],
    dataRealtimeUpdate: [],
    productCode: {},
};

const mapTrackingSlice = createSlice({
    name: "mapTracking",
    initialState,
    reducers: {
        getInitialVehicles: (state, action) => {
            // const value = action.payload
            state.vehiclesLoading = false;
        },
        setInitialVehicles: (state, action) => {
            const value = action.payload;
            state.initialVehiclesData = [...value];
            state.vehiclesLoading = false;
            state.lastTime = moment().format("DD/MM/YYYY HH:mm:ss");
        },
        setInformation: (state, action) => {
            const value = action.payload;
            state.information = value
        },
        getInformationMarker: (state, action) => {
            // console.log(action)
            const value = action.payload;
            state.infoLoading = value.isLoading
            state.merkerFocusLocation = value.location;
            // hideFooter: false,
            // expandFooter: state.hideFooter ? true : !state.expandFooter ? false : true
        },

        setStateReduxRealtime: (state, action) => {
            const value = action.payload;
            if (typeof value.objStateRudux === "object")
                return [...state, action.payload];
            else return state;
        },
        setDisplayVehicle: (state, action) => {
            const value = action.payload;
            state.displayVehicle = value.listVehicles;
            state.isFitBounds = true;
            state.isFilterInteractiveDashboard = value.isFilter;
        },
        setDefaultCenter: (state, action) => {
            const value = action.payload;
            state.defaultCenter = { lat: value.lat, lng: value.lng };
        },
        setTimeLast: (state, action) => {
            const value = action.payload;
            state.timeLast = value.time;
        },
        setFitBounds: (state, action) => {
            const value = action.payload;
            state.isFitBounds = value;
        },
        setFocus: (state, action) => {
            const value = action.payload;
            state.isFocus = value;
        },
        setZoomPan: (state, action) => {
            const value = action.payload;
            state.isZoomPan = value;
        },
        setDefaultReduxRealtimeNew: (state, action) => {
            state = { ...initialState };
        },
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchDetailVehicle.pending, (state) => {
                // state.isLoading = true;
                // state.infoLoading = true
                return { ...state, infoLoading: true }

            })
            .addCase(fetchDetailVehicle.fulfilled, (state, action) => {
                // state.isLoading = false;
                // state.isSuccess = true;
                const { information, callFrom } = action.payload
                let objSetState = { ...information[0]}
                // console.log(current(state))
                if(!isEmpty(objSetState)){
                    objSetState.dataRealtimeUpdate = [
                        {
                            "info": {
                                // "vid": information.info.vid
                                plate: information[0].license_plate
                            },
                            //   "driver_cards": {
                            //     "name": information.driver_cards.name
                            //   },
                            "gps": {
                                "speed": parseInt(information[0].speed),
                                // "gpsdate": information.gps.gpsdate,
                                "image": {
                                    "status": information[0].status
                                }
                            }
                        }
                    ]
                    let lat = Number(information[0].x), lng = Number(information[0].y)
                    objSetState.defaultCenter = { lat, lng }
                    let tailMarker = [...current(state).tailMarker]
                    
                    if (callFrom === 'Marker') {
                        objSetState.isFocus = false
                        // console.log(tailMarker)
                        // console.log(get(current(state), 'information.plateLicence'), information[0].license_plate)
                        if (get(current(state), 'information.plateLicence') !== information[0].license_plate) tailMarker = []
                        if (isEmpty(tailMarker) || (!isEqual(tailMarker[tailMarker.length - 1], { lat, lng }))) tailMarker.push({ lat, lng })
                        // console.log('Marker:', tailMarker)
                        objSetState.tailMarker = tailMarker
                        // objSetState.isShowModalVideo = false
                    }
                    else if (callFrom === 'Mqtt') {
                        if (isEmpty(tailMarker) || !isEqual(tailMarker[tailMarker.length - 1], { lat, lng })) {
                        tailMarker.push({ lat, lng })
                        // console.log('Mqtt:', tailMarker)
                        objSetState.tailMarker = tailMarker
                        }
                    }
                    else {
                        if (get(current(state), 'information.plateLicence') !== information[0].license_plate) tailMarker = []
                        if (isEmpty(tailMarker) || (!isEqual(tailMarker[tailMarker.length - 1], { lat, lng }))) tailMarker.push({ lat, lng })
                        let stateMapControl = JSON.parse(JSON.stringify(current(state).stateMapControl));
                        stateMapControl.fitObjectEnabled = true
                        let infoList = { isZoomPan: true, hideFooter: false, isFocus: true, stateMapControl, tailMarker, isShowModalVideo: false }
                        // console.log('List:', tailMarker)
                        objSetState = { ...objSetState, ...infoList }
                    }
                    objSetState.infoLoading = false
                    let find = current(state).initialVehiclesData.find(i => i.plateLicence == information[0].license_plate)
                    let d = {driveInfo: information[0]}
                    if(find){
                        d = {...find, ...d}
                    }
                    // console.log(tailMarker)
                    return {...state, ...objSetState, information: d, merkerFocusLocation: {lat, lng}}
                }
                // dict
            })
            .addCase(fetchDetailVehicle.rejected, (state, action) => {
                // state.isLoading = false;
                // state.isError = true;
                // state.message = action.payload;
                // state.user = null;
            });
    },
});
// const { actions, reducer } = truckSlice;
export const {
    getInitialVehicles,
    setInitialVehicles,
    setInformation,
    getInformationMarker,
    setStateReduxRealtime,
    setDisplayVehicle,
    setDefaultCenter,
    setTimeLast,
    setDefaultReduxRealtimeNew,
    setFitBounds,
    setFocus,
    setZoomPan,
} = mapTrackingSlice.actions;
export default mapTrackingSlice.reducer;
