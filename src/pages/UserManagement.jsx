import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdOutlineCheckBox, MdOutlineClose } from "react-icons/md";
import { Button, Chip, Divider } from "@mui/material";
import { IoChevronBack, IoChevronForward, IoFilterOutline } from "react-icons/io5";
import { FaCheckCircle, FaRegTrashAlt, FaEdit } from "react-icons/fa";
import FormDisplay from "../components/FormDisplay";
import FormInstallation from "../components/Installation/FormInstallation";
import DetailInstallation from "../components/Installation/DetailInstallation";
import FilterInstallation from "../components/Installation/FilterInstallation";
import FilterRightBar from "../components/FilterRightBar";
import { LoadingButton } from "@mui/lab";
import DeleteInstallation from "../components/Installation/DeleteInstallation";
import AssignJob from '../components/Installation/AssignJob';
import ReviewInstallation from "../components/Installation/ReviewInstallation";
import DetailUser from "../components/User/DetailUser";
import FilterUser from "../components/User/FilterUser";
import DeleteUser from "../components/User/DeleteUser";
import FormUser from "../components/User/FormUser";
import ChangePassword from "../components/User/ChangePassword";
import { useGetUserQuery } from "../services/apiSlice";


const UserManagement = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openAssignJob, setOpenAssignJob] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [triggleSubmit, setTriggleSubmit] = useState(false);
    const [triggleFiter, setTriggleFiter] = useState(false);
    const [selectedCheckbox, setSelectedCheckbox] = useState({});
    const [enableCheckbox, setEnableCheckbox] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [criterias, setCriterias] = useState({
        page: 1,
        size: 25,
        user_name: '',
        full_name: '',
        phone_number: '',
        email: ''
    });

    const { data, isLoading, isFetching, isSuccess, error, refetch } = useGetUserQuery(criterias);


    console.log('API Response:', {
        data,
        isLoading,
        isSuccess,
        error
    });

    const showDetailRow = (params) => {
        setSelectedRow(params.row);
        if (enableCheckbox) {
            setSelectedCheckbox(prevState => ({
                ...prevState,
                [params.id]: prevState[params.id] ? !prevState[params.id] : true
            }));
        } else {
            setShowDetail(true);
        }
    };

    const getPrevRow = () => {
        if (selectedRow && selectedRow.user_id) {
            let findIndex = data.data.users.findIndex(i => i.user_id == selectedRow.user_id);
            if (findIndex > 0) {
                setSelectedRow(data.data.users[findIndex - 1]);
            }
        }
    };

    const getNextRow = () => {
        if (selectedRow && selectedRow.user_id) {
            let findIndex = data.data.users.findIndex(i => i.user_id == selectedRow.user_id);
            if (findIndex >= 0 && findIndex < data.data.users.length - 1) {
                setSelectedRow(data.data.users[findIndex + 1]);
            }
        }
    };

    const onShowModalDelete = (id) => {
        setOpen(true);
    };

    const onShowModalChangePassword = (id) => {
        setOpenChangePassword(true);
    };

    const updateFilter = (value) => {
        setCriterias({ ...criterias, ...value });
        refetch()
    };

    const onDoneDelete = (e) => {
        setOpen(false);
        setShowDetail(false);
        refetch()
    };

    const onDoneEdit = () => {
        setOpenEdit(false);
        setShowDetail(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    const columns = [
        {
            field: "user_id",
            headerName: t("ID"),
            minWidth: 50,
        },
        {
            field: "user_name",
            headerName: t("userName"),
            minWidth: 180,
        },
        {
            field: "full_name",
            headerName: t("fullName"),
            minWidth: 220,
        },
        {
            field: "email",
            headerName: t("email"),
            minWidth: 220,
        },
        {
            field: "role_name",
            headerName: t("role"),
            minWidth: 120,
        },
        {
            field: "phone_number",
            headerName: t("phone"),
            minWidth: 120,
        },
        {
            field: "gender",
            headerName: t("gender"),
            minWidth: 80,
        },
        {
            field: "address",
            headerName: t("address"),
            minWidth: 250,
        },
        {
            field: "date_of_birth",
            headerName: t("dateOfBirth"),
            minWidth: 120,
            valueGetter: (params) => formatDate(params.value),
        },
        {
            field: "created_time",
            headerName: t("createdTime"),
            minWidth: 120,
            valueGetter: (params) => formatDate(params.value),
        }
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
                                            {t("Users")}
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
                                    getRowId={(row) => row.user_id}
                                    rows={data?.data?.users || []}  
                                    headerHeight={38}
                                    rowHeight={38}
                                    onRowClick={(params) => showDetailRow(params)}
                                    columns={columns}
                                    selectionModel={selectedRow?.id}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    paginationMode="server"
                                    rowCount={data?.data?.total_users}
                                    pageSize={criterias.size}
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
                            <div></div>
                            <div className="action flex items-center gap-[8px]">
                                {openEdit ? (
                                    <>
                                        <Tooltip title={'Cancel'} placement="bottom-start" arrow>
                                            <button onClick={() => setOpenEdit(false)} className="btn-primary border py-[5px] px-3 rounded-[5px] text-primary-900 border-primary-500 hover:bg-primary-100 text-[13px]">
                                                <span>Cancel</span>
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
                                        <Tooltip title={'Change Password'} placement="bottom-start" arrow>
                                            <Button
                                                className="px-6 mr-2"
                                                variant="outlined"
                                                onClick={() => onShowModalChangePassword(selectedRow.id)}
                                            >
                                                {t("changePassword")}
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title={'Delete'} placement="bottom-start" arrow>
                                            <button onClick={() => onShowModalDelete(selectedRow.id)} className="p-1 outline-none hover:bg-[#f1f1f1] border rounded-[5px]">
                                                <FaRegTrashAlt className="h-6 w-6 flex-shrink-0 text-[#10B981] cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                            <button onClick={() => setOpenEdit(true)} className="btn-primary py-[6px] px-3 rounded-[5px] flex items-center bg-[#10B981] text-[13px] text-white">
                                                <FaEdit className="mr-2" />
                                                <span>Edit</span>
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
                        <div className="max-w-[700px] p-4 min-h-[50vh] bg-white border m-auto ">
                            {showDetail && (openEdit ? <FormUser selectedItem={selectedRow} refetch={() => { setOpenEdit(false); refetch() }} triggleSubmit={triggleSubmit} setTriggleSubmit={setTriggleSubmit} setOpenForm={setShowDetail} submitError={() => setTriggleSubmit(false)} /> : <DetailUser detailRow={selectedRow} />)}
                        </div>
                    </div>
                </div>
            </div>
            <FilterRightBar open={openFilter} setOpen={setOpenFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter}>
                <FilterUser fleets={[]} filter={criterias} setFilter={updateFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter} />
            </FilterRightBar>
            <FormDisplay open={openForm} setOpen={setOpenForm} >
                <FormUser selectedItem={null} />
            </FormDisplay>
            <DeleteUser open={open} setOpen={onDoneDelete} deleteId={selectedRow?.user_id} />
            <ChangePassword user={selectedRow} open={openChangePassword} setOpen={setOpenChangePassword} refetch={() => { setOpenChangePassword(false); setShowDetail(false); refetch() }} />
        </>
    );
};

export default UserManagement;


