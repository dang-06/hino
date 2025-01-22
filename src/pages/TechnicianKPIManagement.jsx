import { Button, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { MdEngineering, MdOutlineCheckBox, MdOutlineClose } from "react-icons/md";
import { CgImport } from "react-icons/cg";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { DataGrid } from "@mui/x-data-grid";



const datafake = {
    content: [
        {
            id: 1,
            teachicianName: "Nguyễn Văn A",
            Assigned: 20,
            FinishedInstallation: 15,
            Completed: 10,
            NeedUpdate: 5,
            Updated: 3,
        },
        {
            id: 2,
            teachicianName: "Trần Thị B",
            Assigned: 25,
            FinishedInstallation: 20,
            Completed: 18,
            NeedUpdate: 7,
            Updated: 6,
        },
        {
            id: 3,
            teachicianName: "Lê Văn C",
            Assigned: 30,
            FinishedInstallation: 25,
            Completed: 22,
            NeedUpdate: 8,
            Updated: 7,
        },
        {
            id: 4,
            teachicianName: "Phạm Thị D",
            Assigned: 18,
            FinishedInstallation: 14,
            Completed: 12,
            NeedUpdate: 4,
            Updated: 3,
        },
        {
            id: 5,
            teachicianName: "Hoàng Văn E",
            Assigned: 22,
            FinishedInstallation: 18,
            Completed: 15,
            NeedUpdate: 6,
            Updated: 5,
        },
    ],
    totalElements: 5,
    size: 25,
};

const TechnicianKPIManagement = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [timeUnit, setTimeUnit] = useState("Tất cả");
    const [value, setValue] = useState("");

    const handleTimeUnitChange = (event) => {
        setTimeUnit(event.target.value);
        setValue("");
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const data = [
        { id: 0, value: 10, label: 'New' },
        { id: 1, value: 15, label: 'Assigned' },
        { id: 2, value: 20, label: 'Finished Installation' },
        { id: 3, value: 25, label: 'Completed' },
        { id: 4, value: 18, label: 'Need Update' },
        { id: 5, value: 12, label: 'Updated' },
    ];


    const columns = [
        {
            field: "id",
            headerName: t("id"),
            renderCell: ({ row }) => (
                <div>
                    {row.id}
                </div>
            ),
            minWidth: 150,
        },
        {
            field: "teachicianName",
            headerName: "teachicianName",
            minWidth: 300,
        },
        {
            field: "Assigned",
            headerName: "Assigned",
            minWidth: 150,
        },
        {
            field: "FinishedInstallation",
            headerName: "Finished Installation",
            minWidth: 180,
        },
        {
            field: "Completed",
            headerName: "Completed",
            minWidth: 150,
        },
        {
            field: "NeedUpdate",
            headerName: "Need Update",
            minWidth: 180,
        },
        {
            field: "Updated",
            headerName: "Updated",
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
                                    {t("Technician KPI")}
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
                                                {t("Installation Status Overview")}
                                            </h3>
                                            <div className="flex flex-end gap-4">
                                                <Select
                                                    value={timeUnit}
                                                    onChange={handleTimeUnitChange}
                                                    displayEmpty
                                                    variant="outlined"
                                                    sx={{ minWidth: 150 }}
                                                >
                                                    <MenuItem value="All">All</MenuItem>
                                                    <MenuItem value="Day">Day</MenuItem>
                                                    <MenuItem value="Month">Month</MenuItem>
                                                    <MenuItem value="Year">Year</MenuItem>
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
                                                        data,
                                                    },
                                                ]}
                                                sx={{
                                                    [`& .${pieArcLabelClasses.root}`]: {
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                                width={700}
                                                height={400}
                                            />
                                        </div>
                                    </div>
                                    <div className="card focus:shadow-2xl w-full border bg-white rounded-lg shadow-md overflow-hidden cursor-pointer p-4">
                                        <h3 className="text-lg font-semibold">
                                            {t("Techinician KPI")}
                                        </h3>
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
                                                        getRowId={(row) => row.id}
                                                        rows={datafake?.content || []}
                                                        headerHeight={38}
                                                        rowHeight={38}
                                                        onRowClick={(params) => showDetailRow(params)}
                                                        columns={columns}
                                                        rowsPerPageOptions={[25, 50, 100]}
                                                        paginationMode="server"
                                                        rowCount={datafake?.totalElements || 0}
                                                        pageSize={datafake?.size || 25}
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
