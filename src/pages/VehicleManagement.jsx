import LinearProgress from "@mui/material/LinearProgress";
import React, { useState, useEffect } from "react";
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
import { useGetVehiclesQuery, useImportVehicleMutation } from "../services/apiSlice";
import DeleteVehicle from "../components/Vehicle/DeleteVehicle";
import FilterVehicle from "../components/Vehicle/FilterVehicle";
import FilterRightBar from "../components/FilterRightBar";
import { CgImport } from "react-icons/cg";
import ImportExcelLayout from "../components/ImportExcelLayout";
import FormDisplay from "../components/FormDisplay";
import FormVehicle from "../components/Vehicle/FormVehicle";
import { FiUserPlus } from "react-icons/fi";

const VehicleManagement = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [triggleSubmit, setTriggleSubmit] = useState(false);
    const [triggleFiter, setTriggleFiter] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [isHMVADMIN, setIsHMVADMIN] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [criterias, setCriterias] = useState({
        page: 1,
        size: 25,
        vin_no: '',
        equipmentid: '',
        sim_no: '',
        network_carrier: ''
    });
    const [filteredVehicles, setFilteredVehicles] = useState([]);

    useEffect(() => {
        try {
            const token = localStorage.getItem("user");
            if (token) {
                const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                console.log('Token payload:', tokenPayload);
                setIsHMVADMIN(tokenPayload.role_name === "HMVADMIN");
            }
        } catch (error) {
            console.error('Error checking role:', error);
        }
    }, []);

    // Fetch vehicles data from API
    const { data, isLoading, refetch } = useGetVehiclesQuery();
    const [importVehicle] = useImportVehicleMutation();

    console.log("Vehicle data:", data); // Add logging to debug

    // Extract vehicles from the data
    const vehicles = data?.vehicles || [];
    const totalVehicles = data?.total_vehicles || 0;

    // Debug the first vehicle to see its structure
    console.log("First vehicle:", vehicles[0]);

    useEffect(() => {
        let filtered = [...vehicles];
        if (criterias.vin_no) {
            filtered = filtered.filter(item =>
                item.vin_no && item.vin_no.toLowerCase().includes(criterias.vin_no.toLowerCase())
            );
        }
        if (criterias.equipmentid) {
            filtered = filtered.filter(item =>
                item.equipmentid && item.equipmentid.toLowerCase().includes(criterias.equipmentid.toLowerCase())
            );
        }
        if (criterias.sim_no) {
            filtered = filtered.filter(item =>
                item.simno && item.simno.toLowerCase().includes(criterias.sim_no.toLowerCase())
            );
        }
        if (criterias.network_carrier) {
            filtered = filtered.filter(item =>
                item.network_carrier === criterias.network_carrier
            );
        }
        setFilteredVehicles(filtered);
    }, [vehicles, criterias]);

    const updateFilter = (newFilter) => {
        setCriterias(prev => ({
            ...prev,
            ...newFilter,
            page: 1 // reset page về 1 khi filter
        }));
    };

    const showDetailRow = (params) => {
        setSelectedRow(params.row);
        setShowDetail(true);
    };

    const getPrevRow = () => {
        if (selectedRow && selectedRow.id) {
            let findIndex = vehicles?.findIndex(i => i.id === selectedRow.id);
            if (findIndex > 0) {
                setSelectedRow(vehicles[findIndex - 1]);
            }
        }
    };

    const getNextRow = () => {
        if (selectedRow && selectedRow.id) {
            let findIndex = vehicles?.findIndex(i => i.id === selectedRow.id);
            if (findIndex >= 0 && findIndex < vehicles?.length - 1) {
                setSelectedRow(vehicles[findIndex + 1]);
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
            field: "id",
            headerName: t("ID"),
            minWidth: 100,
        },
        {
            field: "vin_no",
            headerName: t("Vin No"),
            minWidth: 200,
        },
        {
            field: "equipmentid",
            headerName: t("Equipment ID"),
            minWidth: 180,
        },
        {
            field: "simno",
            headerName: t("Sim No"),
            minWidth: 230,
            valueGetter: (params) => params.row.simno || "-",
        },
        {
            field: "active_date",
            headerName: t("Active Date"),
            minWidth: 150,
            valueGetter: (params) => formatDate(params.value) || "-",
        },
        {
            field: "expire_date",
            headerName: t("Expire Date"),
            minWidth: 150,
            valueGetter: (params) => formatDate(params.value) || "-",
        },
        {
            field: "network_carrier",
            headerName: t("Network Carrier"),
            minWidth: 180,
            valueGetter: (params) => params.row.network_carrier || "-",
        },
    ];

    return (
        <>
            <div className="flex">
                <div className="flex-1 transition-all duration-[300ms]">
                    <div className="bg-white">
                        <ImportExcelLayout 
                            open={showImportModal} 
                            setOpen={setShowImportModal} 
                            refetch={refetch} 
                            apiPath={importVehicle} 
                        />
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {t("vehicleManagement")}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                {!isHMVADMIN && (
                                    <>
                                        {/* <Tooltip title={'Import Excel'} placement="bottom-start" arrow>
                                            <Button
                                                className="btn-primary py-[6px] px-3 rounded-[7px] bg-primary-900 text-[13px] text-white"
                                                onClick={() => setShowImportModal(true)}
                                                startIcon={<CgImport className="h-5 w-5" />}
                                                variant="contained"
                                            > {t("importExcel")}</Button>
                                        </Tooltip> */}
                                        <Button
                                            variant="contained"
                                            className="ml-2 px-6 capitalize flex-1"
                                            startIcon={<FiUserPlus className="h-5 w-5" />}
                                            onClick={() => {
                                                setOpenForm(true)
                                            }}
                                        >
                                            {t("add")}
                                        </Button>
                                    </>
                                )}
                                <div className="h-6 border-solid border-l-2 border-gray-300 ml-2 mr-3"></div>
                                <Tooltip title={'Filter'} placement="bottom-start" arrow>
                                    <button onClick={() => setOpenFilter(true)} className="text-gray-500 cursor-pointer">
                                        <IoFilterOutline className="h-5 w-5" />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(100vh_-_110px)] lg:mx-auto lg:max-w-full ">
                        <div className="flex h-full min-h-[calc(100vh_-_110px)] bg-white ">
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
                                    rows={filteredVehicles}
                                    headerHeight={38}
                                    rowHeight={38}
                                    onRowClick={(params) => showDetailRow(params)}
                                    columns={columns}
                                    selectionModel={selectedRow?.id}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    paginationMode="client"
                                    rowCount={totalVehicles}
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
                                        <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                            <LoadingButton
                                                type="submit"
                                                variant="contained"
                                                className="ml-3"
                                                onClick={() => setTriggleSubmit(true)}
                                                loading={triggleSubmit}
                                            >
                                                {t("save")}
                                            </LoadingButton>
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem variant="middle" />
                                    </>
                                ) : (
                                    <>
                                        {!isHMVADMIN && (
                                            <Tooltip title={'Delete'} placement="bottom-start" arrow>
                                                <button onClick={() => setOpen(true)} className="p-1 outline-none hover:bg-[#f1f1f1] border rounded-[5px]">
                                                    <FaRegTrashAlt className="h-6 w-6 flex-shrink-0 text-[#10B981] cursor-pointer" aria-hidden="true" />
                                                </button>
                                            </Tooltip>
                                        )}
                                        {!isHMVADMIN && (
                                            <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                                <button onClick={() => setOpenEdit(true)} className="btn-primary py-[6px] px-3 rounded-[5px] flex items-center bg-[#10B981] text-[13px] text-white">
                                                    <FaEdit className="mr-2" />
                                                    <span>{t("edit")}</span>
                                                </button>
                                            </Tooltip>
                                        )}
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
                            {showDetail && (openEdit ? 
                                <FormVehicle 
                                    selectedItem={selectedRow} 
                                    refetch={() => { setOpenEdit(false); refetch() }} 
                                    triggleSubmit={triggleSubmit} 
                                    setTriggleSubmit={setTriggleSubmit} 
                                    setOpenForm={setShowDetail} 
                                    submitError={() => setTriggleSubmit(false)} 
                                /> 
                                : <DetailVehicle detailRow={selectedRow} />)}
                        </div>
                    </div>
                </div>
                {!isHMVADMIN && (
                    <DeleteVehicle
                        open={open}
                        setOpen={(value) => {
                            setOpen(value);
                            if (!value) {
                                refetch();
                                setShowDetail(false);
                            }
                        }}
                        vinNo={selectedRow?.vin_no}
                    />
                )}
            </div>
            <FilterRightBar open={openFilter} setOpen={setOpenFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter}>
                <FilterVehicle filter={criterias} setFilter={updateFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter} />
            </FilterRightBar>
            <FormDisplay open={openForm} setOpen={setOpenForm} >
                <FormVehicle
                    selectedItem={null}
                    refetch={refetch}
                    triggleSubmit={false}
                    setTriggleSubmit={setTriggleSubmit}
                    setOpenForm={setOpenForm}
                    submitError={() => setTriggleSubmit(false)}
                />
            </FormDisplay>
        </>
    );
};

export default VehicleManagement;