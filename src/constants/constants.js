export const ROLES = {
  Admin: "ROLE_ADMIN",
  Company: "ROLE_COMPANY",
  Carrier: "ROLE_CARRIER",
  Driver: "ROLE_DRIVER",
};

export const shipmentStatus = [
    {id: 1, value: 'Planning', color: '#999999'},
    {id: 2, value: 'Waiting Driver Accept', color: '#EF4444'},
    {id: 3, value: 'Not started', color: '#5f6368'},
    {id: 4, value: 'Started', color: '#187BD1'},
    {id: 5, value: 'On delivery', color: '#F59E0B'},
    {id: 6, value: 'Delivery completed', color: '#00B11F'},
    {id: 7, value: 'Closed', color: '#00B11F'},
]

export const shipmentStatusObject = {1: 'Planning', 2: 'Waiting Driver Accept', 3: 'Not started', 4: 'Started', 5: 'On delivery', 6: 'Delivery completed', 7: 'Closed'}

export const deliveryOrderStatus2 = [
    {id: 1, value: "Not Started", color: "#999999"},
    // {id: 2, value: "Checkin start", color: ""},
    {id: 3, value: "Checkin finish", color: "#603fab"},
    // {id: 4, value: "Loading start", color: ""},
    {id: 5, value: "Loading finish", color: "#34c68e"},
    // {id: 6, value: "Loading complete start", color: ""},
    {id: 7, value: "Loading complete finish", color: "#cbae0f"},
    {id: 8, value: "Delivery finish", color: "#33cb0f"},
    {id: 9, value: "Delivery Reject", color: "#f20b0b"},
]
export const deliveryOrderStatus = [
    {id: 1, value: "Not Started", color: ""},
    {id: 2, value: "Checkin start", color: ""},
    {id: 3, value: "Checkin finish", color: ""},
    {id: 4, value: "Loading start", color: ""},
    {id: 5, value: "Loading finish", color: ""},
    {id: 6, value: "Loading complete start", color: ""},
    {id: 7, value: "Loading complete finish", color: ""},
    {id: 8, value: "Delivery finish", color: ""},
    {id: 9, value: "Delivery Reject", color: ""},
]

export const deliveryOrderStatusObject = {
    1: 'Not Started',
    // 2: 'Checkin start',
    3: 'Checkin finish',
    // 4: 'Loading start',
    5: 'Loading finish',
    // 6: 'Loading complete start',
    7: 'Loading complete finish',
    8: 'Delivery finish',
    9: 'Delivery Reject',
}
export const deliveryOrderStatusObject2 = {
    1: 'Not Started',
    // 2: 'Checkin start',
    3: 'Checkin finish',
    // 4: 'Loading start',
    5: 'Loading finish',
    // 6: 'Loading complete start',
    7: 'Loading complete finish',
    8: 'Delivery finish',
    9: 'Delivery Reject',
}

export const reportTypes = [
    {id: 1, value: 'Report Staff'},
    {id: 2, value: 'Report Expense'},
]

export const listStaffType = [
    {id: '', value: "All"},
    {id: 'ซัพพายเออร์', value: 'ซัพพายเออร์'}, // supplier
    {id: 'พนักงานรถร่วมบริการ', value: 'พนักงานรถร่วมบริการ'}, // co-business truck and staffs
    {id: 'รถบริษัท', value: 'รถบริษัท'}, // company’s trucks Or owner trucks
]
export const listStaffPosition = [
    {id: '', value: "All"},
    {id: 'เด็กรถ', value: 'เด็กรถ'}, // 
    {id: 'พนักงานขับรถ', value: 'พนักงานขับรถ'}, // Tài xế phụ
    {id: 'พนักงานยกสินค้า', value: 'พนักงานยกสินค้า'}, // nhân viên bốc hàng
]

export const expenseTypes = [
    {id: 1, value: "Fuel"},
    {id: 2, value: "Toll Fee"},
    {id: 3, value: "traffic fines"},
    {id: 4, value: "Rental"},
]

export const expenseTypesObject = { 1: "Fuel", 2: "Toll Fee", 3: "traffic fines", 4: "Rental" }

