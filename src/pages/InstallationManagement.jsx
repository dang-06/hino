import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";
import { FiUserPlus, FiTrash2 } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit, AiOutlineExpandAlt } from "react-icons/ai";
import { MdOutlineCheckBox, MdOutlineClose } from "react-icons/md";
import { CiCircleChevRight } from "react-icons/ci";
import { IoChevronBack, IoChevronForward, IoFilterOutline } from "react-icons/io5";
import { useGetInstallationQuery } from "../services/apiSlice";
import LinearProgress from "@mui/material/LinearProgress";
import FormInstallation from "../components/Installation/FormInstallation";
import DeleteInstallation from "../components/Installation/DeleteInstallation";
import DetailInstallation from "../components/Installation/DetailInstallation";
import FilterInstallation from "../components/Installation/FilterInstallation";
import FilterRightBar from "../components/FilterRightBar";
import FormDisplay from "../components/FormDisplay";
import Tooltip from "@mui/material/Tooltip";
import { Checkbox, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { fetchShipmentDetail, importJob } from "../api";
import ImportExcelLayout from "../components/ImportExcelLayout";
import { CgImport } from "react-icons/cg";






const vehicles = [
    {
        id: 1,
        saleOrder: 'SOBU-TESLA',
        ticketNo: 'TN8927',
        image: 'https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg',
        numberPlate: '70-1220',
        date: '3/22/2023 2:16:00 PM',
        description: 'ติดตั้ง Demo , ซ่อมแซม/แกไข , ถอนกลับ Onelink',
    },
    {
        id: 2,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description: 'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข',
    },
    {
        id: 3,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description: 'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข',
    },
    {
        id: 4,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description: 'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข',
    },
    {
        id: 5,
        saleOrder: 'SOBU5-21080015',
        ticketNo: 'TN34234',
        image: 'https://i1-vnexpress.vnecdn.net/2021/09/19/VolvoXC4016811568884851jpg-1632041284.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=LL_PP09-d2qEQbB0lNfIDQ&t=image',
        numberPlate: '70-1220',
        date: '3/29/2023 2:29:41 PM',
        description: 'ติดตั้งใหม่ , ติดตั้ง Demo , ถอนกลับ Onelink , ซ่อมแซม/แกไข',
    },
];

// const VehicleCard = ({ vehicle }) => {
//     return (
//         <div className="card focus:shadow-2xl hover:shadow-2xl w-full border bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
//             <div className="flex items-center p-4">
//                 <img
//                     src={vehicle.image}
//                     alt={vehicle.numberPlate}
//                     className="w-11 h-11 object-cover rounded-full mr-4"
//                 />
//                 <div className="flex flex-col">
//                     <h3 className="text-sm font-semibold">Sale Order: {vehicle.saleOrder}</h3>
//                     <p className="text-xs text-gray-500">Ticket No.: {vehicle.ticketNo}</p>
//                 </div>
//             </div>
//             <img src={vehicle.image} alt={vehicle.numberPlate} className="w-full h-2/5 object-cover" />

//             <div className='p-4 h-1/6'>
//                 <p className="text-lg mt-2 font-bold">{vehicle.numberPlate}</p>
//                 <p className="text-xs text-gray-500">{vehicle.date}</p>
//             </div>
//             <p className="text-sm pl-4 pr-4 h-[13%] flex justify-between items-center">{vehicle.description}</p>
//             <div className="pl-4 pr-4">
//                 <div className="flex justify-between items-center mt-auto">
//                     <a href="#" className="text-green-600 text-sm mt-4 block">VIEW MAP (สถานที่)</a>
//                     <div className='flex justify-between items-center'>
//                         <button className="text-green-600 flex-1">🗺️</button>
//                         <button className="text-gray-600 flex-1"><FiTrash2 size={20} /></button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const InstallationManagement = () => {
    const { t } = useTranslation();
    const [criterias, setCriterias] = useState({
        page: 0,
        rowsPerPage: 25,
        // groupId: "",
        // isMapped: false,
    });
    const { data, isLoading, isFetching, isSuccess, refetch } =
        useGetInstallationQuery(criterias);
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false)
    const [triggleSubmit, setTriggleSubmit] = useState(false)
    const [triggleFiter, setTriggleFiter] = useState(false)
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState({})
    const [tableData, settableData] = useState([])
    const [enableCheckbox, setEnableCheckbox] = useState(false)
    const [showImportModal, setShowImportModal] = useState(false)


    const updateFilter = (value) => {
        setCriterias({ ...criterias, ...value });
    };

    const showDetailRow = (params) => {
        // console.log(params)
        setSelectedRow(params)
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
            let findIndex = vehicles.findIndex(i => i.id == selectedRow.id)
            if (findIndex > 0) {
                setSelectedRow(vehicles[findIndex - 1])
            }
        }
    }
    const getNextRow = () => {
        if (selectedRow && selectedRow.id) {
            let findIndex = vehicles.findIndex(i => i.id == selectedRow.id)
            if (findIndex >= 0 && findIndex < vehicles.length - 1) {
                setSelectedRow(vehicles[findIndex + 1])
            }
        }
    }

    const onShowModalDelete = (id) => {
        setOpen(true);
    };


    const onDoneDelete = (e) => {
        setOpen(false)
        setShowDetail(false)
        refetch()
    }
    return (
        <>
            <div className=" flex">
                <div className="h-full min-h-[calc(100vh_-_100px)] lg:mx-auto lg:max-w-full flex-1 transition-all duration-[300ms]">
                    <div className="flex h-full flex-col bg-white shadow-sm">
                        <ImportExcelLayout open={showImportModal} setOpen={setShowImportModal} refetch={refetch} apiPath={importJob} />
                        <div className="pl-4 h-[50px] border-b sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {t("Installation")}
                                </h1>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex justify-between items-center">
                                <Button
                                    className="btn-primary py-[6px] px-3 rounded-[7px] bg-primary-900 text-[13px] text-white mr-2"
                                    onClick={() => setShowImportModal(true)}
                                    startIcon={<CgImport  className="h-5 w-5" />}
                                    > Import Excel</Button>
                                <Button
                                    variant="contained"
                                    className="px-6 capitalize flex-1"
                                    startIcon={<FiUserPlus className="h-5 w-5" />}
                                    onClick={() => {
                                        setOpenForm(true)
                                    }}
                                >
                                    {t("add")}
                                </Button>
                                <div className="h-6 border-solid border-l-2 border-gray-300 ml-2 mr-3"></div>
                                <button className="text-gray-600 flex-1"><BsFilter size={22} /></button>

                            </div>
                        </div>
                    </div>
                    <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 106px)' }}>
                        <h3 className="text-lg font-semibold mb-2">Finished</h3>

                        <Grid container spacing={2} columns={{ xs: 2, sm: 6, md: 12 }}>
                            {vehicles.map((vehicle, index) => (
                                <Grid item
                                    xs={showDetail ? 12 : 2}
                                    sm={showDetail ? 12 : 3}
                                    md={showDetail ? 12 : 3} key={index}>
                                    <div className="card focus:shadow-2xl hover:shadow-2xl w-full border bg-white rounded-lg shadow-md overflow-hidden h-[400px]" onClick={() => showDetailRow(vehicle)}>
                                        <div className="flex items-center p-4">
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.numberPlate}
                                                className="w-11 h-11 object-cover rounded-full mr-4"
                                            />
                                            <div className="flex flex-col">
                                                <h3 className="text-sm font-semibold">Sale Order: {vehicle.saleOrder}</h3>
                                                <p className="text-xs text-gray-500">Ticket No.: {vehicle.ticketNo}</p>
                                            </div>
                                        </div>
                                        <img src={vehicle.image} alt={vehicle.numberPlate} className="w-full h-2/5 object-cover" />

                                        <div className='p-4 h-1/6'>
                                            <p className="text-lg mt-2 font-bold">{vehicle.numberPlate}</p>
                                            <p className="text-xs text-gray-500">{vehicle.date}</p>
                                        </div>
                                        <p className="text-sm pl-4 pr-4 h-[13%] flex justify-between items-center">{vehicle.description}</p>
                                        <div className="pl-4 pr-4">
                                            <div className="flex justify-between items-center mt-auto">
                                                <a href="#" className="text-green-600 text-sm mt-4 block">VIEW MAP (สถานที่)</a>
                                                <div className='flex justify-between items-center'>
                                                    <button className="text-gray-700 flex-1 mr-5"><CiCircleChevRight size={20} /></button>
                                                    <button className="text-gray-600 flex-1"><FiTrash2 size={20} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
                <div className={(showDetail ? 'w-7/12' : 'w-[0px]') + " transition-all duration-[300ms]  border-l"}>
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
                                        {/* <IoFilterOutline className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" /> */}
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
            <DeleteInstallation open={open} setOpen={onDoneDelete} deleteId={selectedRow?.id} />
        </>
    );
};

export default InstallationManagement;
