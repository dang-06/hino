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
import DetailSim from "../components/Sim/DetailSim";
import { CgExport, CgImport } from "react-icons/cg";
import ImportExcelLayout from "../components/ImportExcelLayout";
import FilterSim from "../components/Sim/FilterSim";
import FilterRightBar from "../components/FilterRightBar";
import { BsFilter } from "react-icons/bs";
import { useGetSimsQuery, useImportSimMutation } from "../services/apiSlice";
import DeleteSim from "../components/Sim/DeleteSim";
// import ExportExcelSim from "../components/exportExcelSim";

const SimManagement = () => {
    const { t } = useTranslation();
    const [isHMVADMIN, setIsHMVADMIN] = useState(false);
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [triggleSubmit, setTriggleSubmit] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [triggleFiter, setTriggleFiter] = useState(false);
    // const [showExportModal, setShowExportModal] = useState(false);
    const [criterias, setCriterias] = useState({
        page: 1,
        size: 25,
        sim_no: '',
        network_carrier: ''
    });

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

    const { data, isLoading, isFetching, isSuccess, error, refetch } = useGetSimsQuery();
    const [importSimMutation] = useImportSimMutation();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data && data.data) {
            let filtered = [...data.data];
            
            if (criterias.sim_no) {
                filtered = filtered.filter(item => 
                    item.sim_no && item.sim_no.toLowerCase().includes(criterias.sim_no.toLowerCase())
                );
            }
            
            if (criterias.network_carrier) {
                filtered = filtered.filter(item => 
                    item.network_carrier === criterias.network_carrier
                );
            }
            
            setFilteredData(filtered);
        }
    }, [data, criterias]);

    const showDetailRow = (params) => {
        setSelectedRow(params.row);
        setShowDetail(true);
    };

    const getPrevRow = () => {
        if (selectedRow && selectedRow.device_id) {
            let findIndex = filteredData.findIndex(i => i.device_id === selectedRow.device_id);
            if (findIndex > 0) {
                setSelectedRow(filteredData[findIndex - 1]);
            }
        }
    };

    const getNextRow = () => {
        if (selectedRow && selectedRow.device_id) {
            let findIndex = filteredData.findIndex(i => i.device_id === selectedRow.device_id);
            if (findIndex >= 0 && findIndex < filteredData.length - 1) {
                setSelectedRow(filteredData[findIndex + 1]);
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
            field: "sim_id",
            headerName: t("simID"),
            minWidth: 100,
        },
        {
            field: "sim_no",
            headerName: t("simNo"),
            minWidth: 230,
        },
        {
            field: "active_date",
            headerName: t("activeDate"),
            minWidth: 150,
            valueGetter: (params) => formatDate(params.value) || "-",
        },
        {
            field: "expire_date",
            headerName: t("expireDate"),
            minWidth: 150,
            valueGetter: (params) => formatDate(params.value) || "-",
        },
        {
            field: "network_carrier",
            headerName: t("networkCarrier"),
            minWidth: 180,
            valueGetter: (params) => params.row.network_carrier || "-",
        },
    ];

    const updateFilter = (newFilter) => {
        setCriterias(prev => ({
            ...prev,
            ...newFilter
        }));
    };

    return (
        <>
            <div className="flex">
                <div className="flex-1 transition-all duration-[300ms]">
                    <div className="bg-white">
                        <ImportExcelLayout 
                            open={showImportModal} 
                            setOpen={setShowImportModal} 
                            refetch={refetch} 
                            apiPath={importSimMutation} 
                        />
                        {/* <ExportExcelSim
                            open={showExportModal}
                            setOpen={setShowExportModal}
                        /> */}
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {t("simManagement")}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                {!isHMVADMIN && (
                                    <>
                                        <Tooltip title={'Import Excel'} placement="bottom-start" arrow>
                                            <Button
                                                className="btn-primary py-[6px] px-3 rounded-[7px] bg-primary-900 text-[13px] text-white"
                                                onClick={() => setShowImportModal(true)}
                                                startIcon={<CgImport className="h-5 w-5" />}
                                                variant="contained"
                                            > {t("importExcel")}</Button>
                                        </Tooltip>
                                        {/* <Tooltip title={'Export Excel'} placement="bottom-start" arrow>
                                            <Button
                                                className="btn-primary py-[6px] px-3 rounded-[7px] bg-primary-900 text-[13px] text-white"
                                                onClick={() => setShowExportModal(true)}
                                                startIcon={<CgExport className="h-5 w-5" />}
                                                variant="contained"
                                            > {t("exportExcel")}</Button>
                                        </Tooltip> */}
                                    </>
                                    
                                )}
                                <div className="h-6 border-solid border-l-2 border-gray-300 ml-2 mr-3"></div>
                                <Tooltip title={'Filter'} placement="bottom-start" arrow>
                                    <button onClick={() => { setOpenFilter(true) }} className="text-gray-600">
                                        <BsFilter className="h-6 w-6" />
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
                                    rows={filteredData || []}
                                    headerHeight={38}
                                    rowHeight={38}
                                    onRowClick={(params) => showDetailRow(params)}
                                    columns={columns}
                                    selectionModel={selectedRow?.id}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    pageSize={25}
                                    rowCount={data?.total || 0}
                                />  
                            </div>
                        </div>
                    </div>
                </div>
                <div className={(showDetail ? 'w-[600px]' : 'w-[0px]') + " transition-all duration-[300ms] border-l"}>
                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <div></div>
                            <div className="action flex items-center gap-2">
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
                                        {!isHMVADMIN && (
                                            <Tooltip title={'Delete'} placement="bottom-start" arrow>
                                                <button onClick={() => setOpen(true)} className="p-1 outline-none hover:bg-[#f1f1f1] border rounded-[5px]">
                                                    <FaRegTrashAlt className="h-6 w-6 flex-shrink-0 text-[#10B981] cursor-pointer" aria-hidden="true" />
                                                </button>
                                            </Tooltip>
                                        )}
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
                        <div className="max-w-[700px] p-4 min-h-[10vh] bg-white border m-auto ">
                            {showDetail && (openEdit ? <FormVehicle selectedItem={selectedRow} refetch={() => { setOpenEdit(false); refetch() }} triggleSubmit={triggleSubmit} setTriggleSubmit={setTriggleSubmit} setOpenForm={setShowDetail} submitError={() => setTriggleSubmit(false)} /> : <DetailSim detailRow={selectedRow} />)}
                        </div>
                    </div>
                </div>
            </div>
            {!isHMVADMIN && (
                <DeleteSim 
                    open={open} 
                    setOpen={(value) => {
                        setOpen(value);
                        if (!value) {
                            refetch();
                            setShowDetail(false);
                        }
                    }} 
                    simNo={selectedRow?.sim_no} 
                />
            )}
            <FilterRightBar open={openFilter} setOpen={setOpenFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter}>
                <FilterSim filter={criterias} setFilter={updateFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter} />
            </FilterRightBar>
        </>
    );
};

export default SimManagement;
