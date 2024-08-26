import LinearProgress from "@mui/material/LinearProgress";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetShipmentsOrderQuery, useLazyGetShipmentsOrderQuery } from "../services/apiSlice";
import { BsFilter } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillEdit, AiOutlineExpandAlt } from "react-icons/ai";
import { Checkbox, Divider, TextField } from "@mui/material";
import { IoFilterOutline } from "react-icons/io5";
import AddTruckForm from "../components/Truck/Form";
import { Transition } from "@headlessui/react";
import { MdOutlineClose } from "react-icons/md";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import FormDisplay from "../components/FormDisplay";
import FilterRightBar from "../components/FilterRightBar";
import { FaAngleRight } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { fetchShipmentDetail, uploadExcelDO } from "../api";
import ImportFromExcel from "../components/Job/ImportFromExcel";
import DetailPlanning from "../components/Planning/DetailPlanning";
import AssignTruck from "../components/Job/AssignTruck";
import AssignDriver from "../components/Job/AssignDriver";
import AddStaff from "../components/Job/AddStaff";
import ImportExcelLayout from "../components/ImportExcelLayout";
import DetailShipment from "../components/Planning/DetailShipment";
import { FaTruckMedical } from "react-icons/fa6";
import { FaTruck, FaUser, FaUserFriends } from "react-icons/fa";
import AssignTruckDriver from "../components/AssignTruckDriver";
import FilterApprovedShipment from "../components/Planning/FilterApprovedShipment";
import GenerateQRCode from "../components/Planning/GenerateQRCode";
import dayjs from "dayjs";
import AddShipmentForm from "../components/Planning/AddShipment";
// import SplitPane from 'react-split-pane';
// import Pane from 'react-split-pane/lib/Pane'


const PlanningManagement = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState({ groupId: null, truckType: null, plateLicence: null, brand: null });
    const [openEdit, setOpenEdit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openModalQrCode, setOpenModalQrCode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showDetail, setShowDetail] = useState(false)
    const [openFormAddShippment, setOpenFormAddShippment] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false)
    const [showAssignTruck, setShowAssignTruck] = useState(false)
    const [showAssignDriver, setShowAssignDriver] = useState(false)
    const [showAddStaff, setShowAddStaff] = useState(false)
    const [triggleSubmit, setTriggleSubmit] = useState(false)
    const [triggleFiter, setTriggleFiter] = useState(false)
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState({})
    const [tableData, settableData] = useState([])
    const [enableCheckbox, setEnableCheckbox] = useState(false)
    const [criterias, setCriterias] = useState({
        page: 0,
        rowsPerPage: 25,
        shipmentStatus: [1],
        dateFrom: dayjs().subtract(1, 'months'),
        dateTo: dayjs(),
    });
    const gridRef = useRef();


    let dataFleet = []
    const [fetchData, { data, isLoading, isFetching, isSuccess }] = useLazyGetShipmentsOrderQuery();

    useEffect(_ => {
        fetchData(criterias)
    }, [])

    const refetch = () => {
        fetchData({ ...criterias, page: 0, })
    }

    useEffect(_ => {
        if (!isFetching) {
            setTimeout(_ => {
                setTriggleFiter(false)

            }, 500)
        }
    }, [isFetching])

    // const [generateQr, {data: dataQr, isFetching: fetchingQr, isLoading: loadingQr, isError: errorQr}] = useShipmentGenerateQRCodeMutation()
    // const { data, isLoading, isFetching, isSuccess, refetch } =
    //     useGetShipmentsQuery(criterias);

    var newData = []
    useEffect(_ => {
        let list = []
        if (data && data?.content?.length > 0) {
            let i = 1
            data.content.forEach((dt, index) => {
                // console.log(dt)
                list.push({ ...dt, key: dt.shipmentId, type: 'SM' })
                if (dt.deliveryOrderList) {
                    let DOList = dt.deliveryOrderList.map(doItem => {
                        let a = ({
                            ...doItem,
                            index: i,
                            type: 'DO',
                            key: doItem.invoiceNo
                        })
                        i++;
                        return a
                    });
                    list = list.concat(DOList)
                }

            })

        }
        console.log(list)
        settableData(list)

    }, [data?.content])

    const updateFilter = (value) => {
        fetchData({ ...criterias, ...value, shipmentStatus: [1] })
        setCriterias({ ...criterias, ...value, shipmentStatus: [1] });
    };

    const getPrevRow = () => {
        if (selectedRow && selectedRow.index) {
            let findIndex = tableData.findIndex(i => i.index == selectedRow.index - 1)
            if (findIndex > 0) {
                setSelectedRow(tableData[findIndex])
            }
        }
    }
    const getNextRow = () => {
        if (selectedRow && selectedRow.index) {
            let findIndex = tableData.findIndex(i => i.index == selectedRow.index + 1)
            if (findIndex >= 0 && findIndex < tableData.length) {
                setSelectedRow(tableData[findIndex])
            }
        }
    }

    const onShowModalDelete = (id) => {
        setSelectedTruck(id);
        setOpen(true);
    };

    const showDetailRow = (params) => {
        // console.log(params)
        if (params.row.type == 'DO') {
            setSelectedRow(params.row)
            if (enableCheckbox) {
                setSelectedCheckbox(prevState => ({
                    ...prevState,
                    [params.id]: prevState[params.id] ? !prevState[params.id] : true
                }))

            } else {
                setShowDetail(true)
            }
            // console.log(params)
        }
        // setSelectedRowID(params.id)
    }

    const handleGenerateQr = async (row) => {
        if (row && row.shipmentId) {
            setOpenModalQrCode(true)
            // const res = await generateQr({shipmentId: row.shipmentId, data: {width: 50, height: 50}}).unwrap()
            // console.log(res)
        }
    }



    const columns = [
        {
            field: "no",
            headerName: t("#No"),
            // headerClass: 'pl-[30px]',
            //   cellClassName: 'pl-[30px]',
            //   headerAlign: 'center',
            //   align: 'center',
            colSpan: ({ row }) => {
                return row.type == 'SM' ? 50 : 1
            },
            sortable: false,
            renderCell: ({ row }) => (
                <div>
                    {row.type == 'SM'
                        ? (
                            <div className="flex items-center ">
                                <div className="text-primary-900 underline font-semibold cursor-pointer" onClick={() => {
                                    setSelectedRow(row)
                                    setShowDetail(true)
                                }}>{row.key}</div>
                                <div className="ml-[50px] flex">
                                    <button className="flex items-center gap-1 btn-primary py-[4px] px-3 rounded-[7px] bg-primary-900 text-[14] text-white" onClick={() => { setShowAssignDriver(true); setSelectedShipment(row); setShowDetail(false) }}> Assign Driver & Truck</button>
                                    <button className="flex ml-3 items-center gap-1 btn-primary py-[4px] px-3 rounded-[7px] bg-primary-900 text-[14] text-white" onClick={() => { setSelectedShipment(row); handleGenerateQr(row) }}> Generate Qr</button>
                                    {/* <button className="flex items-center gap-1 btn-primary py-[4px] px-3 rounded-[7px] bg-primary-900 text-[14] text-white" onClick={() => {setShowAssignDriver(true); setSelectedShipment(row)}}><FaUser /> Assign Driver</button>
                                    <button className="button disabled:opacity-25 flex items-center gap-1 btn-primary py-[4px] px-3 rounded-[7px] ml-3 bg-primary-900 text-[12px] text-white" disabled={row.truckId} onClick={() => {setShowAssignTruck(true); setSelectedShipment(row)}}><FaTruck/> Assign Truck</button> */}
                                    {/* <button className="flex items-center gap-1 btn-primary py-[4px] px-3 rounded-[7px] ml-3 bg-primary-900 text-[12px] text-white" onClick={() => {setShowAddStaff(true); setSelectedShipment(row)}}><FaUserFriends/> Add Staff</button> */}

                                </div>
                            </div>
                        )
                        : (
                            <div>
                                {
                                    enableCheckbox && (
                                        <Checkbox
                                            sx={{
                                                '&.MuiCheckbox-root': { padding: 0 },
                                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                            }}
                                            className="mr-2"
                                            checked={selectedCheckbox[row.invoiceNo] || false} readOnly />
                                    )
                                }
                                {row.index}
                                {/* <input type="checkbox" hidden={!enableCheckbox} checked={selectedCheckbox[row.invoiceNo] || false} readOnly={true}/> {row.index} */}
                            </div>
                        )}
                </div>
            ),
            cellClassName: ({ row }) => row.type == 'SM' ? 'bg-[#f8f9fa]' : '',
            // valueFormatter: ({row}) => (
            //     <div>
            //         {console.log(row)}
            //         {row.type == 'SM' 
            //             ? row.key 
            //             : (
            //                 <div>
            //                     <input type="checkbox" hidden={!enableCheckbox} checked={selectedCheckbox[row.shipmentId] || false} readOnly={true}/> {row.index}
            //                 </div>
            //             )}
            //     </div>),
            width: 80
        },
        {
            field: "companyId",
            headerName: t("idCompany"),
            minWidth: 100,
            //   headerAlign: 'center',
            //
            sortable: false, align: 'center',
        },
        {
            field: "branchId",
            headerName: t("idSiteDC"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "senderId",
            headerName: t("idSender"),
            minWidth: 150,

        },
        {
            field: "senderName",
            headerName: t("senderName"),
            minWidth: 300,
            //   headerAlign: 'center',
            //   align: 'center',
        },
        {
            field: "pickupId",
            headerName: t("idPickup"),
            minWidth: 150,

        },
        //name pickup point
        {
            field: "pickupPoint",
            headerName: t("pickupPoint"),
            minWidth: 150,
        },
        {
            field: "pickupTime",
            headerName: t("pickupTime"),
            minWidth: 150,

        },
        {
            field: "pickupNote",
            headerName: t("pickupNote"),
            minWidth: 150,

        },

        //document Type 1/ 2
        {
            field: "documentType1",
            headerName: t("documentType1"),
            minWidth: 150,

        },
        {
            field: "documentType2",
            headerName: t("documentType2"),
            minWidth: 150,

        },
        {
            field: "deliveryStatus ",
            headerName: t("deliveryStatus"),
            minWidth: 150,

        },

        //document Type 1/ 2
        {
            field: "deliveryType1",
            headerName: t("deliveryType1"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "deliveryType2",
            headerName: t("deliveryType2"),
            minWidth: 150,

        },
        {
            field: "invoiceNo",
            headerName: t("invoiceNo"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "saleOrderNo",
            headerName: t("saleOrderNo"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "documentNo",
            headerName: t("documentNo"),
            minWidth: 150,

        },
        {
            field: "referenceNo",
            headerName: t("referenceNo"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "invoiceDate",
            headerName: t("invoiceDate"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "shipTo",
            headerName: t("shipTo"),
            minWidth: 150,

        },
        //ship to
        // {
        //     field: "deliveryId",
        //     headerName: t("idDelivery"),
        //     minWidth: 150,

        // },
        {
            field: "receiverName",
            headerName: t("receiverName"),
            minWidth: 250,

        },
        {
            field: "receiverPhone",
            headerName: t("receiverPhone"),
            minWidth: 150,

        },
        {
            field: "deliveryPoint",
            headerName: t("deliveryPoint"),
            minWidth: 150,

        },
        {
            field: "areaMasterId",
            headerName: t("idAreaMaster"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "dueDate",
            headerName: t("dueDate"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "productNo",
            headerName: t("productNo"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "ss",
            headerName: t("SS"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "s",
            headerName: t("S"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "m",
            headerName: t("M"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "l",
            headerName: t("L"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "xl",
            headerName: t("XL"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "xxl",
            headerName: t("2xL"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "xxxl",
            headerName: t("3xL"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "xxxxl",
            headerName: t("4xL"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "xxxxxl",
            headerName: t("5xL"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "loadingBox",
            headerName: t("loadingBox"),
            minWidth: 150,

        },

        {
            field: "loadingPiece",
            headerName: t("loadingPiece"),
            minWidth: 150,

        },

        {
            field: "unit",
            headerName: t("unit"),
            minWidth: 150,

        },
        {
            field: "typeOfGood",
            headerName: t("typeOfGood"),
            minWidth: 150,

        },
        {
            field: "loadingWeight",
            headerName: t("loadingWeight"),
            minWidth: 150,

        },
        {
            field: "loadingLiter",
            headerName: t("loadingLiter"),
            minWidth: 150,

        },
        {
            field: "loadingCbm",
            headerName: t("loadingCBM"),
            minWidth: 150,

        },
        {
            field: "loadingTarget",
            headerName: t("loadingTarget"),
            minWidth: 150,

        },
        {
            field: "deliveryNote",
            headerName: t("deliveryNote"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "cod",
            headerName: t("cod"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "shipmentArea",
            headerName: t("areaShipment"),
            minWidth: 150,

        },
        {
            field: "pickupLatitude",
            headerName: t("pickupLatitude"),
            minWidth: 150,

        },
        {
            field: "pickupLongtitude",
            headerName: t("pickupLongtitude"),
            minWidth: 150,

        },
        {
            field: "deliveryLatitude",
            headerName: t("deliveryLatitute"),
            minWidth: 150,

        },
        {
            field: "deliveryLongtitude",
            headerName: t("deliveryLongtitude"),
            minWidth: 150,

        },
        {
            field: "senderPhone",
            headerName: t("senderPhone"),
            minWidth: 150,

        },
        // {
        //     field: "productSize",
        //     headerName: t("productSize"),
        //     minWidth: 150,

        // },
        // {
        //     field: "shipmentType",
        //     headerName: t("shipmentType"),
        //     minWidth: 150,

        // },
        {
            field: "action",
            headerName: "",
            minWidth: 10,
            width: 10,
            cellClassName: 'px-0',
            align: "right",
            renderCell: (params) => (
                <div className="flex gap-2">
                    <FaAngleRight />
                    {/* <AssignDriverToTruck truck={params.row} refetch={refetch} />
                    <Tooltip title={t("updateTruck")} placement="top-start" arrow>
                        <a
                            onClick={() => onShowEdit(params.row)}
                            className="group cursor-pointer rounded-lg border border-gray-200 p-1 text-indigo-500 hover:bg-indigo-500"
                        >
                            <AiFillEdit className="h-5 w-5 group-hover:text-white" />
                        </a>
                    </Tooltip>
                    <Tooltip title={t("delete")} placement="top-start" arrow>
                        <a
                            href="#"
                            className="group rounded-lg border border-gray-200 p-1 hover:bg-red-500"
                            onClick={() => onShowModalDelete(params.row.id)}
                        >
                            <TrashIcon className="h-5 w-5 text-red-500 group-hover:text-white" />
                        </a>
                    </Tooltip> */}
                </div>
            ),
            sortable: false,
        },
    ];
    // const onSelectionChanged = useCallback(() => {
    //     const selectedRows = gridRef.current.api.getSelectedRows();

    //     console.log(selectedRows)
    //     // document.querySelector('#selectedRows').innerHTML =
    //     //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
    //   }, []);


    const onDoneDelete = (e) => {
        setOpen(false)
        setShowDetail(false)
        refetch()
    }

    // const changePane = e => {
    //     if (showDetail) {
    //         setDetailPaneWidth('Nan')
    //     }
    //     let a = e[1]
    //     localStorage.setItem('detailPanel', a)
    // }
    // const [detailPaneWidth, setDetailPaneWidth] = useState(45)

    // useEffect(_ => {
    //     if (!showDetail) {
    //         let a = localStorage.getItem('detailPanel')
    //         if (a) {
    //             setDetailPaneWidth(Number(a.replace('%', '')))
    //         }
    //     }
    // }, [showDetail])

    // useEffect(_ => {
    //     let a = localStorage.getItem('detailPanel')
    //     if (a) {
    //         setDetailPaneWidth(Number(a.replace('%', '')))
    //     }
    // }, [])

    return (
        <>
            <div className=" flex relative h-[calc(100vh_-_57px)]">
                <div className="flex-1 transition-all duration-[300ms]">

                    <div className="bg-white">
                        <div className="h-[50px] border-b px-3 flex justify-between items-center">
                            <ImportExcelLayout open={showImportModal} setOpen={setShowImportModal} refetch={refetch} apiPath={uploadExcelDO} />
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
                                            Planning
                                        </div>
                                        <div className="action flex items-center gap-[8px]">
                                            <button className="btn-primary py-[6px] px-3 rounded-[7px] bg-primary-900 text-[13px] text-white" onClick={() => setOpenFormAddShippment(true)}>+ {t('Add Shipment')}</button>
                                            <button className="btn-primary py-[6px] px-3 rounded-[7px] bg-primary-900 text-[13px] text-white" onClick={() => setShowImportModal(true)}>+ Import Excel</button>
                                            <Divider orientation="vertical" flexItem variant="middle" />
                                            &nbsp;
                                            <IoFilterOutline onClick={() => setOpenFilter(true)} className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                            <AiOutlineExpandAlt className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                            <button onClick={() => setEnableCheckbox(true)}>
                                                <MdOutlineCheckBox className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </div>

                    <div className="h-[calc(100vh_-_110px)] lg:mx-auto lg:max-w-full ">
                        <div className="flex h-full  min-h-[calc(100vh_-_110px)] bg-white ">


                            <div className="flex flex-1 flex-col ag-theme-alpine">

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
                                    getRowId={(row) => row.key}
                                    rows={tableData || []}
                                    headerHeight={38}
                                    disableColumnMenu={true}
                                    // hideFooter={true}
                                    // disableColumnFilter={true}
                                    // dis
                                    rowHeight={38}
                                    // checkboxSelection
                                    onRowClick={(params) => showDetailRow(params)}
                                    columns={columns}
                                    selectionModel={selectedRow?.invoiceNo}
                                    rowsPerPageOptions={[25, 50, 100]}
                                    paginationMode="server"
                                    rowCount={data?.totalElements || 0}
                                    pageSize={data?.size || 25}
                                    onPageChange={(page) => { setCriterias({ ...criterias, page }); fetchData(criterias) }}
                                    onPageSizeChange={(rowsPerPage) => { setCriterias({ ...criterias, page: 0, rowsPerPage }); fetchData(criterias) }}
                                />
                            </div>

                            {/* <DeleteTruck open={open} setOpen={onDoneDelete} truckId={selectedTruck} /> */}

                        </div>
                    </div>
                </div>
                <div className={(showDetail ? 'w-[600px]' : 'w-[0px]') + " transition-all duration-[300ms]  border-l"}>
                    <div className="bg-white">
                        <div className="py-1 h-[50px] border-b px-3 flex justify-between items-center">
                            <div className="title text-[16px]">
                                {selectedRow?.type == 'DO' ? 'Delivery order details' : 'Shipment details'}
                            </div>
                            <div className="action flex items-center gap-[8px]">
                                {openEdit ? (
                                    <>
                                        <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                            <button onClick={() => setOpenEdit(false)} className="btn-primary border py-[5px] px-3 rounded-[5px] text-primary-900 border-primary-500 hover:bg-primary-100 text-[13px]">
                                                <span>Cancel</span>
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                            <button onClick={() => setTriggleSubmit(true)} className="btn-primary py-[6px] px-4 rounded-[5px] flex items-center bg-primary-900 text-[13px] text-white">
                                                <span>Save</span>
                                            </button>
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem variant="middle" />
                                    </>
                                ) : (
                                    <>
                                        {/* <Tooltip title={'Delete'} placement="bottom-start" arrow>
                                            <button onClick={() => onShowModalDelete(selectedRow.id)} className="p-1 outline-none hover:bg-[#f1f1f1] border rounded-[5px]">
                                                <FaRegTrashAlt className="h-6 w-6 flex-shrink-0 text-primary-900 cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                            <button onClick={() => setOpenEdit(true)} className="btn-primary py-[6px] px-3 rounded-[5px] flex items-center bg-primary-900 text-[13px] text-white">
                                                <FaEdit className="mr-2" />
                                                <span>Edit</span>
                                            </button>
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem variant="middle" /> */}
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
                            {showDetail && (selectedRow.type == 'DO' ? <DetailPlanning detailRow={selectedRow} /> : <DetailShipment detailRow={selectedRow} />)}
                        </div>
                    </div>
                </div>

            </div>

            <FilterRightBar open={openFilter} setOpen={setOpenFilter} triggleFilter={triggleFiter} setTriggleFiter={setTriggleFiter} >
                <FilterApprovedShipment menu="closed" filter={criterias} setFilter={updateFilter} triggleFiter={triggleFiter} setTriggleFiter={setTriggleFiter} />
            </FilterRightBar>
            <FormDisplay open={openForm} setOpen={setOpenForm} >
                {/* <AddTruckForm1 fleets={[]} setOpenForm={setOpenForm} /> */}
            </FormDisplay>
            <AssignTruckDriver shipment={selectedShipment} open={showAssignDriver} setOpen={setShowAssignDriver} refetch={refetch} />
            <GenerateQRCode shipment={selectedShipment} open={openModalQrCode} setOpen={setOpenModalQrCode} />
            {/* <AssignTruck shipment={selectedShipment} refetch={refetch} open={showAssignTruck} setOpen={setShowAssignTruck}/> */}
            {/* <AssignDriver shipment={selectedShipment} refetch={refetch} open={showAssignDriver} setOpen={setShowAssignDriver}/> */}
            {/* <AddStaff shipment={selectedShipment} refetch={refetch} open={showAddStaff} setOpen={setShowAddStaff}/> */}
            <FormDisplay open={openFormAddShippment} setOpen={setOpenFormAddShippment} >
                <AddShipmentForm selectedItem={null} refetch={refetch} setTriggleSubmit={setTriggleSubmit} setOpenFormAddShippment={setOpenFormAddShippment} />
            </FormDisplay>
        </>
    );
};

export default PlanningManagement;
