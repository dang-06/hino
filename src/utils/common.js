import decode from "jwt-decode";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { forEach, get, isEmpty } from 'lodash'

import { useEffect, useCallback } from 'react';
import fileDefault from '/images/file-blank-solid-240.png';
import fileCSS from '/images/file-css-solid-240.png';
import filePdf from '/images/file-pdf-solid-240.png';
import filePng from '/images/file-png-solid-240.png';
import fileExcel from '/images/file-excel-solid-240.jpg';
import moment from "moment";

export function useDebounce(effect, dependencies, delay) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}


export const formatMoney = (value) => {
  let val = (value / 1).toFixed(0).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function groupBy(arr, prop) {
  const map = new Map(Array.from(arr, obj => [obj[prop], []]));
  arr.forEach(obj => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
}

export function getWeek(week = 0, date) {
  let currentDate = null;

  if (date) {
    currentDate = dayjs(date);
  } else {
    currentDate = dayjs();
  }

  const weekStart = currentDate.add(week, "weeks").startOf("week");

  var days = [];
  for (var i = 0; i <= 6; i++) {
    days.push(dayjs(weekStart).add(i, "days").toDate());
  }
  return days;
}

export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const user_token = JSON.parse(localStorage.getItem("token"));
  const token = (user && user_token) ? user_token : null;

//   if (!token) {
//     return false;
//   }
  /// fix tạm thời cho token
  return true
  const decodedToken = decode(token);

  if (decodedToken.exp * 1000 < new Date().getTime()) {
    localStorage.clear();
    return false;
  }

  return true;
};

export function momentDate(striDate, format = 'DD/MM/YYYY HH:mm:ss', nameTimeZone = 'Asia/Bangkok', lang = 'en') {
  if (striDate === '' || striDate === null || striDate === '-') {
    return '-'
  }
  if (typeof striDate === 'number') {
    if (striDate.toString().length === 10 || striDate.toString().includes('.')) {
      striDate = striDate * 1000
    }
  }
  return moment.utc(striDate).tz(nameTimeZone).lang(lang).format(format)
  // return moment.utc(striDate).tz(nameTimeZone).format('DD/MM/YYYY HH:mm:ss ZZ')
}

export function mappingDataToArray(data, language) {
  // console.log(">> mappingDataToArray : ", data)
  let result = []
  data.forEach(item => {
      let { driver_cards, driver_info, fleet, gps, info } = item
      let { card_id, name, status_swipe_card } = driver_cards
      // let { driver_code, driver_name, phone } = driver_info
      let { driver_code, driver_name, phone } = get(item, 'driver_info', { driver_code: "", driver_name: "", phone: "" })
      let { fleet_id, fleet_name } = fleet
      let { gpsdate, lat, lng, location, sleep_mode, speed } = gps
      let { location_name, admin_level3_name, admin_level2_name, admin_level1_name,
          admin_level3_name_en, admin_level2_name_en, admin_level1_name_en } = location

      // let { location_name, admin_level3_name, admin_level2_name, admin_level1_name,
      //     admin_level3_name_en, admin_level2_name_en, admin_level1_name_en } = get(item, 'location', {
      //         location_name: "", admin_level3_name: "", admin_level2_name: "", admin_level1_name: "",
      //         admin_level3_name_en: "", admin_level2_name_en: "", admin_level1_name_en: ""
      //     })

      let { course, status } = gps.image
      let { cust_name, licenseplate, vehicle_name, vehicle_type_id, vid, vin_no } = info
      let status_name = getStatusVehicle(status)[`name${language.toUpperCase(language)}`]

      let gpsdateFormat = gpsdate === "1900-01-01 00:00:00" ? null : momentDate(gpsdate)
      if (isEmpty(gpsdateFormat)) gpsdateFormat = ""

      let vehicle_label = vehicle_name
      if (vehicle_label == "") vehicle_label = licenseplate
      if (vehicle_label == "") vehicle_label = vin_no

      result.push([
          vid,
          vehicle_name,
          vin_no,
          licenseplate,
          cust_name,
          lat,
          lng,
          speed,
          status,
          course,
          gpsdateFormat,
          driver_name,
          location_name,
          admin_level3_name,
          admin_level2_name,
          admin_level1_name,
          admin_level3_name_en,
          admin_level2_name_en,
          admin_level1_name_en,
          vehicle_type_id,
          sleep_mode,
          fleet_id,
          fleet_name,
          card_id,
          name,
          status_swipe_card,
          status_name,
          vehicle_label
      ])
  })

  return result
}

export const getStatusVehicle = (status = 'Ign. OFF', speed) => {
    // const arr = [
    //   { code: '#ADADB2', name: 'realtime_4' },
    //   { code: '#5DE648', name: 'realtime_1' },
    //   { code: '#ff3b30', name: 'realtime_2' },
    //   { code: '#FFE600', name: 'realtime_3' },
    //   { code: '#ADADB2', name: 'realtime_4' },
    //   { code: '#5856d6', name: 'realtime_5' }
    // ]
    const color = {
        'Ign. OFF': '#5856d6',
        'Idling': '#ADADB2',
        'Driving': speed < 20 ? '#FFE600' : (speed > 80 ? '#ff3b30' : '#5DE648'),
        'Over speed': '#ff3b30'
    }
    return color[status]
}

export const convertDocumentType = (type) => {
    switch(type){
        case 10: 
            return 'Normal document' //General shipping document orders
        case 20: 
            return 'Product receipt document' //Order of goods receipt documents (used in the case of receiving goods from other agencies)
        case 30: 
            return 'Recovery document' //Document orders for good collection and waste collection
        case 40: 
            return 'Electronic document' //Order via E-mail / Line /Demo
        default: 
            return '-'

    }
}


const calculationOrderValueObj = {
    1: {
        id: 1,
        name_th: 'กล่อง',
        name_en: 'Box'
    },
    2:  {
        id: 2,
        name_th: 'น้ำหนัก',
        name_en: 'Weight'
    },
    3: {
        id: 3,
        name_th: 'ลิตร',
        name_en: 'Liter'
    },
    4: {
        id: 4,
        name_th: 'ปริมาตร',
        name_en: 'Volume'
    },
    5: {
        id: 5,
        name_th: 'จุดส่ง',
        name_en: 'Drop off point'
    },
    6: {
        id: 6,
        name_th: 'เป้าหมาย',
        name_en: 'Target'
    },
    7: {
        id: 7,
        name_th: 'ระยะทาง',
        name_en: 'Distance'
    },
}
const calculationOrderValue = [
    {
        id: 1,
        name_th: 'กล่อง',
        name_en: 'box'
    },
    {
        id: 2,
        name_th: 'น้ำหนัก',
        name_en: 'weight'
    },
    {
        id: 3,
        name_th: 'ลิตร',
        name_en: 'liter'
    },
    {
        id: 4,
        name_th: 'ปริมาตร',
        name_en: 'volume'
    },
    {
        id: 5,
        name_th: 'จุดส่ง',
        name_en: 'Drop off point'
    },
    {
        id: 6,
        name_th: 'เป้าหมาย',
        name_en: 'target'
    },
    {
        id: 7,
        name_th: 'ระยะทาง',
        name_en: 'distance'
    },
]

export const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    css: fileCSS,
    xlsx: fileExcel
}

export const convertCalculationOrder = (data = '', lang='en') => {
    let list = data.split('|') || []
    let name = 'name_'+lang
    let params = ''
    list.forEach(d => {
        let value = d
        if(calculationOrderValueObj[+d]){
            if(calculationOrderValueObj[+d][name]){
                value = calculationOrderValueObj[+d][name]
            }else{
                value = calculationOrderValueObj[+d]['name_en']
            }
        }
        params += value+' - '
    })
    return params.substring(0, params.length - 3)
}

const typeOfGoodObj = {
    1: {
        name_en: 'Construction',
        name_th: 'วัสดุก่อสร้าง'
    },
    2: {
        name_en: 'Agriculture products',
        name_th: 'สินค้าเกษตร'
    },
    3: {
        name_en: 'Foods and foodstuffs',
        name_th: 'อาหาร และสินค้าบริโภค'
    },
    4: {
        name_en: 'Consumer goods',
        name_th: 'สินค้าอุปโภค/บริโภค'
    },
    5: {
        name_en: 'Furniture',
        name_th: 'เฟอร์นิเจอร์'
    },
    6: {
        name_en: 'Clothes',
        name_th: 'เครื่องนุ่งห่ม'
    },
    7: {
        name_en: 'Electronic devices',
        name_th: 'อุปกรณ์อีเลคโทนิค'
    },
    8: {
        name_en: 'Machinery',
        name_th: 'เครื่องจักร'
    },
    9: {
        name_en: 'Fertilizer',
        name_th: 'ปุ๋ย'
    },
    10: {
        name_en: 'Chemical products',
        name_th: 'ผลิตภัณฑ์เคมี'
    },
    11: {
        name_en: 'Liquid goods',
        name_th: 'ของเหลว'
    },
    12: {
        name_en: 'Oil / gas',
        name_th: 'น้ำมัน/ ก๊าซ'
    },
    13: {
        name_en: 'Wood',
        name_th: 'ไม้'
    },
    14: {
        name_en: 'Pharmaceutical products',
        name_th: 'ผลิตภัณฑ์ยา'
    },
    15: {
        name_en: 'Refrigerated products',
        name_th: 'Refrigerated products'
    },
    16: {
        name_en: 'Other',
        name_th: 'อื่น ๆ'
    },
    17: {
        name_en: 'Beverage',
        name_th: 'เครื่องดื่ม'
    },
    18: {
        name_en: 'Dried foods',
        name_th: 'อาหารแห้ง'
    },
    19: {
        name_en: 'Frozen foods',
        name_th: 'สินค้าแช่แข็ง'
    },
    20: {
        name_en: 'Appliances',
        name_th: 'เครื่องใช้ไฟฟ้า'
    },
    21: {
        name_en: 'Agrochemical',
        name_th: 'เคมีภัณฑ์ทางด้านการเกษตร'
    },
    22: {
        name_en: 'Vehicles',
        name_th: 'ยานพาหนะ'
    },
    23: {
        name_en: 'Steel',
        name_th: 'เหล็ก'
    },
    24: {
        name_en: 'Fresh foods',
        name_th: 'อาหารสด'
    },
    25: {
        name_en: 'Industrial products',
        name_th: 'สินค้าอุตสาหกรรม'
    },
}

export const convertTypeOfGood = (type = '', lang = 'en') => {
    let list = type.split('|') || []
    let name = 'name_'+lang
    let params = ''
    list.forEach(d => {
        let value = d
        if(typeOfGoodObj[+d]){
            if(typeOfGoodObj[+d][name]){
                value = typeOfGoodObj[+d][name]
            }else{
                value = typeOfGoodObj[+d]['name_en']
            }
        }
        params += value+' - '
    })
    return params.substring(0, params.length - 3)
    // let find = typeOfGoodObj[type]
    // if(find){
    //     let name = 'name_'+lang
    //     if(find[name]){
    //         return find[name]
    //     }
    //     return find['name_en']
    // }
    // return type
}

export const mapValueFromList = (list, key, mapValue, returnField) => {
    if(list.length > 0){
        let find = list.find(item => item[key] == mapValue)
        if(find){
            return find[returnField] ? find[returnField] : mapValue
        }
        return mapValue
    }
    return '-'
}

export const getStatusColor = (status) => {
    let color = ''
    let text = ''
    switch(status){
        case -1: 
            // color = 'bg-primary-100'
            text = 'Not Started'
            break
        case 1: 
            // color = 'bg-primary-100'
            text = 'To Do'
            break
        case 2: 
            // color = 'bg-primary-100'
            text = 'Check-in start'
            break
        case 3: 
            // color = 'bg-primary-100'
            text = 'Check-in finish'
            break
        case 4: 
            // color = 'bg-primary-100'
            text = 'Loading start'
            break
        case 5: 
            // color = 'bg-primary-100'
            text = 'Loading finish'
            break
        case 6: 
            // color = 'bg-primary-100'
            text = 'Loading complete start'
            break
        case 7: 
            // color = 'bg-primary-100'
            text = 'Loading complete finish'
            break
        case 8:
            // color = 'bg-[#00b11f]'
            text = 'Delivery finish'
            break;
       
        case 9: 
            // color= 'bg-red-100';
            text = 'Delivery Reject'
            break;
        case 10: 
            // color= 'bg-red-100';
            text = 'Moved'
            break;
        case 11: 
            // color= 'bg-red-100';
            text = 'Close Bill'
            break;
        case 12: 
            // color= 'bg-red-100';
            text = 'Approved Bill'
            break;
        case 13: 
            color= 'bg-red-500 text-white';
            text = 'Rejected'
            break;
        case 14: 
            // color= '';
            text = 'Reject'
            break;
        default: 
            break
    }
    return {color, text}
}

export const getTextDeliveryType = (deliveryType) => {
    let text = ''
    switch(deliveryType){
        case 1000: 
            text = 'ใช้จำนวน กล่อง ปริมาตร น้ำหนัก รวมในระบบ จัดงาน'
            break
        case 1010: 
            text = 'ใช้ผลิตภัณฑ์ กล่อง ปริมาตร น้ำหนัก รวมในระบบ จัดงาน'
            break
        case 2000: 
            text = 'ใช้ผลรวม ระยะทาง'
            break
        default: 
            break
    }
    return {text}
}

export const getTextDeliveryType2 = (deliveryType_2) => {
    let text = ''
    switch(deliveryType_2){
        case 1000: 
            text = 'ใช้จำนวน กล่อง ปริมาตร น้ำหนัก รวมในระบบ จัดงาน'
            break
        case 1010: 
            text = 'ใช้ผลิตภัณฑ์ กล่อง ปริมาตร น้ำหนัก รวมในระบบ จัดงาน'
            break
        case 2000: 
            text = 'ใช้ผลรวม ระยะทาง'
            break
        default: 
            break
    }
    return {text}
}


// const getPlanStatus = (plan) => {
//     if (plan && plan.id) {
//         let dueDate = dayjs(plan.dueDate)
//         if (plan.status == 9) {
//             return (
//                 <div className="flex gap-2 items-center text-[#cc0b0b]">
//                     <TbCalendarX className="w-5 h-5" />
//                     <span>Delivery Reject</span>
//                 </div>
//             )
//         }
//         if (dayjs().isBefore(dueDate)) {
//             if (plan.status == 8) {
//                 return (
//                     <div className="flex gap-2 items-center text-[#00b11f]">
//                         <TbCalendarCheck className="w-5 h-5" />
//                         <span>Arrived on time</span>
//                     </div>
//                 )
//             }
//         } else {
//             if (plan.status == 8) {
//                 return (
//                     <div className="flex gap-2 items-center text-[#5f6368]">
//                         <TbCalendarStats className="w-5 h-5" />
//                         <span>Not on time</span>
//                     </div>
//                 )
//             } else if (plan.status < 7) {
//                 return (
//                     <div className="flex gap-2 items-center text-[#c3ad00]">
//                         <TbCalendarExclamation className="w-5 h-5" />
//                         <span>Expected to be late</span>
//                     </div>
//                 )
//             } else if (plan.status == 7) {
//                 return (
//                     <div className="flex gap-2 items-center text-[#cc0b0b]">
//                         <TbCalendarExclamation className="w-5 h-5" />
//                         <span>Arrived late</span>
//                     </div>
//                 )
//             }
//         }

//     }
//     return '-'
// }

