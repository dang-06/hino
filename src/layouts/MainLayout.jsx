import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navbar, Breadcrumbs, Sidebar } from "../components";

import { fetchBusinessType, fetchPartnerType, fetchProduct, fetchVehicleType, fetchVehicleBrand, fetchVehicleBrandModel, fetchVehicleFleet, fetchDLTVehicleType, fetchDLTBodyType, fetchVendorBusinessType, fetchCorporateType, fetchDealer, fetchPartner } from "../features/masterDatas/masterDataService";
import { updateMasterDataFieldValue } from "../features/masterDatas/masterDatasSlice";


const MainLayout = () => {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const sideBar = React.useMemo(() => <Sidebar sidebarOpen={sidebarOpen} />, [sidebarOpen]);

    const updateSideBarState = () => {
        let state = sidebarOpen
        console.log(sidebarOpen)
        setSidebarOpen(!state)
    }

    

    useEffect(() => {
        // dispatch(fetchProduct());
        // dispatch(fetchPartnerType())
        // dispatch(fetchVendorBusinessType())
        // dispatch(fetchBusinessType())
        // dispatch(fetchCorporateType())
        // dispatch(fetchVehicleType());
        // dispatch(fetchVehicleBrand());
        // dispatch(fetchVehicleBrandModel());
        // dispatch(fetchVehicleFleet());
        // dispatch(fetchDLTVehicleType());
        // dispatch(fetchDLTBodyType());
        // dispatch(fetchDealer());
        // dispatch(fetchPartner());
        // dispatch(fetchLocation());
        // dispatch(updateMasterDataFieldValue({field: 'vehicleType', value: [
        //     {
        //       "id": 1323,
        //       "value": ""
        //     },
        //     {
        //       "id": 1365,
        //       "value": ""
        //     },
        //     {
        //       "id": 1377,
        //       "value": "10 ล้อ"
        //     },
        //     {
        //       "id": 1348,
        //       "value": "10 ล้อ"
        //     },
        //     {
        //       "id": 1392,
        //       "value": "10 ล้อกระบะคอก"
        //     },
        //     {
        //       "id": 1362,
        //       "value": "10 ล้อกระบะคอก"
        //     },
        //     {
        //       "id": 1382,
        //       "value": "10 ล้อตู้เย็น"
        //     },
        //     {
        //       "id": 1355,
        //       "value": "10 ล้อตู้เย็น"
        //     },
        //     {
        //       "id": 1341,
        //       "value": "10 ล้อตู้แห้ง"
        //     },
        //     {
        //       "id": 1359,
        //       "value": "10 ล้อพ่วงดั๊ม"
        //     },
        //     {
        //       "id": 1389,
        //       "value": "10 ล้อพ่วงตู้แห้ง"
        //     },
        //     {
        //       "id": 1387,
        //       "value": "10 ล้อพ่วงพื้นเรียบ"
        //     },
        //     {
        //       "id": 1354,
        //       "value": "10 ล้อพื้นเรียบ"
        //     },
        //     {
        //       "id": 1339,
        //       "value": "12 ล้อหางพ่วง"
        //     },
        //     {
        //       "id": 1378,
        //       "value": "18 ล้อ"
        //     },
        //     {
        //       "id": 1350,
        //       "value": "18 ล้อ"
        //     },
        //     {
        //       "id": 1388,
        //       "value": "18 ล้อหัวลาก"
        //     },
        //     {
        //       "id": 1353,
        //       "value": "18 ล้อหัวลาก"
        //     },
        //     {
        //       "id": 1337,
        //       "value": "22 ล้อ"
        //     },
        //     {
        //       "id": 1379,
        //       "value": "22 ล้อ"
        //     },
        //     {
        //       "id": 1336,
        //       "value": "22 ล้อ20 พาเลท"
        //     },
        //     {
        //       "id": 1363,
        //       "value": "22 ล้อหัวลาก"
        //     },
        //     {
        //       "id": 1386,
        //       "value": "22 ล้อหัวลาก"
        //     },
        //     {
        //       "id": 1335,
        //       "value": "22 ล้อหัวลาก มี GEN SET NGV"
        //     },
        //     {
        //       "id": 1380,
        //       "value": "2 ล้อ"
        //     },
        //     {
        //       "id": 1331,
        //       "value": "2 ล้อ"
        //     },
        //     {
        //       "id": 1368,
        //       "value": "4 WE"
        //     },
        //     {
        //       "id": 1356,
        //       "value": "4 WE"
        //     },
        //     {
        //       "id": 1366,
        //       "value": "4 ล้อ"
        //     },
        //     {
        //       "id": 1328,
        //       "value": "4 ล้อ"
        //     },
        //     {
        //       "id": 1369,
        //       "value": "4 ล้อกระบะคอก"
        //     },
        //     {
        //       "id": 1357,
        //       "value": "4 ล้อกระบะคอก"
        //     },
        //     {
        //       "id": 1327,
        //       "value": "4 ล้อกระบะคอก NGV"
        //     },
        //     {
        //       "id": 1333,
        //       "value": "4 ล้อตู้เย็น 1.6 ม."
        //     },
        //     {
        //       "id": 1375,
        //       "value": "4 ล้อตู้เย็น 1.6 ม."
        //     },
        //     {
        //       "id": 1391,
        //       "value": "4 ล้อตู้เย็น 1.9 ม."
        //     },
        //     {
        //       "id": 1384,
        //       "value": "4 ล้อตู้เย็นจัมโบ้"
        //     },
        //     {
        //       "id": 1346,
        //       "value": "4 ล้อตู้เย็นจัมโบ้"
        //     },
        //     {
        //       "id": 1325,
        //       "value": "4 ล้อตู้แห้งคาร์โก้บ็อกซ์"
        //     },
        //     {
        //       "id": 1376,
        //       "value": "4 ล้อตู้แห้งคาร์โก้บ็อกซ์"
        //     },
        //     {
        //       "id": 1345,
        //       "value": "4 ล้อตู้แห้งจัมโบ้"
        //     },
        //     {
        //       "id": 1374,
        //       "value": "4 ล้อตู้แห้งจัมโบ้"
        //     },
        //     {
        //       "id": 1364,
        //       "value": "4 ล้อตู้แห้งจัมโบ้ EV"
        //     },
        //     {
        //       "id": 1373,
        //       "value": "4 ล้อตู้แห้งอะลูมิเนียม"
        //     },
        //     {
        //       "id": 1344,
        //       "value": "4 ล้อตู้แห้งอะลูมิเนียม"
        //     },
        //     {
        //       "id": 1360,
        //       "value": "4 ล้อตู้แห้งอะลูมิเนียม CNG"
        //     },
        //     {
        //       "id": 1330,
        //       "value": "6 ล้อ"
        //     },
        //     {
        //       "id": 1367,
        //       "value": "6 ล้อ"
        //     },
        //     {
        //       "id": 1381,
        //       "value": "6 ล้อตู้เย็น 4.0 ม."
        //     },
        //     {
        //       "id": 1351,
        //       "value": "6 ล้อตู้เย็น 4.0 ม."
        //     },
        //     {
        //       "id": 1343,
        //       "value": "6 ล้อตู้เย็น 5.0 ม."
        //     },
        //     {
        //       "id": 1370,
        //       "value": "6 ล้อตู้เย็น 5.0 ม."
        //     },
        //     {
        //       "id": 1395,
        //       "value": "6 ล้อตู้เย็น 5.5 ม."
        //     },
        //     {
        //       "id": 1385,
        //       "value": "6 ล้อตู้เย็น 6.0 ม."
        //     },
        //     {
        //       "id": 1334,
        //       "value": "6 ล้อตู้เย็น 6.4 ม."
        //     },
        //     {
        //       "id": 1394,
        //       "value": "6 ล้อตู้เย็น 7.0 ม."
        //     },
        //     {
        //       "id": 1349,
        //       "value": "6 ล้อตู้เย็น 7.2 ม."
        //     },
        //     {
        //       "id": 1371,
        //       "value": "6 ล้อตู้เย็น 7.2 ม."
        //     },
        //     {
        //       "id": 1372,
        //       "value": "6 ล้อตู้แห้ง5.5 ม."
        //     },
        //     {
        //       "id": 1347,
        //       "value": "6 ล้อตู้แห้ง5.5 ม."
        //     },
        //     {
        //       "id": 1361,
        //       "value": "6 ล้อตู้แห้ง 6.5 ม. CNG"
        //     },
        //     {
        //       "id": 1358,
        //       "value": "6 ล้อตู้แห้ง7.2 ม."
        //     },
        //     {
        //       "id": 1352,
        //       "value": "6 ล้อตู้แห้ง 7.2 ม. NGV"
        //     },
        //     {
        //       "id": 1390,
        //       "value": "6 ล้อตู้แห้ง 7.2 ม. NGV"
        //     },
        //     {
        //       "id": 1342,
        //       "value": "6 ล้อตู้แห้ง 7.5 ม. CNG"
        //     },
        //     {
        //       "id": 1393,
        //       "value": "6 ล้อตู้แห้ง 7.8 ม."
        //     },
        //     {
        //       "id": 1340,
        //       "value": "6 ล้อพ่วงตู้แห้ง"
        //     },
        //     {
        //       "id": 1329,
        //       "value": "8 ล้อ"
        //     },
        //     {
        //       "id": 1383,
        //       "value": "8 ล้อ"
        //     },
        //     {
        //       "id": 1326,
        //       "value": "type"
        //     },
        //     {
        //       "id": 7,
        //       "value": "Vehicle Type 1"
        //     },
        //     {
        //       "id": 11,
        //       "value": "Vehicle Type 10"
        //     },
        //     {
        //       "id": 1287,
        //       "value": "Vehicle Type 11"
        //     },
        //     {
        //       "id": 1305,
        //       "value": "Vehicle Type 14"
        //     },
        //     {
        //       "id": 1299,
        //       "value": "Vehicle Type 15"
        //     },
        //     {
        //       "id": 1321,
        //       "value": "Vehicle Type 16"
        //     },
        //     {
        //       "id": 9,
        //       "value": "Vehicle Type 2"
        //     },
        //     {
        //       "id": 1300,
        //       "value": "Vehicle Type 20"
        //     },
        //     {
        //       "id": 1301,
        //       "value": "Vehicle Type 21"
        //     },
        //     {
        //       "id": 1306,
        //       "value": "Vehicle Type 22"
        //     },
        //     {
        //       "id": 1303,
        //       "value": "Vehicle Type 27"
        //     },
        //     {
        //       "id": 10,
        //       "value": "Vehicle Type 3"
        //     },
        //     {
        //       "id": 15,
        //       "value": "Vehicle Type 30"
        //     },
        //     {
        //       "id": 1318,
        //       "value": "Vehicle Type 32"
        //     },
        //     {
        //       "id": 1322,
        //       "value": "Vehicle Type 37"
        //     },
        //     {
        //       "id": 1296,
        //       "value": "Vehicle Type 4"
        //     },
        //     {
        //       "id": 1295,
        //       "value": "Vehicle Type 5"
        //     },
        //     {
        //       "id": 17,
        //       "value": "Vehicle Type 6"
        //     },
        //     {
        //       "id": 14,
        //       "value": "Vehicle Type 62"
        //     },
        //     {
        //       "id": 1304,
        //       "value": "Vehicle Type 65"
        //     },
        //     {
        //       "id": 1298,
        //       "value": "Vehicle Type 7"
        //     },
        //     {
        //       "id": 1319,
        //       "value": "Vehicle Type 73"
        //     },
        //     {
        //       "id": 1332,
        //       "value": "Vehicle Type 77"
        //     },
        //     {
        //       "id": 12,
        //       "value": "Vehicle Type 79"
        //     },
        //     {
        //       "id": 1297,
        //       "value": "Vehicle Type 8"
        //     },
        //     {
        //       "id": 13,
        //       "value": "Vehicle Type 80"
        //     },
        //     {
        //       "id": 3,
        //       "value": "Vehicle Type 82"
        //     },
        //     {
        //       "id": 1302,
        //       "value": "Vehicle Type 85"
        //     },
        //     {
        //       "id": 1320,
        //       "value": "Vehicle Type 86"
        //     },
        //     {
        //       "id": 16,
        //       "value": "Vehicle Type 87"
        //     },
        //     {
        //       "id": 8,
        //       "value": "Vehicle Type 9"
        //     },
        //     {
        //       "id": 23,
        //       "value": "<ไม่ระบุ>"
        //     },
        //     {
        //       "id": 24,
        //       "value": "รถเครน"
        //     },
        //     {
        //       "id": 1338,
        //       "value": "รถจักรยานยนต์"
        //     },
        //     {
        //       "id": 18,
        //       "value": "รถบรรทุก 10 ล้อ"
        //     },
        //     {
        //       "id": 19,
        //       "value": "รถบรรทุก 10 ล้อ (โม่)"
        //     },
        //     {
        //       "id": 20,
        //       "value": "รถบรรทุก 10 ล้อ หัวลาก"
        //     },
        //     {
        //       "id": 26,
        //       "value": "รถบรรทุก 4 ล้อ"
        //     },
        //     {
        //       "id": 21,
        //       "value": "รถบรรทุก 6 ล้อ"
        //     },
        //     {
        //       "id": 22,
        //       "value": "รถบรรทุก 8 ล้อ"
        //     },
        //     {
        //       "id": 25,
        //       "value": "รถยนต์ส่วนบุคคล(กระบะ)"
        //     }
        //   ]}))
    }, [dispatch]);

    return (
        <div className="bg-0 transition overflow-hidden">
            <header className="fixed top-0 left-0 w-full z-20 bg-white">
                <Navbar sidebarOpen={sidebarOpen} toggleSidebar={updateSideBarState} />
                <div className={`${sidebarOpen ? "w-[230px]" : "w-[64px]"} top-[56px] pb-[65px] bottom-0 p-2 bg-white fixed left-0 h-full border-r overflow-x-hidden overflow-y-auto duration-[300ms] transition-all`}>
                    {sideBar}
                </div>
                {/* <Breadcrumbs sidebarOpen={sidebarOpen}/> */}
            </header>

            <main className={`${sidebarOpen ? "ml-[230px]" : "ml-[64px]"} duration-[300ms] transition-all pt-[56px] min-h-screen`}>
                <Outlet />
            </main>

            {/* <Footer /> */}
            {/* <footer>
                <div className="bg-white p-2">
                    <p>bcxvxc vcxv c</p>
                </div>
            </footer> */}
        </div>
    );
};

export default MainLayout;
