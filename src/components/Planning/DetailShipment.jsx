
import dayjs from "dayjs";
import arraySupport from 'dayjs/plugin/arraySupport'
import React, { Fragment, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Step, StepLabel, Stepper, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { FaBoxOpen, FaExpand } from "react-icons/fa";
import { MdOutlineExpand, MdOutlineExpandCircleDown } from "react-icons/md";
import { GoChecklist } from "react-icons/go";

import PropTypes from 'prop-types';
import { BsBox2 } from "react-icons/bs";
import { FaTruckArrowRight } from "react-icons/fa6";
import { IoCheckmarkCircleSharp, IoChevronBack, IoPencil } from "react-icons/io5";
import { expenseTypesObject, shipmentStatus, shipmentStatusObject } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedExpense, toggleExpenseForm } from "../../features/shipment/shipmentSlice";
import { formatMoney } from "../../utils/common";
import { useGetShipmentDetailQuery, useLazyGetShipmentDetailQuery } from "../../services/apiSlice";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
    },
    [`&.${stepConnectorClasses.root}`]: {
        top: 22,
        marginLeft: '25px'
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            // backgroundImage:
            //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            // backgroundImage:
            //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        //   border: 0,
        //   backgroundColor:
        //     theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        //   borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    backgroundColor: 'transparent',
    zIndex: 1,
    color: '#ccc',
    width: 50,
    border: '1px solid #ccc',
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '25px',
    position: 'relative',
    span: {
        //     content: '""', // "''" will also work.
        //     position: 'absolute',
        //     top: -8,
        //     right: -8,
        //     zIndex: 5,
        //     color: '#666',
        //     backgroundColor: '#fff',
        opacity: 0
    },
    ...(ownerState.active && {
        // span: {
        //     opacity: 1
        // },
        //   backgroundImage:
        //     'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        //   boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        color: 'red',
        borderColor: 'red'
    }),
    ...(ownerState.completed && {
        span: {
            opacity: 1
        },
        color: '#666',
        borderColor: '#666'
        //   backgroundImage:
        //     'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <GoChecklist />,
        2: <FaBoxOpen />,
        3: <FaBoxOpen />,
        4: <BsBox2 />,
        5: <FaTruckArrowRight />,
        6: <GoChecklist />,
        7: <GoChecklist />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            <span className="absolute top-[-8px] right-[-8px] z-2 text-[#0fd260] bg-[#fff] content-['']"><IoCheckmarkCircleSharp /></span>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Planning', 'Preparing for Delivery', 'Picking for Delivery', 'On Delivery', 'Delivery Completed'];


const DetailShipment = ({ detailRow }) => {
    const { t } = useTranslation();
    //   const [openEdit, setOpenEdit] = useState(false);
    dayjs.extend(arraySupport);

    const [fetchDetail, {data, isLoading, isFetching}] = useLazyGetShipmentDetailQuery()

    const {selectedShipment} = useSelector(state => state.shipment)

    const dispatch = useDispatch()

    const handleEditExpense = (ex) => {
        if(ex && ex.id){
            dispatch(setSelectedExpense(ex))
            dispatch(toggleExpenseForm(true))
        }
    }


    // useEffect(() => {
        // if(selectedTruckEdit){
        //     console.log(selectedTruckEdit)
        //     const response = fetchTruckDetail(selectedTruckEdit.id)
        //     response.then(i => {
        //         console.log(i.data)
        //         reset(i.data)
        //     })
        // }
        // reset(truck)
        // console.log(detailRow)
        // shipmentStatus[0]['time'] = dayjs(detailRow?.createdAt).subtract(1, 'month').format("DD/MM/YYYY HH:mm")
        // if(detailRow.history && detailRow.history.length > 0){
        //     // console.log(detailRow.history)
        //     const list_order_newest = [...detailRow.history].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            
        //     // console.log(list_order_newest.length, list_order_newest)
        //     // let status2 
        // }
    // }, [detailRow])


 
    const getStatusTime = (status) => {
        let time = ''
        let find = selectedShipment.history.find(i => i.statusId == status)
        if(find && find.createdAt)
            // console.log(find.createdAt.toString().replace('T', ' '))
            return dayjs((find.createdAt).replace('T',' ')).format("DD/MM/YYYY HH:mm:ss")

        return '-'
    }

    const getExpenseBg = (status) => {
        switch(status){
            case 1:
                return 'bg-[#177bd13b]'
            case 3:
                return 'bg-[#12d26040]' 
            case 4:
                return 'bg-[#ff000040]'
            default: 
                return 'bg-[#177bd13b]'
        }
    }

    const onClose = () => {
        // setOpenEdit(false);
        // clearErrors();
        // reset();
    };

    return (
        <>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("shipmentId")}</label>
                <p className="text-[16px] leading-[1.2]">{selectedShipment?.shipmentId}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("totalDO")}</label>
                <p className="text-[16px] leading-[1.2]">{selectedShipment?.deliveryOrderList.length}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("shipmentStatus")}</label>
                    
                <div className="mt-4">

                    <Stepper orientation="vertical" activeStep={selectedShipment?.shipmentStatus} connector={<ColorlibConnector />}>
                        {shipmentStatus.map((item, index) => (
                            <Step key={index} sx={{
                                '.MuiStepLabel-root': {
                                    padding: 0
                                }
                            }}>
                                <StepLabel sx={{
                                    '.MuiStepLabel-label': {
                                        color: '#888'
                                    },
                                    '.Mui-completed': {
                                        color: '#666'
                                    },

                                    '.Mui-active': {
                                        color: 'red !important'
                                    }
                                }} StepIconComponent={ColorlibStepIcon}>
                                    <div className="ml-1">
                                        {item.value}
                                        {selectedShipment?.shipmentStatus >= item.id && <span className="block mt-1 text-[#5f6368]">{getStatusTime(item.id)}</span>}
                                        {/* <span className="block mt-1 text-[#5f6368]">{dayjs(item?.createdAt).subtract(1, 'month').format("DD/MM/YYYY HH:mm")}</span> */}

                                    </div>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                {/* {selectedShipment.shipmentStatus == 1 && <p className="text-[#777] text-[16px] leading-[1.2]">Planning</p>}
                {selectedShipment.shipmentStatus == 2 && <p className="text-[#cc0b0b] text-[16px] leading-[1.2]">Waiting to driver accept</p>}
                {selectedShipment.shipmentStatus == 3 && <p className="text-primary-700 text-[16px] leading-[1.2]">Driver Accepted</p>}
                {selectedShipment.shipmentStatus == 4 && <p className="text-[#00b11f] text-[16px] leading-[1.2]">On Progress</p>}
                {selectedShipment.shipmentStatus == 5 && <p className="text-[#f523f5] text-[16px] leading-[1.2]">Closed</p>} */}
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("createdAt")}</label>
                <p className="text-[16px] leading-[1.2]">{dayjs(selectedShipment?.createdAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
            {/* <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Start shipment at</label>
                <p className="text-[16px] leading-[1.2]">{dayjs(selectedShipment?.createdAt).subtract(1, 'month').format("HH:mm DD/MM/YYYY")}</p>
            </div> */}
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("truck")}</label>
                <p className="text-[16px] leading-[1.2]">{selectedShipment?.plateLicense || t('Not Assign Yet')}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("driver")}</label>
                <p className="text-[16px] leading-[1.2]">{selectedShipment?.driverName || t('Not Assign Yet')}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("staff")}</label>
                <div className="px-3 mt-2">
                    {selectedShipment?.staffs.map((stf, index) => {
                        return (
                            <div key={index} className="leading-[1.5] flex justify-between">
                                <p>{stf.firstName} {stf.lastName} ({stf.staffType})</p>
                                {/* <button>
                                    <FaRegTrashAlt className="h-5 w-5 flex-shrink-0 text-[#cc0b0b] cursor-pointer" aria-hidden="true" />
                                </button> */}
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Total Expense(THB) : <strong>{formatMoney(selectedShipment?.expenses.reduce((acc, current) => acc + Number.parseInt(current.totalMoney), 0))}</strong></label>
                <div className=" mt-2">
                    <table className="min-w-full border" style={{ borderSpacing: 0 }}>
                        <thead className="bg-gray-50">
                            <tr>

                                <td scope="col"
                                    className="text-sx sticky top-0 z-10 w-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-2 px-6 text-left font-medium capitalize tracking-wide text-gray-900 backdrop-blur backdrop-filter">Type</td>
                                <td scope="col"
                                    className="border-l text-sx sticky top-0 z-10 w-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-2 px-6 text-left font-medium capitalize tracking-wide text-gray-900 backdrop-blur backdrop-filter">Money</td>
                                <td scope="col"
                                    className="border-l text-sx sticky top-0 z-10 w-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-2 px-6 text-left font-medium capitalize tracking-wide text-gray-900 backdrop-blur backdrop-filter">Liter</td>
                                <td scope="col"
                                    className="border-l text-sx sticky top-0 z-10 w-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-2 px-6 text-left font-medium capitalize tracking-wide text-gray-900 backdrop-blur backdrop-filter">Details</td>
                                <td scope="col"
                                    className="border-l first-letter:text-sx sticky top-0 z-10 w-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-2 px-6 text-left font-medium capitalize tracking-wide text-gray-900 backdrop-blur backdrop-filter">Note</td>
                                <td scope="col"
                                    className="border-l first-letter:text-sx sticky top-0 z-10 w-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-2 px-6 text-left font-medium capitalize tracking-wide text-gray-900 backdrop-blur backdrop-filter"></td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {selectedShipment?.expenses.map((ex, index) => {
                                return (
                                    <tr key={index} className={getExpenseBg(ex.status)}>
                                        <td className="whitespace-nowrap py-2 pr-2 pl-2 text-left ">{expenseTypesObject[ex.expenseType]}</td>
                                        <td className="whitespace-nowrap py-2 pr-2 pl-2 text-left ">{formatMoney(ex.totalMoney)}</td>
                                        <td className="whitespace-nowrap py-2 pr-2 pl-2 text-left ">{ex.totalLiter}</td>
                                        <td className="whitespace-nowrap py-2 pr-2 pl-2 text-left ">{ex.details}</td>
                                        <td className="whitespace-nowrap py-2 pr-2 pl-2 text-left ">{ex.note}</td>
                                        <td className="whitespace-nowrap py-2 pr-2 pl-2 text-right">
                                            <Tooltip title={'Edit'} placement="bottom-start" arrow>
                                                <button className="rounded-full p-1 outline-none hover:bg-[#f1f1f1]" onClick={() => handleEditExpense(ex)}>
                                                    <IoPencil className="h-5 w-5 flex-shrink-0 text-gray-500 cursor-pointer" aria-hidden="true" />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    {/* {detailRow?.expenses.map((ex, index) => {
                        return (
                            <div key={index} className="leading-[1.5] flex justify-between border-b pb-2 mb-2">
                                <div>
                                    <p>Type: {types[ex.expenseType]}</p>
                                    <p>Total Money: {ex.totalMoney}</p>
                                    <p>Total Liter: {ex.totalLiter}</p>
                                    <p>Note: {ex.note}</p>
                                    <p>Detail: {ex.details}</p>
                                </div>
                                <button>
                                    <FaRegTrashAlt className="h-5 w-5 flex-shrink-0 text-[#cc0b0b] cursor-pointer" aria-hidden="true" />
                                </button>
                            </div>
                        )
                    })} */}
                </div>
            </div>

        </>
    );
};

export default DetailShipment;
