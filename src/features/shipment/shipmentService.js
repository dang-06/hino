import * as api from "../../api";


const fetchDetailShipment = async (shipmentId) => {
    const response = await api.fetchShipmentDetail(shipmentId);
  
    return response.data
  };
  
  const shipmentService = {
    fetchDetailShipment,
  };
  
  export default shipmentService;
  