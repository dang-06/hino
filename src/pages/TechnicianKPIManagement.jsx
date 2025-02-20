import { Button, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { MdEngineering, MdOutlineCheckBox, MdOutlineClose } from "react-icons/md";
import { CgImport } from "react-icons/cg";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { DataGrid } from "@mui/x-data-grid";
import { useGetOverviewQuery, useGetTechnicianKPIQuery } from '../services/apiSlice';
import CustomDateRangePicker from '../components/FormField/CustomDateRangePicker';
import moment from 'moment';


const TechnicianKPIManagement = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [timeUnit, setTimeUnit] = useState("monthly");
    const [value, setValue] = useState("");
    const formatDate = (date) => {
        return date ? moment(date).format("ddd MMM DD YYYY HH:mm:ss [GMT]Z (GMT+07:00)") : "";
      };
    const [fromDate, setFromDate] = useState(formatDate(moment().startOf("month").toDate()));
    const [toDate, setToDate] = useState(formatDate(moment().toDate()));

    console.log(fromDate, toDate)

    const handleTimeUnitChange = (event) => {
        const newTimeUnit = event.target.value;
        setTimeUnit(newTimeUnit);
        setCriterias((prev) => ({
            ...prev,
            type: newTimeUnit,
        }));
    };


    const [criterias, setCriterias] = useState({
        type: 'monthly',
    });

    const [criteriasKPI, setCriteriasKPI] = useState({
        page: 1,
        size: 10,
        search: '',
        from_date: '',
        to_date: ''
    });
    const { data, isLoadingChart, isFetching, isSuccess, error, refetch } = useGetOverviewQuery(criterias);
    const { data: dataKPI, isLoadingChartKPI, isFetchingKPI, isSuccessKPI, errorKPI, refetchKPI } = useGetTechnicianKPIQuery(criteriasKPI);

    useEffect(() => {
        if (fromDate) {
            setCriteriasKPI((prevState) => ({
                ...prevState,
                from_date: moment(fromDate).format("YYYY-MM-DD"),
            }));
        }
        if (toDate) {
            setCriteriasKPI((prevState) => ({
                ...prevState,
                to_date: moment(toDate).format("YYYY-MM-DD"),
            }));
        }
    }, [toDate]);

    useEffect(() => {
        console.log(dataKPI)

    }, [dataKPI]);


    const handleValueChange = (event) => {
        const { name, value } = event.target;

        setCriteriasKPI((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        {
            field: "technician_id",
            headerName: t("id"),
            renderCell: ({ row }) => (
                <div>
                    {row.technician_id}
                </div>
            ),
            minWidth: 50,
        },
        {
            field: "full_name",
            headerName: t("teachicianName"),
            minWidth: 300,
        },
        {
            field: "total_completed",
            headerName: t("completed"),
            minWidth: 150,
        },
        {
            field: "total_finished_instalaltion",
            headerName: t("finishedInstallation"),
            minWidth: 180,
        },
        {
            field: "total_need_update",
            headerName: t("needUpdate"),
            minWidth: 180,
        },
        {
            field: "total_updated",
            headerName: t("updated"),
            minWidth: 150,
        },
    ];

    return (
        <>
            <div className=" flex">
                <div className="h-full min-h-[calc(100vh_-_100px)] lg:mx-auto lg:max-w-full flex-1 transition-all duration-[300ms]">
                    <div className="flex h-full flex-col bg-white shadow-sm">
                        <div className="pl-4 h-[50px] border-b sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {t("TechnicianKPI")}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 106px)' }}>
                        {isLoading ? (
                            <div className="w-full py-4">
                                <LinearProgress className="w-full" />
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="card focus:shadow-2xl w-full border bg-white rounded-lg shadow-md overflow-hidden cursor-pointer p-4">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-semibold">
                                                {t("installationStatusOverview")}
                                            </h3>
                                            <div className="flex flex-end gap-4">
                                                <Select
                                                    value={timeUnit}
                                                    onChange={handleTimeUnitChange}
                                                    variant="outlined"
                                                    sx={{ minWidth: 150 }}
                                                >
                                                    <MenuItem value="all">{t("all")}</MenuItem>
                                                    <MenuItem value="daily">{t("day")}</MenuItem>
                                                    <MenuItem value="weekly">{t("week")}</MenuItem>
                                                    <MenuItem value="monthly">{t("month")}</MenuItem>
                                                </Select>

                                                {/* TextField Input */}
                                                {/* <TextField  
                                                    value={value}
                                                    onChange={handleValueChange}
                                                    label={`${timeUnit}`}
                                                    variant="outlined"
                                                    type="number"
                                                    sx={{ minWidth: 150 }}
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <PieChart
                                                series={[
                                                    {
                                                        arcLabel: (item) => `${item.value}`,
                                                        arcLabelMinAngle: 15,
                                                        arcLabelRadius: '70%',
                                                        data: [
                                                            { id: 0, value: data?.data?.total_new, label: t('NEW') },
                                                            { id: 1, value: data?.data?.total_finished_instalaltion, label: t('FINISHED INSTALLATION') },
                                                            { id: 2, value: data?.data?.total_completed, label: t('COMPLETED') },
                                                            { id: 3, value: data?.data?.total_need_update, label: t('NEED UPDATE') },
                                                            { id: 4, value: data?.data?.total_updated, label: t('UPDATED') },
                                                        ],
                                                    },
                                                ]}
                                                sx={{
                                                    [`& .${pieArcLabelClasses.root}`]: {
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                                width={900}
                                                height={400}
                                            />
                                        </div>
                                    </div>
                                    <div className="card focus:shadow-2xl w-full border bg-white rounded-lg shadow-md overflow-hidden cursor-pointer p-4">

                                        <div className="flex justify-between mb-2">
                                            <h3 className="text-lg font-semibold">
                                                {t("technicianKPI")} ({t("totalJobCreated")}: {dataKPI?.data?.total_job_created})
                                            </h3>
                                            <div className="flex flex-end gap-4">
                                                <TextField
                                                    value={criteriasKPI.search}
                                                    onChange={handleValueChange}
                                                    label={t("teachicianName")}
                                                    variant="outlined"
                                                    type="text"
                                                    name="search"
                                                    sx={{ minWidth: 150 }}
                                                />
                                                <CustomDateRangePicker fromDate={fromDate} setFromDate={setFromDate} todate={toDate} setToDate={setToDate} label={t('dateRange')} />
                                            </div>
                                        </div>
                                        <div className="h-[500px] lg:mx-auto lg:max-w-full ">
                                            <div className="flex h-full  min-h-[500px] bg-white ">
                                                <div className="flex flex-1 flex-col">
                                                    <DataGrid
                                                        loading={isLoading}
                                                        components={{
                                                            LoadingOverlay: LinearProgress,
                                                        }}
                                                        sx={{
                                                            '.MuiDataGrid-columnSeparator': {
                                                                display: 'none',
                                                            },
                                                            '&.MuiDataGrid-root': {
                                                                border: 'none',
                                                            },
                                                            '.MuiDataGrid-columnHeaders': {
                                                                backgroundColor: '#fff',
                                                            },
                                                            '.MuiDataGrid-columnHeader': {
                                                                borderRight: '1px solid #e5e7eb'
                                                            },
                                                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                                                outline: "none !important",
                                                            },
                                                        }}
                                                        getRowId={(row) => row.technician_id}
                                                        rows={dataKPI?.data?.paging_data.technicians || []}
                                                        headerHeight={38}
                                                        rowHeight={38}
                                                        onRowClick={(params) => showDetailRow(params)}
                                                        columns={columns}
                                                        rowsPerPageOptions={[25, 50, 100]}
                                                        paginationMode="server"
                                                        rowCount={dataKPI?.data?.paging_data.total_records || 0}
                                                        pageSize={criteriasKPI?.size || 25}
                                                        onPageChange={(page) => { setCriterias({ ...criterias, page }) }}
                                                        onPageSizeChange={(rowsPerPage) => { setCriterias({ ...criterias, rowsPerPage }) }}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default TechnicianKPIManagement
