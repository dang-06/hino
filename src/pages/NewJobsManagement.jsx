import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useGetNewJobsQuery,
} from "../services/apiSlice";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdOutlineCheckBox, MdOutlineClose } from "react-icons/md";
import { Button, Chip, Divider } from "@mui/material";
import { IoChevronBack, IoChevronForward, IoFilterOutline } from "react-icons/io5";
import { FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import FormDisplay from "../components/FormDisplay";
import FormInstallation from "../components/Installation/FormInstallation";
import DetailInstallation from "../components/Installation/DetailInstallation";
import FilterInstallation from "../components/Installation/FilterInstallation";
import FilterRightBar from "../components/FilterRightBar";
import { LoadingButton } from "@mui/lab";
import DeleteInstallation from "../components/Installation/DeleteInstallation";
import AssignJob from '../components/Installation/AssignJob';
import ReviewInstallation from "../components/Installation/ReviewInstallation";

const NewJobsManagement = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openAssignJob, setOpenAssignJob] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false)
    const [triggleSubmit, setTriggleSubmit] = useState(false)
    const [triggleFiter, setTriggleFiter] = useState(false)
    const [selectedCheckbox, setSelectedCheckbox] = useState({})
    const [enableCheckbox, setEnableCheckbox] = useState(false)
    const [criterias, setCriterias] = useState({
        page: 1,
        size: 25,
        search: '',
        status: '',
        from_date: '',
        to_date: ''
    });
    const { data, isLoading, isFetching, refetch } = useGetNewJobsQuery(criterias);

    const showDetailRow = (params) => {
        setSelectedRow(params.row)
        if (enableCheckbox) {
            setSelectedCheckbox(prevState => ({
                ...prevState,
                [params.id]: prevState[params.id] ? !prevState[params.id] : true
            }))

        } else {
            setShowDetail(true)
        }
    }

    const getPrevRow = () => {
        if (selectedRow && selectedRow.id) {
            let findIndex = data.content.findIndex(i => i.id == selectedRow.id)
            if (findIndex > 0) {
                setSelectedRow(data.content[findIndex - 1])
            }
        }
    }
    const getNextRow = () => {
        if (selectedRow && selectedRow.id) {
            let findIndex = data.content.findIndex(i => i.id == selectedRow.id)
            if (findIndex >= 0 && findIndex < data.content.length - 1) {
                setSelectedRow(data.content[findIndex + 1])
            }
        }
    }

    const onShowModalDelete = (id) => {
        setOpen(true);
    };

    const onShowModalReview = (id) => {
        setOpenReview(true);
    };

    const updateFilter = (value) => {
        setCriterias({ ...criterias, ...value });
    };

    const onDoneDelete = (e) => {
        setOpen(false)
        setShowDetail(false)
        refetch()
    }

    const onDoneReview = (e) => {
        setOpenReview(false)
        setShowDetail(false)
        refetch()
    }

    const JobStatusCell = ({ value }) => {
        const getStatusStyle = (status) => {
            switch (status) {
                case 'New':
                    return { color: 'blue', label: t('NEW') };
                case 'Need Update':
                    return { color: 'red', label: t('NEED UPDATE') };
                default:
                    return { color: 'black', label: 'UNKNOWN' };
            }
        };

        const { color, label } = getStatusStyle(value);

        return (
            <Chip
                label={label}
                style={{
                    backgroundColor: `transparent`,
                    color: color,
                    fontWeight: 'bold',
                }}
                size="small"
            />
        );
    };

    const columns = [
        {
            field: "job_id",
            headerName: t("jobId"),
            minWidth: 100,
        },
        {
            field: 'job_status',
            headerName: t('jobStatus'),
            minWidth: 200,
            renderCell: (params) => <JobStatusCell value={params.value} />,
        },
        {
            field: "vin_no",
            headerName: t("vinNo"),
            minWidth: 150,
        },
        {
            field: "installation_location",
            headerName: t("installationLocation"),
            minWidth: 150,
        },
        {
            field: "installation_date",
            headerName: t("installationDate"),
            minWidth: 150,
        },
    ];

    return (
        <>
            <div className=" flex">
                <div className="flex-1 transition-all duration-[300ms]">
                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            {
                                enableCheckbox ? (
                                    <div className="flex items-center">
                                        <Tooltip title={'Close'} placement="bottom-start" arrow>
                                            <button className="rounded-full p-1 mr-2 outline-none hover:bg-[#f1f1f1]" onClick={() => { setEnableCheckbox(false) }}>
                                                <MdOutlineClose className="h-6 w-6 flex-shrink-0 text-gray-900 cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </Tooltip>
                                        <div className="title text-[16px]">
                                            {Object.values(selectedCheckbox).filter(i => i).length} Selected
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h1 className="text-xl font-semibold text-gray-900">
                                            {t("newJobs")}
                                        </h1>
                                        <div className="action flex items-center gap-[8px]">
                                            <IoFilterOutline onClick={() => setOpenFilter(true)} className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    <div className="h-[calc(100vh_-_110px)] lg:mx-auto lg:max-w-full ">
                        <div className="flex h-full  min-h-[calc(100vh_-_110px)] bg-white ">
                            <div className="flex flex-1 flex-col">
                                <DataGrid
                                    loading={isLoading || isFetching}
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
                                    getRowId={(row) => row.job_id}
                                    rows={data?.data?.jobs || []}
                                    headerHeight={38}
                                    rowHeight={38}
                                    onRowClick={(params) => showDetailRow(params)}
                                    columns={columns}
                                    selectionModel={selectedRow?.id}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    paginationMode="server"
                                    rowCount={data?.data?.total_records || 0}
                                    pageSize={criterias?.size || 25}
                                    onPageChange={(page) => { setCriterias({ ...criterias, page }) }}
                                    onPageSizeChange={(size) => { setCriterias({ ...criterias, size }) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={(showDetail ? 'w-[600px]' : 'w-[0px]') + " transition-all duration-[300ms]  border-l"}>
                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <div className="title text-[16px]">
                                {selectedRow?.saleOrder}
                            </div>
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
                                        {(selectedRow?.job_status === 'Finished Installation' || selectedRow?.job_status === 'Updated') && (
                                            <Tooltip title={'Review Installation'} placement="bottom-start" arrow>
                                                <Button
                                                    className="px-6 mr-2"
                                                    onClick={() => onShowModalReview(selectedRow.id)}
                                                    startIcon={<FaCheckCircle className="h-5 w-5" />}
                                                    variant="outlined"
                                                >
                                                    {t("reviewInstallation")}
                                                </Button>
                                            </Tooltip>
                                        )}
                                        <Tooltip title={'Delete'} placement="bottom-start" arrow>
                                            <button onClick={() => onShowModalDelete(selectedRow.id)} className="p-1 outline-none hover:bg-[#f1f1f1] border rounded-[5px]">
                                                <FaRegTrashAlt className="h-6 w-6 flex-shrink-0 text-[#10B981] cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </Tooltip>
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
                        <div className="min-h-[50vh] m-auto overflow-auto" style={{ height: 'calc(100vh - 110px)' }}>
                            {showDetail && (openEdit ? <FormInstallation selectedItem={selectedRow} refetch={() => { refetch(); setOpenEdit(false) }} triggleSubmit={triggleSubmit} setTriggleSubmit={setTriggleSubmit} setOpenForm={setShowDetail} submitError={() => setTriggleSubmit(false)} /> : <DetailInstallation detailRow={selectedRow} />)}
                        </div>
                    </div>
                </div>
            </div>
            <FilterRightBar open={openFilter} setOpen={setOpenFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter}>
                <FilterInstallation fleets={[]} filter={criterias} setFilter={updateFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter} />
            </FilterRightBar>
            <FormDisplay open={openForm} setOpen={setOpenForm} >
                <FormInstallation selectedItem={null} refetch={refetch} setTriggleSubmit={setTriggleSubmit} setOpenForm={setOpenForm} />
            </FormDisplay>
            <DeleteInstallation open={open} setOpen={onDoneDelete} deleteId={selectedRow?.job_id} />
            <ReviewInstallation open={openReview} setOpen={onDoneReview} reviewId={selectedRow?.job_id} />
            <AssignJob open={openAssignJob} setOpen={setOpenAssignJob} />
        </>
    );
};

export default NewJobsManagement;