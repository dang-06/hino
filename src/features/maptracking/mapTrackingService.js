import * as api from "../../api";


const fetchDetailVehicle = async (plate, callFrom) => {
    const response = await api.fetchTruckDetail1([plate]);
  
    return {information: response.data, callFrom};
  };
  
  const mapTrackingService = {
    fetchDetailVehicle,
  };
  
  export default mapTrackingService;
  