import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const baseURLF = 'https://api-mobile.hino-connect.vn/iov-app-api/v1/';

const axiosInstance = axios.create({
  baseURL,
});
const axiosInstance1 = axios.create({
  baseURL: baseURLF,
});

axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const token = localStorage.getItem("token");
    const formattedToken = token?.replace(/^"(.*)"$/, '$1'); 
    req.headers.Authorization = 'Bearer ' + formattedToken;
  }
  return req;
});

// AUTH
export const login = (formData) => axiosInstance.post("/auth/login", formData);
export const verifyUserHino = (data) => axiosInstance.post("/api/auth/hino/verify-user", data, { timeout: 1200000 });

//Installation
export const fetchInstallationDetail = (id) => axiosInstance.get("job/"+id);
export const fetchJob = (param) => axiosInstance.get("job/search?"+param);
export const fetchTechnician = () => axiosInstance.get("user/technicians");

// SALE ORDER
export const fetchSaleOrderDetail = (id) => axiosInstance.get("/api/sale-order/detail/" + id);

//SIM
export const fetchSim = (data) => axiosInstance.post("/api/device_installation/device-installation", data);
export const importSim = (data, options) => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");
  const formattedToken = token?.replace(/^"(.*)"$/, '$1');
  
  return axiosInstance1.post(`/device_installation/upload-excel`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${formattedToken}`
    },
    ...options
  });
};

//VEHICLE
export const fetchVehicles = () => axiosInstance1.get("/vehicle/vehicles", {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')}`
  }
});

export const importVehicle = (data, options) => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");
  const formattedToken = token?.replace(/^"(.*)"$/, '$1');
  
  return axiosInstance1.post(`/vehicle/import-vehicles`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${formattedToken}`
    },
    ...options
  });
};

// DRIVER
export const fetchDrivers = (data) => axiosInstance.post("/api/drivers/list", data);
export const fetchDriverDetail = (id) => axiosInstance.get("/api/drivers/detail/" + id);
export const addDriver = (data) => axiosInstance.post("/api/drivers/add", data);
export const deleteDriver = (id) => axiosInstance.delete(`/api/drivers/delete/${id}`);

// USER
export const fetchUsers = (userData) => axiosInstance.post("/api/user/list", userData);

// JOB
export const fetchJobs = (data) => axiosInstance.post("/api/job/list", data);
export const getJobDetail = (id) => axiosInstance.get(`api/job/detail/${id}`);
export const addJob = (data) => axiosInstance.post("/api/job/create", data);
export const assignDriver = (data) => axiosInstance.post("/api/job/rtt/assign-driver", data);
export const reAssignDriver = (data) => axiosInstance.post("/api/job/re-assign", data);
export const exportWaybill = (jobId) => axiosInstance.get(`/api/job/waybill/${jobId}/pdf`, {
  responseType: "blob",
});
export const getListJobTruckByDate = (data, cancelToken) => axiosInstance.post("/api/job/list/by-date", data, cancelToken);
export const getListJobUnassignedByDate = (data, cancelToken) => axiosInstance.post("/api/job/list/unassigned", data, cancelToken);

// TRUCK
export const fetchTrucks = (data) => axiosInstance.post("/api/truck/list", data);
export const fetchTruckDetail = (id) => axiosInstance.get(`/api/truck/detail/${id}`);
export const addTruck = (data) => axiosInstance.post("/api/truck/add", data);
export const deleteTruck = async (id) => axiosInstance.delete(`/api/truck/delete/${id}`);
export const assignDriverToTruck = (data) => axiosInstance.post("/api/drivers/mapping/truck", data);


export const fetchTruckDetail1 = (data) => axiosInstance1.post("/fleet/report/get_data_by_license_plate_list", data);

// GET LOCATION BY PLATE
export const getLocationByPlate = (data) => axios.get('http://3.1.175.195:4003/prod/fleet/report/get_realtime_by_license_plate', { params: data });

// COMPANY
export const fetchCompanys = async () => {
  try {
    const { data } = await axiosInstance.post("/api/company/list", {
      status: 0,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDriversByGroupId = (groupId) =>
  axiosInstance.post(`/api/area/driver-truck/${groupId}`, {});

// CARRIERS
export const fetchCarriers = (data) => axiosInstance.post("/api/user/list", data);
export const addCarrier = (data) => axiosInstance.post("/api/user/add", data);
export const assignTruck = (data) => axiosInstance.post("/api/company/user/group/assign", data);
export const assignMultiJob = (data) => axiosInstance.post("/api/job/list/assign", data);
export const getProfile = (url) => axiosInstance.get(url);
export const updateProfile = (url, data) => axiosInstance.post(url, data);
export const suggestCustomer = (name) => axiosInstance.get(`/api/customer/suggest/${name}`);
export const suggestSalesOrder = (name) => axiosInstance.get(`/api/sales-order/suggest/${name}`);
export const getDetailSalesOrder = (id) => axiosInstance.get(`/api/sales-order/detail/${id}`);
export const getJobsBySalesOrderId = (id) => axiosInstance.get(`/api/job/sales-order/${id}`);
export const getDriversAndTruckByJob = (jobId) => axiosInstance.get(`/api/job/driver-truck/${jobId}`);
export const searchCustomer = (data) => axiosInstance.post("/api/customer/list", data);
export const searchFleet = (name) => axiosInstance.get(`/api/device/group/list/${name}`);
export const getTruckDevice = (data) => axiosInstance.post("/api/device/truck/list", data);
export const getLocationsByJobId = (jobId) => axiosInstance.get(`/api/job/location/${jobId}`);
export const getTrucksTracking = (url, data) => axiosInstance.post(url, data);
export const getDriversTracking = (url, data) => axiosInstance.post(url, data);
export const getRatingByJob = (jobId) => axiosInstance.get(`/api/carrier/rating/job/${jobId}`);
export const viewReportJob = (data) => axiosInstance.post("/api/job/statistic", data);
export const exportJob = (data) => axiosInstance.post("/api/job/statistic/export", data, {
  responseType: "blob",
});
export const exportJob1 = (data) => axiosInstance.post("/api/report/shipment", data, {
  responseType: "blob",
});
export const getDetailTrackingTruck = (truckId) => axiosInstance.get(`/api/carrier/tracking/truck/${truckId}`);
export const getDetailTrackingTruckJob = (truckId, data) => axiosInstance.post(`/api/carrier/tracking/truck/${truckId}/jobs`, data);
export const getDetailTrackingDriver = (driverId) => axiosInstance.get(`/api/carrier/tracking/driver/${driverId}`);

// FLEET
export const fetchFleets = (data) => axiosInstance.post("/api/group/list", data);
export const fetchSiteLocation = (data) => axiosInstance.post("/api/rtt/id-site/list", data);
export const addFleet = (data) => axiosInstance.post("/api/company/group/add", data);
export const importCustomer = (data) => axiosInstance.post("/api/customer/import", data);

// UPLOAD
export const uploadImage = (data) => axiosInstance.post("/api/file/upload", data, {
  headers: {
    "Content-Type": "multi-part/form-data",
  },
});

export const downloadImage = (fileName) => axiosInstance.get(`/api/file/download/${fileName}`, { responseType: "blob" });

// MASTER DATA
export const fetchVehicleType = (data) => axiosInstance.post(`dropdown/vehicle/type`, data);
export const fetchVehicleBrand = (data) => axiosInstance.post(`dropdown/vehicle/brand`, data);
export const fetchVehicleBrandModel = (data) => axiosInstance.post(`dropdown/vehicle/brand/model`, data);
export const fetchVehicleFleet = (data) => axiosInstance.post(`dropdown/vehicle/fleet`, data);
export const fetchVehicle = (data) => axiosInstance.post(`dropdown/vehicle`, data);
export const fetchVehicleFleetPartner = (id, data) => axiosInstance.post(`dropdown/vehicle/fleet/${id}`, data);
export const fetchPartner = (data) => axiosInstance.post(`dropdown/partner`, data);
export const fetchPartnerType = (data) => axiosInstance.post(`dropdown/partner/type`, data);
export const fetchProduct = (data) => axiosInstance.post(`dropdown/product`, data);
export const fetchDealer = (data) => axiosInstance.post(`dropdown/dealer`, data);
export const fetchDevice = (data) => axiosInstance.post(`dropdown/device`, data);
export const fetchDeviceModel = (data) => axiosInstance.post(`dropdown/device/model`, data);
export const fetchDLTBodyType = (data) => axiosInstance.post(`dropdown/dlt/body/type`, data);
export const fetchDLTBranch = (data) => axiosInstance.post(`dropdown/dlt/branch`, data);
export const fetchDLTVehicleType = (data) => axiosInstance.post(`dropdown/dlt/vehicle/type`, data);
export const fetchDLTProvince = (data) => axiosInstance.post(`dropdown/dlt/province`, data);
export const fetchSubscriberStatus = (data) => axiosInstance.post(`dropdown/subscriber/status`, data);
export const fetchBusinessType = (data) => axiosInstance.post(`dropdown/business/type`, data);
export const fetchCorporateType = (data) => axiosInstance.post(`dropdown/corporate/type`, data);
export const fetchVendorBusinessType = (data) => axiosInstance.post(`dropdown/vendor/business/type`, data);


// IMPORT
export const createMultiJobs = (data) => axiosInstance.post(`/api/job/list/create`, data);
export const uploadExcelJob = (data, options) => axiosInstance.post(`/api/job/rtt/import`, data, options);
export const uploadExcelDO = (data, options) => axiosInstance.post(`/api/rtt/delivery-order/import`, data, options);
export const publishJob = (data) => axiosInstance.post(`/api/job/rtt/publishJobList`, data);
export const importJob = (data) => axiosInstance.post(`job/import`, data);
//dashboard
export const dashboardDeliveryOrder = () => axiosInstance.post(`/api/dashboard/delivery-order`)
export const dashboardJobWeek = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role == "ROLE_CARRIER") {
    try {
      const { data } = await axiosInstance.get(
        "/api/carrier/dashboard-job-week",
        {}
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  if (user.role == "ROLE_COMPANY") {
    try {
      const { data } = await axiosInstance.get(
        "/api/company/dashboard-job-week",
        {}
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const vDashboard = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role == "ROLE_CARRIER") {
    try {
      const data = await axiosInstance.get("/api/carrier/dashboard", {});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  if (user.role == "ROLE_COMPANY") {
    try {
      const data = await axiosInstance.get("/api/company/dashboard", {});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const dashBoardJobCompany = (data) => axiosInstance.post(`/api/company/dashboard-job`, data);

export const dashBoardJobCarrier = (data) => axiosInstance.post(`/api/carrier/dashboard-job`, data);

// PUBLIC
export const fetchJobDetail = (id) => axiosInstance.get(`/api/public/job/detail/${id}`);
export const getOtpResetPassword = (username) => axiosInstance.get(`/api/auth/verify-user/${username}`);
export const resetPassword = (data) => axiosInstance.post(`/api/auth/reset-password`, data);
export const forgotPassword = (data) => axiosInstance.post(`/forgot`, data);

export const fetchProvinces = () => axiosInstance.get("/api/general/provinces");
export const fetchDistricts = (data) => axiosInstance.post("/api/general/provinces/districts", data);

export const fetchAreas = async (data) => {
  try {
    const response = await axiosInstance.post("/api/area/list", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteArea = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/area/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editArea = (areaId, data) => axiosInstance.patch(`/api/area/${areaId}/edit`, data);


// SHIPMENT
export const fetchShipmentDetail = (id) => axiosInstance.get(`/api/shipment/detail/${id}`);
export const updateExpenseShipment = (data) => axiosInstance.post(`/api/shipment/${data.shipmentId}/update-expense`, data.data)

//
export const fetchSender = (data) => axiosInstance.post('/api/rtt/id-sender/list', data)
export const fetchIdPickup = (data) => axiosInstance.post('/api/rtt/id-pickup/list', data)
export const fetchIdCompany = (data) => axiosInstance.post('/api/rtt/id-company/list', data)
export const fetchDocumentType = (data) => axiosInstance.post('/api/rtt/document-type/list', data)
export const fetchDeliveryType = (data) => axiosInstance.post('/api/rtt/delivery-type/list', data)

//
export const fetchVehicleDetail = (id) => axiosInstance.get('/vehicle/' + id)
export const fetchCustomer = (params = '') => axiosInstance.get(`/customer${params}`)

// User
export const changePass = (data) => axiosInstance.put(`/user/change-password/${data.id}`, {new_password: data.newPassword})
