import LinearProgress from "@mui/material/LinearProgress";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdOutlineCheckBox, MdOutlineClose } from "react-icons/md";
import { Button, Divider } from "@mui/material";
import { IoChevronBack, IoChevronForward, IoFilterOutline } from "react-icons/io5";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { LoadingButton } from "@mui/lab";
import DetailVehicle from "../components/Vehicle/DetailVehicle";

const VehicleManagement = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [triggleSubmit, setTriggleSubmit] = useState(false);
    const [criterias, setCriterias] = useState({
        page: 1,
        size: 25,
    });

    // Mock data
    const data = {
        data: {
            vehicles: Array(30).fill(null).map((_, index) => ({
                vehicle_id: `${String(index + 1).padStart(3 )}`,
                vin_no: `HINO${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                equipment_id: `EQ${String(index + 1).padStart(3, '0')}`,
                sim_no: `09${Math.floor(Math.random() * 100000000)}`,
                active_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
                expire_date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
                network_carrier: ['Viettel', 'Mobifone', 'Vinaphone'][Math.floor(Math.random() * 3)],
            })),
            total_vehicles: 30
        }
    };

    const showDetailRow = (params) => {
        setSelectedRow(params.row);
        setShowDetail(true);
    };

    const getPrevRow = () => {
        if (selectedRow && selectedRow.vehicle_id) {
            let findIndex = data.data.vehicles.findIndex(i => i.vehicle_id == selectedRow.vehicle_id);
            if (findIndex > 0) {
                setSelectedRow(data.data.vehicles[findIndex - 1]);
            }
        }
    };

    const getNextRow = () => {
        if (selectedRow && selectedRow.vehicle_id) {
            let findIndex = data.data.vehicles.findIndex(i => i.vehicle_id == selectedRow.vehicle_id);
            if (findIndex >= 0 && findIndex < data.data.vehicles.length - 1) {
                setSelectedRow(data.data.vehicles[findIndex + 1]);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    const columns = [
        {
            field: "vehicle_id",
            headerName: t("Vehicle ID"),
            minWidth: 120,
        },
        {
            field: "vin_no",
            headerName: t("Vin No"),
            minWidth: 180,
        },
        {
            field: "equipment_id",
            headerName: t("Equipment ID"),
            minWidth: 150,
        },
        {
            field: "sim_no",
            headerName: t("Sim No"),
            minWidth: 150,
        },
        {
            field: "active_date",
            headerName: t("Active Date"),
            minWidth: 120,
            valueGetter: (params) => formatDate(params.value),
        },
        {
            field: "expire_date",
            headerName: t("Expire Date"),
            minWidth: 120,
            valueGetter: (params) => formatDate(params.value),
        },
        {
            field: "network_carrier",
            headerName: t("Network Carrier"),
            minWidth: 150,
        },
        
    ];

    return (
        <>
            <div className="flex">
                <div className="flex-1 transition-all duration-[300ms]">
                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-gray-900">
                                {t("vehicleManagement")}
                            </h1>
                            <div className="action flex items-center gap-[8px]">
                                <IoFilterOutline onClick={() => setOpenFilter(true)} className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(100vh_-_110px)] lg:mx-auto lg:max-w-full ">
                        <div className="flex h-full min-h-[calc(100vh_-_110px)] bg-white ">
                            <div className="flex flex-1 flex-col">
                                <DataGrid
                                    loading={false}
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
                                    getRowId={(row) => row.vehicle_id}
                                    rows={data?.data?.vehicles || []}
                                    headerHeight={38}
                                    rowHeight={38}
                                    onRowClick={(params) => showDetailRow(params)}
                                    columns={columns}
                                    selectionModel={selectedRow?.id}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    paginationMode="server"
                                    rowCount={data?.data?.total_vehicles}
                                    pageSize={criterias.size}
                                    onPageChange={(page) => { setCriterias({ ...criterias, page }) }}
                                    onPageSizeChange={(size) => { setCriterias({ ...criterias, size }) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={(showDetail ? 'w-[600px]' : 'w-[0px]') + " transition-all duration-[300ms] border-l"}>
                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <div></div>
                            <div className="action flex items-center gap-[8px]">
                                {openEdit ? (
                                    <>
                                        <Tooltip title={'Cancel'} placement="bottom-start" arrow>
                                            <button onClick={() => setOpenEdit(false)} className="btn-primary border py-[5px] px-3 rounded-[5px] text-primary-900 border-primary-500 hover:bg-primary-100 text-[13px]">
                                                <span>{t("cancel")}</span>
                                            </button>
                                        </Tooltip>
                                        {/* <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                            <LoadingButton
                                                type="submit"
                                                variant="contained"
                                                className="ml-3"
                                                onClick={() => setTriggleSubmit(true)}
                                                loading={triggleSubmit}
                                            >
                                                {t("save")}
                                            </LoadingButton>
                                        </Tooltip> */}
                                        <Divider orientation="vertical" flexItem variant="middle" />
                                    </>
                                ) : (
                                    <>
                                        <Tooltip title={'Delete'} placement="bottom-start" arrow>
                                            <button onClick={() => setOpen(true)} className="p-1 outline-none hover:bg-[#f1f1f1] border rounded-[5px]">
                                                <FaRegTrashAlt className="h-6 w-6 flex-shrink-0 text-[#10B981] cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </Tooltip>
                                        {/* <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                            <button onClick={() => setOpenEdit(true)} className="btn-primary py-[6px] px-3 rounded-[5px] flex items-center bg-[#10B981] text-[13px] text-white">
                                                <FaEdit className="mr-2" />
                                                <span>{t("edit")}</span>
                                            </button>
                                        </Tooltip> */}
                                        <Divider orientation="vertical" flexItem variant="middle" />
                                        &nbsp;
                                        <Tooltip title={'Back'} placement="bottom-start" arrow>
                                            <button className="rounded-full p-1 outline-none hover:bg-[#f1f1f1]" onClick={getPrevRow}>
                                                <IoChevronBack className="h-6 w-6 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={'Next'} placement="bottom-start" arrow>
                                            <button className="rounded-full p-1 outline-none hover:bg-[#f1f1f1]" onClick={getNextRow}>
                                                <IoChevronForward className="h-6 w-6 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </Tooltip>
                                    </>
                                )}
                                <Tooltip title={'Expand'} placement="bottom-start" arrow>
                                    <button className="rounded-full p-1 outline-none hover:bg-[#f1f1f1]">
                                        <AiOutlineExpandAlt className="h-6 w-6 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                    </button>
                                </Tooltip>
                                <Tooltip title={'Close'} placement="bottom-start" arrow>
                                    <button className="rounded-full p-1 outline-none hover:bg-[#f1f1f1]" onClick={() => { setShowDetail(false); setOpenEdit(false) }}>
                                        <MdOutlineClose className="h-6 w-6 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(100vh_-_110px)] lg:mx-auto lg:max-w-full overflow-auto">
                        <div className="max-w-[700px] p-4 min-h-[50vh] bg-white border m-auto ">
                            {showDetail && (openEdit ? <FormVehicle selectedItem={selectedRow} refetch={() => { setOpenEdit(false); refetch() }} triggleSubmit={triggleSubmit} setTriggleSubmit={setTriggleSubmit} setOpenForm={setShowDetail} submitError={() => setTriggleSubmit(false)} /> : <DetailVehicle detailRow={selectedRow} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VehicleManagement;