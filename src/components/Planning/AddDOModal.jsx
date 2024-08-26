import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FiUserPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useAddTruckMutation, useLazyGetUnAssignDOQuery, useAddDeliveryOrderMutation, useAddDoToShipmentMutation } from "../../services/apiSlice";
import CustomDateTimeField from "../FormField/CustomDateTimeField";
import CustomDateField from "../FormField/CustomDateField";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomSelect from "../FormField/CustomSelect";
// import { addTruck } from "../../api";
import CustomTextField from "../FormField/CustomTextField";
import { Box, Checkbox, LinearProgress, Modal, Typography } from "@mui/material";
import FilterApprovedShipment from "./FilterApprovedShipment";
import FilterDeliveryOrder from "../Vehicle/FilterDeliveryOrder";
import { convertTypeOfGood } from "../../utils/common";
import { DataGrid } from "@mui/x-data-grid";

const style = {
    position: "absolute",
    // top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: '100%',
    height: '100%',
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 2,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
};

const AddDOModal = ({ shipment, open, setOpen }) => {
    const { t } = useTranslation();
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const [fetchData, { data, isFetching, isLoading, isError }] = useLazyGetUnAssignDOQuery()
    const [updateShipment, { isLoading: isLoading1, isError: isError1, error: error1 }] = useAddDoToShipmentMutation();
    const [dataTable, setDataTable] = useState([])

    const {selectedShipment} = useSelector(state => state.shipment)
    const [triggleFiter, setTriggleFiter] = useState(false)

    const [criterias, setCriterias] = useState({
        page: 0,
        rowsPerPage: 25,
        deliveryStatus: ['D', 'NMDC', 'PLDC', 'RKDC', 'SRDC'],
        status: [-1, 9],
        dateFrom: dayjs().subtract(1, 'months').startOf('day'),
        dateTo: dayjs().endOf('day'),
    });


    useEffect(_ => {
        if (!isFetching) {
            setTimeout(_ => {
                setTriggleFiter(false)

            }, 500)
        }
    }, [isFetching])

    useEffect(_ => {
      
        setDataTable(data?.content)

    }, [data?.content])


    const handleClose = () => {
        setDataTable([])
        setCriterias({
            page: 0,
            rowsPerPage: 25,
            dateFrom: dayjs().subtract(1, 'months').startOf('day'),
            dateTo: dayjs().endOf('day')
        })
        setOpen(false);

        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };

    const updateFilter = (value) => {
        fetchData({ ...criterias, ...value })
        setCriterias({ ...criterias, ...value });
    }

    const handleSubmit = async () => {
        let listDO = [...rowSelectionModel]
        console.log(listDO)
        try {
            const formData = {deliveryOrderNumber: listDO, shipmentId: selectedShipment?.shipmentId}
            await updateShipment(formData)
            toast.success( t("message.success.update", {field: 'Delivery Order'}));
            handleClose()
            
        } catch (error) {
          if (error?.status === 500) {
            toast.error(
              "The system encountered an abnormal error, please try again later."
            );
          } else {
            toast.error(error?.message || error?.data?.title);
          }
        }
    }


    const columns = [
        {
            field: "no",
            headerName: t("#No"),
            filterable: false,
            sortable: false,
            renderCell: (params) => (
                <div>

                    <div className="cursor-pointer" onClick={() => {
                        setSelectedCheckbox(prevState => ({
                            ...prevState,
                            [params.id]: prevState[params.id] ? !prevState[params.id] : true
                        }))
                    }}>
                        {/* {
                            // enableCheckbox && (
                                <Checkbox
                                    sx={{
                                        '&.MuiCheckbox-root': { padding: 0 },
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                    }}
                                    className="mr-2"
                                    checked={selectedCheckbox[params?.row?.id] || false} readOnly />
                            // )
                        } */}
                        {/* {
                            !enableCheckbox && (
                                <Checkbox 
                                    sx={{
                                        '&.MuiCheckbox-root': { padding: 0 },
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                    }}
                                    className="mr-2"
                                    checked={selectedCheckbox[params?.row?.id || false]} readOnly/>
                                    
                            )
                        } */}
                        {/* <Checkbox
                                    sx={{
                                        '&.MuiCheckbox-root': { padding: 0 },
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                    }}
                                    className="mr-2"
                                    checked={selectedCheckbox[params?.row?.id]}/> */}
                        {(params.api.getRowIndex(params.row.id)+((criterias.page)*criterias.rowsPerPage)) + 1}

                        
                    </div>
                </div>
            ),
            width: 80
        },
        {
            field: "senderName",
            headerName: t("senderName"),
            minWidth: 300,
            //   headerAlign: 'center',
            //
            sortable: false,
            // align: 'center',
        },
        // {
        //     field: "status",
        //     headerName: t("status"),
        //     minWidth: 150,
        //     //   headerAlign: 'center',
        //     sortable: false,
        //     renderCell: (params) => (
        //         <div>
        //             {/* <div className={`status-color ${getStatusColor(params?.row?.status ).color}`}> */}
        //             <div disabled={params?.row?.status == 1} className={`status-color ${getStatusColor(params?.row?.status).color} ${params?.row?.status === 1 ? 'bg-gray-row' : ''}`}>
        //                 <span className="p-2">
        //                 {getStatusColor(params?.row?.status).text}
        //                 </span>
        //             </div>
                    
        //         </div>
        //     )
        //     // align: 'center',
        // },
        // {
        //     field: "totalSizes",
        //     headerName: t("Total Sizes"),
        //     minWidth: 150,
        //     renderCell: ({ row }) => (
        //       <div>
        //         {calculateTotalSizes(row)}
        //       </div>
        //     ),
        //   },
        {
            field: "deliveryStatus",
            headerName: t("deliveryStatus"),
            minWidth: 150,
            flex: 1,
            //   headerAlign: 'center',
            //   align: 'center',

            sortable: false,
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
            field: "calculationOrder",
            headerName: t("calculationOrder"),
            minWidth: 150,
            //   headerAlign: 'center',
            //   align: 'center',

            sortable: false,
        },
        {
            field: "deliveryType",
            headerName: t("deliveryType"),
            minWidth: 150,
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


            sortable: false,
        },
        {
            field: "pickupId",
            headerName: t("idPickup"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "pickupTime",
            headerName: t("pickupTime"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "typeOfGood",
            headerName: t("typeOfGood"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "pickupNote",
            headerName: t("pickupNote"),
            minWidth: 150,


            sortable: false,
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
            field: "documentType",
            headerName: t("documentType"),
            minWidth: 150,
            sortable: false,
        },
        {
            field: "documentNo",
            headerName: t("documentNo"),
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
            field: "deliveryId",
            headerName: t("idDelivery"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "receiverName",
            headerName: t("receiverName"),
            minWidth: 250,


            sortable: false,
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
            field: "unit",
            headerName: t("unit"),
            minWidth: 150,


            sortable: false,
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
            field: "loadingBox",
            headerName: t("loadingBox"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "loadingWeight",
            headerName: t("loadingWeight"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "loadingLiter",
            headerName: t("loadingLiter"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "loadingCbm",
            headerName: t("loadingCBM"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "loadingTarget",
            headerName: t("loadingTarget"),
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
            field: "productSize",
            headerName: t("productSize"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "shipmentType",
            headerName: t("shipmentType"),
            minWidth: 150,


            sortable: false,
        },
        {
            field: "shipmentArea",
            headerName: t("areaShipment"),
            minWidth: 150,


            sortable: false,
        },
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


    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="w-[80vw] m-auto h-[80vh]"
            >
                <Box sx={style}>
                    {/* <div> */}

                        <button
                            type="button"
                            className="absolute right-3 top-3 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={handleClose}
                        >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <Typography variant="h6" component="h2">
                            {t("Add Delivery Order to Shipment")}
                        </Typography>
                        <div className="mt-2">
                            {selectedShipment?.deliveryOrderId && <p className="font-medium">
                                {t("Delivery Order")}: <span className="text-orange-500">{selectedShipment?.id}</span>
                            </p>}
                            {!selectedShipment?.deliveryOrderId && <p className="font-medium">
                                {t("Shipment")}: <span className="text-orange-500">{selectedShipment?.shipmentId}</span>
                            </p>}
                        </div>

                        <div>

                        </div>
                        <div className="flex gap-[20px] h-full overflow-hidden">
                            <div className="left-box-filter w-[200px] flex justify-between flex-col overflow-hidden gap-[30px]">
                                <div className="overflow-auto">
                                    <FilterDeliveryOrder menu="unassign" filter={criterias} setFilter={updateFilter} triggleFiter={triggleFiter} setTriggleFiter={() =>{}} />
                                </div>
                                <LoadingButton
                                    onClick={() => {setTriggleFiter(true)}}
                                    type="submit"
                                    variant="contained"
                                    loading={triggleFiter}
                                >
                                    {t("search")}
                                </LoadingButton>
                            </div>
                            <div className="right-box-content flex-1 flex flex-col pt-6">
                                <div className="table-responsive h-full border border-[#ccc]">
                                    <DataGrid
                                        loading={isLoading || isFetching}
                                        components={{
                                            LoadingOverlay: LinearProgress
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
                                        getRowId={(row) => row.deliveryOrderNumber}
                                        rows={dataTable || []}
                                        headerHeight={38}
                                        disableColumnMenu={true}
                                        rowHeight={38}
                                        checkboxSelection={true}
                                        // onRowClick={(params) => showDetailRow(params)}
                                        columns={columns}
                                        onSelectionModelChange={(newRowSelectionModel) => {
                                            console.log(newRowSelectionModel)
                                            setRowSelectionModel(newRowSelectionModel);
                                        }}
                                        keepNonExistentRowsSelected
                                        selectionModel={rowSelectionModel}
                                        rowsPerPageOptions={[25, 50, 100]}
                                        paginationMode="server"
                                        rowCount={data?.totalElements || 0}
                                        pageSize={data?.size || 25}
                                        onPageChange={(page) => { updateFilter({page})}}
                                        onPageSizeChange={(rowsPerPage) => { updateFilter({rowsPerPage}) }}
                                        getRowClassName={(params) => params.row.status !== -1 ? 'red-background' : ''}
                                    />

                                </div>
                                <div className="mt-3">

                                    <div className="text-right">
                                        <Button className="" color="error" variant="outlined" onClick={handleClose}>Close</Button>
                                        <Button disabled={rowSelectionModel.length == 0} className="ml-4" variant="outlined" onClick={handleSubmit}>Confirm</Button>
                                        {/* <Button className="mr-4" variant="outlined" onClick={() => handleSubmit(onSubmit1)()}>Close</Button> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                    

                </Box>
            </Modal>
        </>
    );
};

export default AddDOModal;
