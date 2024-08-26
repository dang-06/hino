import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { IoFilterOutline } from "react-icons/io5";
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PerfectScrollbar from "react-perfect-scrollbar";

import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { dashboardJobWeek, vDashboard, dashBoardJobCompany, dashBoardJobCarrier, dashboardDeliveryOrder } from "../api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import "../themes/styles/home.css";
import { t } from "i18next";
import iconCarrier from "/images/icon/Icon-Carrier.svg";
import iconDriver from "/images/icon/Icon-Driver.svg";
import iconFleets from "/images/icon/Icon-Fleets.svg";
import iconTrucks from "/images/icon/Icon-Trucks.svg";
import { Breadcrumbs } from "../components";
import { HomeIcon } from "@heroicons/react/outline";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import FilterRightBar from "../components/FilterRightBar";
import FormDisplay from "../components/FormDisplay";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { useRef } from "react";
import { useCallback } from "react";
import { useLazyDashboardDeliveryQuery, useLazyDashboardDeliveryOrderQuery, useLazyDashboardDeliveryOrderSiteDCQuery, useLazyDashboardShipmentQuery, useLazyDashboardTotalQuery, useLazyDashboardTruckQuery } from "../services/apiSlice";
import dayjs from "dayjs";
import FilterTimeDashboard from "../components/Dashboard/FilterApprovedShipment";
import LoadingLayout from "../components/Loading";
import { deliveryOrderStatus2, deliveryOrderStatusObject2, shipmentStatus, shipmentStatusObject } from "../constants/constants";
import FilterDashboardTime from "../components/Dashboard/FilterDashboardTime";
import { LiaClipboardListSolid } from "react-icons/lia";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const DashboardNew = () => {
    const [labels, setlabels] = useState();
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [dataChart, setdataChart] = useState();
    const [triggleFiter, setTriggleFiter] = useState(false)
    const [openFilter, setOpenFilter] = useState(false);
    const [dataFilter, setDataFilter] = useState(
        {
            dateFrom: dayjs().subtract(1, 'months'),
            dateTo: dayjs(),
        }
    )
    const [filterShipment, setFilterShipment] = useState({
        dateFrom: dayjs().subtract(1, 'months'),
        dateTo: dayjs(),
    })
    console.log(dataFilter, 'kt datafilter');

    const [filterDeliveryOrder, setFilterDeliveryOrder] = useState({
        dateFrom: dayjs().subtract(1, 'months'),
        dateTo: dayjs(),
    })
    const [filterDOBySite, setFilterDOBySite] = useState({
        dateFrom: dayjs().subtract(1, 'months'),
        dateTo: dayjs(),
    })
    const convertTime = (data) => {
        if (data.dateFrom && data.dateTo) {
            return { dateFrom: dayjs(data.dateFrom).startOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]'), dateTo: dayjs(data.dateTo).endOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]') }
        }
    }

    const [fetchDelivery, { data: dataDeliver }] = useLazyDashboardDeliveryQuery()

    const [fetchDeliveryOrder, { data: dataDO, isFetching: fetchingDeliveryOrder, isSuccess: successDeliveryOrder, isError: errorDeliveryOrder }] = useLazyDashboardDeliveryOrderQuery()
    useEffect(_ => {
        if (dataFilter) {
            const formData = convertTime(dataFilter);
            fetchDeliveryOrder(formData)
            fetchDelivery(formData)
        }
    }, [dataFilter])
    console.log('kt dataDO', dataDO);
    console.log('kt data', dataDeliver);
    return (
        <>
            {/* <Breadcrumbs /> 
             */}
            <div className="bg-white">
                <div className="py-3 border-b px-3 flex justify-between items-center">
                    <div className=" text-[16px] font-light  capitalize">
                        Dashboard
                    </div>
                    <div className="flex items-center">
                        <Button className="mr-2" variant="outlined" size="small" onClick={() => { setOpenFilter(true) }}>Filter</Button>
                        <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    </div>

                </div>
            </div>

            <div className=" flex justify-between">
                <div className=" p-[10px] gap-3 grid-cols-3 grid w-[75%]">
                    <Link className="text-decoration-none">
                        <Card className="bg-white rounded overflow-hidden flex justify-between p-6">
                            <div className="text-[18px] mb-3">
                                <div>
                                    Total DO
                                </div>
                                <Typography variant="h6" className="text-center mt-1">{dataDO?.totalDO || '-'}</Typography>
                            </div>
                            <div className=""> <LiaClipboardListSolid fontSize="4em" /></div>
                        </Card>

                    </Link>
                    <Link className="text-decoration-none">
                        <Card className="bg-white rounded overflow-hidden flex justify-between p-6">
                            <div className="text-[18px] mb-3">
                                <div>
                                    Planed
                                </div>
                                <Typography variant="h6" className="text-center mt-1">{dataDO?.deliveryOrderCountsByStatus['1'] || '-'}</Typography>
                            </div>
                            <div className=""> <LiaClipboardListSolid fontSize="4em" /></div>
                        </Card>
                    </Link>
                    <Link className="text-decoration-none">
                        <Card className="bg-white rounded overflow-hidden flex justify-between p-6">
                            <div className="text-[18px] mb-3">
                                <div>
                                    Canceled
                                </div>
                                <Typography variant="h6" className="text-center mt-1">{dataDO?.deliveryOrderCountsByStatus[''] || '-'}</Typography>
                            </div>
                            <div className=""> <LiaClipboardListSolid fontSize="4em" /></div>
                        </Card>
                    </Link>
                    <Link className="text-decoration-none">
                        <Card className="bg-white rounded overflow-hidden flex justify-between p-6">
                            <div className="text-[18px] mb-3">
                                <div>
                                    In Transit
                                </div>
                                <Typography variant="h6" className="text-center mt-1">{dataDO?.deliveryOrderCountsByStatus['7'] || '-'}</Typography>
                            </div>
                            <div className=""> <LiaClipboardListSolid fontSize="4em" /></div>
                        </Card>
                    </Link>
                    <Link className="text-decoration-none">
                        <Card className="bg-white rounded overflow-hidden flex justify-between p-6">
                            <div className="text-[18px] mb-3">
                                <div>
                                    Rejected
                                </div>
                                <Typography variant="h6" className="text-center mt-1">{dataDO?.deliveryOrderCountsByStatus['9'] || '-'}</Typography>
                            </div>
                            <div className=""> <LiaClipboardListSolid fontSize="4em" /></div>
                        </Card>
                    </Link>
                    <Link className="text-decoration-none">
                        <Card className="bg-white rounded overflow-hidden flex justify-between p-6">
                            <div className="text-[18px] mb-3">
                                <div>
                                    Delivered
                                </div>
                                <Typography variant="h6" className="text-center mt-1">{dataDO?.deliveryOrderCountsByStatus['8'] || '-'}</Typography>
                            </div>
                            <div className=""> <LiaClipboardListSolid fontSize="4em" /></div>
                        </Card>
                    </Link>
                </div>
                <div className="w-[25%] p-[10px] ">
                    <Link className="text-decoration-none">
                        <Card className="h-[100%] text-center">
                            <div className="bg-white p-3 flex flex-col items-center h-1/2 ">
                                <div className="text-[18px] mb-3">Delivery complete</div>
                            </div>
                            <div className="w-[100%] h-[2px] bg-[#ecedf0]"></div>
                            <div className="bg- px-6 py-3 flex flex-col items-center h-1/2 ">
                                <div className="text-[18px] mb-3 flex-grow">Delivered On time</div>
                                <div className="flex  mt-auto justify-around w-full">

                                    <div>
                                        <Typography variant="h6" className="text-center">{dataDeliver?.numberOnTimeDeliveryOrder}</Typography>
                                        <span>On time</span>
                                    </div>
                                    <div className="h-full w-[2px] bg-[#ecedf0] "></div>
                                    <div>
                                        <Typography variant="h6" className="text-center">{dataDeliver?.numberLateDeliveryOrder}</Typography>
                                        <span>Delayed</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                    </Link>
                </div>


            </div>
            <FilterRightBar open={openFilter} setOpen={setOpenFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter}>
                <FilterDashboardTime setFilter={setDataFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter} />
            </FilterRightBar>
        </>
    );
};

export default DashboardNew;
