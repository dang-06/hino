import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useGetInvoiceQuery,
} from "../services/apiSlice";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdOutlineCheckBox, MdOutlineClose } from "react-icons/md";
import { Checkbox, Divider } from "@mui/material";
import { IoChevronBack, IoChevronForward, IoFilterOutline } from "react-icons/io5";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import FormDisplay from "../components/FormDisplay";
import FilterRightBar from "../components/FilterRightBar";
import FormInvoice from "../components/Invoice/FormInvoice";
import DetailInvoice from "../components/Invoice/DetailInvoice";
import FilterInvoice from "../components/Invoice/FilterInvoice";
import { LoadingButton } from "@mui/lab";
import DeleteInvoice from "../components/Invoice/DeleteInvoice";
import { useSearch } from '../context/SearchContext';

const datafake = {
    content: [
        {
            id: 1,
            invoice_no: "IV2102036",
            item_no: 1.00,
            item_quantity: 2.00,
            item_price: 6300.00,
            item_discount_pe: 0,
            item_desc: "Onetrack Hero M DT700 ID9533284 ทะเบียน 1กญู-7547 2.ID9533295 ทะเบียน 1ษษ-3829"
        },
        {
            id: 2,
            invoice_no: "IV2102068",
            item_no: 2.00,
            item_quantity: 1.00,
            item_price: 6750.00,
            item_discount_pe: 0,
            item_desc: "SmartMini4"
        },
        {
            id: 3,
            invoice_no: "IV2102068",
            item_no: 3.00,
            item_quantity: 1.00,
            item_price: 6000.00,
            item_discount_pe: 0,
            item_desc: "BUZZER DT-700 ID9533908 ทะเบียน อูค-3589"
        },
        {
            id: 4,
            invoice_no: "IV2102090",
            item_no: 4.00,
            item_quantity: 1.00,
            item_price: 1401.87,
            item_discount_pe: 0,
            item_desc: "SMALL METAL SQUARE CAMERA ID9513300 ทะเบียน สชช-9853"
        },
        {
            id: 5,
            invoice_no: "IV2102112",
            item_no: 5.00,
            item_quantity: 12.00,
            item_price: 7100.00,
            item_discount_pe: 0,
            item_desc: "DT HINO CONNECT FOR XZU"
        },
        {
            id: 6,
            invoice_no: "IV2102112",
            item_no: 6.00,
            item_quantity: 20.00,
            item_price: 7100.00,
            item_discount_pe: 0,
            item_desc: "DT HINO CONNECT FOR FG8J, FL8J, FM8J"
        },
        {
            id: 7,
            invoice_no: "IV2102134",
            item_no: 7.00,
            item_quantity: 1.00,
            item_price: 4044.86,
            item_discount_pe: 0,
            item_desc: "อุปกรณ์ GPS ให้เช่า"
        },
        {
            id: 8,
            invoice_no: "IV2102135",
            item_no: 8.00,
            item_quantity: 5.00,
            item_price: 9813.00,
            item_discount_pe: 0,
            item_desc: "DT SmartMini4-ZC590"
        },
        {
            id: 9,
            invoice_no: "IV2102135",
            item_no: 9.00,
            item_quantity: 5.00,
            item_price: 0.00,
            item_discount_pe: 0,
            item_desc: "SMALL METAL SQUARE CAMERA ID9534219 2.ID9534105 3.ID9534134 4.ID95353970 5.ID9534..."
        },
        {
            id: 10,
            invoice_no: "AI2103001",
            item_no: 10.00,
            item_quantity: 1.00,
            item_price: 108750.00,
            item_discount_pe: 0,
            item_desc: "เงินมัดจำลำลิขิต"
        }
    ],
    totalElements: 10,
    size: 25,
};

const InvoiceManagement = () => {
    const { t } = useTranslation();
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
    const [criterias, setCriterias] = useState({
        page: 0,
        rowsPerPage: 25,
    });
    const { data, isLoading, isFetching, isSuccess, refetch } =
        useGetInvoiceQuery(criterias);
    const { searchTerm } = useSearch();

    const filteredData = React.useMemo(() => {
        return datafake.content.filter(item =>
            item.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.item_desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

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


    const updateFilter = (value) => {
        setCriterias({ ...criterias, ...value });
    };


    const onDoneDelete = (e) => {
        setOpen(false)
        setShowDetail(false)
        refetch()
    }


    const columns = [
        {
            field: "id",
            headerName: t("id"),
            renderCell: ({ row }) => (
                <div>
                    {
                        enableCheckbox && (
                            <Checkbox
                                sx={{
                                    '&.MuiCheckbox-root': { padding: 0 },
                                    '& .MuiSvgIcon-root': { fontSize: 28 },
                                }}
                                className="mr-2"
                                checked={selectedCheckbox[row.id] || false} readOnly />
                        )
                    }
                    {row.id}
                </div>
            ),
            minWidth: 150,
        },
        {
            field: "invoice_no",
            headerName: "Invoice No",
            minWidth: 150,
        },
        {
            field: "item_no",
            headerName: "Item No",
            minWidth: 100,
        },
        {
            field: "item_quantity",
            headerName: "Quantity",
            minWidth: 100,
        },
        {
            field: "item_price",
            headerName: "Price",
            minWidth: 120,
            renderCell: ({ row }) => `฿${row.item_price.toLocaleString()}`,
        },
        {
            field: "item_discount_pe",
            headerName: "Discount %",
            minWidth: 100,
            renderCell: ({ row }) => `${row.item_discount_pe}%`,
        },
        {
            field: "item_desc",
            headerName: "Description",
            minWidth: 300,
        },
        // {
        //   field: "action",
        //   headerName: t("action"),
        //   minWidth: 150,
        //   renderCell: (params) => (
        //     <div className="flex gap-2">
        //       <Tooltip title={t("updateInvoice")} placement="top-start" arrow>
        //             <a
        //             onClick={() => onShowEdit(params.row)}
        //             className="group cursor-pointer rounded-lg border border-gray-200 p-1 text-indigo-500 hover:bg-indigo-500"
        //             >
        //             <AiFillEdit className="h-5 w-5 group-hover:text-white" />
        //             </a>
        //         </Tooltip>
        //       <Tooltip title={t("delete")} placement="top-start" arrow>
        //         <a
        //           href="#"
        //           className="group rounded-lg border border-gray-200 p-1 hover:bg-red-500"
        //           onClick={() => onShowModalDelete(params.row.id)}
        //         >
        //           <TrashIcon className="h-5 w-5 text-red-500 group-hover:text-white" />
        //         </a>
        //       </Tooltip>
        //     </div>
        //   ),
        // },
    ];

    return (
        <>
            <div className=" flex">
                <div className="flex-1 transition-all duration-[300ms]">

                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            {/* <ImportFromExcel open={showImportModal} setOpen={setShowImportModal} refetch={refetch} /> */}
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
                                        <div className="title text-[16px]">
                                            {t('Invoice')}
                                        </div>
                                        <div className="action flex items-center gap-[8px]">
                                            {/* <button className="btn-primary py-[6px] px-3 rounded-[7px] bg-primary-900 text-[13px] text-white" onClick={() => setOpenForm(true)}>+ {t('add')}</button>
                                            <Divider orientation="vertical" flexItem variant="middle" />
                                            &nbsp;
                                            <AiOutlineExpandAlt className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                            <button onClick={() => setEnableCheckbox(true)}>
                                                <MdOutlineCheckBox className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                            </button> */}
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
                                    getRowId={(row) => row.id}
                                    rows={filteredData || []}
                                    headerHeight={38}
                                    rowHeight={38}
                                    // checkboxSelection
                                    onRowClick={(params) => showDetailRow(params)}
                                    columns={columns}
                                    selectionModel={selectedRow?.id}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    paginationMode="server"
                                    rowCount={datafake?.totalElements || 0}
                                    pageSize={datafake?.size || 25}
                                    onPageChange={(page) => { setCriterias({ ...criterias, page }) }}
                                    onPageSizeChange={(rowsPerPage) => { setCriterias({ ...criterias, rowsPerPage }) }}
                                />
                            </div>

                            <DeleteInvoice open={open} setOpen={onDoneDelete} deleteId={selectedRow?.id} />

                        </div>
                    </div>
                </div>
                <div className={(showDetail ? 'w-[600px]' : 'w-[0px]') + " transition-all duration-[300ms]  border-l"}>
                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <div className="title text-[16px]">
                                {t('Invoice')}
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
                    <div className="h-[calc(100vh_-_110px)] lg:mx-auto lg:max-w-full p-[16px] overflow-auto">
                        <div className="max-w-[700px] p-4 min-h-[50vh] bg-white border m-auto ">
                            {showDetail && (openEdit ? <FormInvoice selectedItem={selectedRow} refetch={() => { refetch(); setOpenEdit(false) }} triggleSubmit={triggleSubmit} setTriggleSubmit={setTriggleSubmit} setOpenForm={setShowDetail} submitError={() => setTriggleSubmit(false)} /> : <DetailInvoice detailRow={selectedRow} />)}
                        </div>
                    </div>
                </div>
            </div>
            <FilterRightBar open={openFilter} setOpen={setOpenFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter}>
                <FilterInvoice fleets={[]} filter={criterias} setFilter={updateFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter} />
            </FilterRightBar>
            <FormDisplay open={openForm} setOpen={setOpenForm} >
                <FormInvoice selectedItem={null} refetch={refetch} setTriggleSubmit={setTriggleSubmit} setOpenForm={setOpenForm} />
            </FormDisplay>
        </>
    );
};

export default InvoiceManagement;


