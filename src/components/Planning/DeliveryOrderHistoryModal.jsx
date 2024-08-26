

import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
    useAssignDriverMutation,
    useDeliveryOrderUpdateStatusMutation,
    useGetStaffsQuery,
    useShipmentAddStaffMutation,
    useShipmentUpdateStatusMutation,
} from "../../services/apiSlice";
import CustomAsyncSelect from "../FormField/CustomAsyncSelect";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomSelect from "../FormField/CustomSelect";
import styled from "@emotion/styled";
import { GoChecklist } from "react-icons/go";
import { FaBoxOpen } from "react-icons/fa";
import { BsBox2 } from "react-icons/bs";
import { FaTruckArrowRight } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import PropTypes from 'prop-types';
import { deliveryOrderStatusObject } from "../../constants/constants";
import { Dialog, DialogActions, DialogContent, DialogTitle, Step, StepConnector, StepLabel, Stepper, stepConnectorClasses } from "@mui/material";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import PerfectScrollbar from "react-perfect-scrollbar";
import dayjs from "dayjs";
const baseURL = import.meta.env.VITE_API_URL;
import { MdAddLocationAlt } from "react-icons/md";
import { TbTruckLoading } from "react-icons/tb";
import { LuPackageCheck, LuPackageX } from "react-icons/lu";


const style = {
    position: "absolute",
    top: "20px",
    left: "50%",
    bottom: '20px',
    transform: "translateX(-50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 2,
    p: 3,
};


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
    const { active, completed, className, error } = props;

    const icons = {
        1: <GoChecklist />,
        2: <MdAddLocationAlt />,
        3: <TbTruckLoading />,
        4: <LuPackageCheck />,
        // 4: <BsBox2 />,
        5: <FaTruckArrowRight />,
        6: <GoChecklist />,
        7: <GoChecklist />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {props.error ? (
                <>
                    <span className="absolute top-[-8px] right-[-8px] z-2 text-[#0fd260] bg-[#fff] content-['']"><IoCheckmarkCircleSharp /></span>
                    <LuPackageX /> 
                </>
            ) : (
                <>
                    <span className="absolute top-[-8px] right-[-8px] z-2 text-[#0fd260] bg-[#fff] content-['']"><IoCheckmarkCircleSharp /></span>
                    {icons[String(props.icon)]}
                </>
            )}
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


const DeliveryOrderHistoryModal = ({ refetch, open, setOpen, data }) => {
    const { t } = useTranslation();
    const [ history, setHistory] = useState([])
    const [ openGallery, setOpenGallery ] = useState(false)
    const [ photoIndex, setPhotoIndex ] = useState(0);
    const [ photoSrc, setPhotoSrc ] = useState([])
    //   const [open, setOpen] = useState(false);
  

    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }
    
    useEffect(_ => {
        if (data && data.id) {
            console.log(data)
            let unique = getUniqueListBy((data.history || []), 'action')
            console.log(unique)
            let mapImageHistory = [...unique].map(his => {
                let images = []
                let type = []
                let action_ = his.action.replace('_FINISH', '');
                switch(his.action){
                    case 'CHECK_IN_FINISH': 
                        type = [2,3];
                        break;
                    case 'LOADING_FINISH':
                        type = [4,5];
                        break;
                    case 'LOADING_COMPLETED_FINISH': 
                        type = [6,7];
                        break;
                    case 'DELIVERY_FINISH': 
                        type = [8, 9];
                        action_ = 'DELIVERY_FINISH'
                        break;
                    case 'DELIVERY_REJECT': 
                        type = [10, 11];
                        break
                }
                images = (data.documents || []).filter(d => type.includes(d.documentType)).map(i => baseURL+i.documentPath)
                return {...his, action_, images};
            })
            setHistory([{action_: 'CREATED', createdAt: dayjs(data.createdAt)}, ...mapImageHistory])

        }
    }, [data])

    

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // reset();

        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };

    

    return (
        <div>
            {/* <p onClick={handleOpen} className="text-[#377EF0] cursor-pointer text-[13px] mt-3">+ Add Staff</p> */}

            {/* <Button onClick={handleOpen} className="text-white">
        +
        
      </Button> */}
            <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    '.MuiDialog-paper': {
                        maxWidth: 800,
                        minWidth: 500
                    },
                    '&.MuiModal-root': {
                        zIndex: 999
                    }
                }}
            >
                <DialogTitle className="text-center text-[20px]">Delivery Order History Tracking</DialogTitle>
                <DialogContent>
                    <div className="">
                        <div className="pb-5">
                            <h4 className="text-xl">Shipment: {data?.shipmentId}</h4>
                            <p>Delivery Invoice: {data?.invoiceNo}</p>
                        </div>
                        <Stepper orientation="vertical" activeStep={9} connector={<ColorlibConnector />}>
                            
                            {history.map((item, index) => (
                                <Step key={index} sx={{
                                    '.MuiStepLabel-root': {
                                        padding: 0,
                                        // overflow: 'hidden',
                                        // minHeight: '60px'
                                    }
                                }}>
                                    <StepLabel error={item.action == 'DELIVERY_REJECT' ? true : false} sx={{
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
                                        <div className="ml-2">

                                            {item.action_}  <span className=" ml-1 text-[#5f6368]">({dayjs(item?.createdAt).format("DD/MM/YYYY HH:mm")})</span>
                                           
                                            {/* {item.images && <div className="text-primary-900 underline cursor-pointer"  onClick={() => {
                                                            setPhotoIndex(0);
                                                            setPhotoSrc(item.images);
                                                            setOpenGallery(true)
                                                        }}>View Image</div>} */}
                                            <PerfectScrollbar >
                                                <div className="flex gap-2">
                                                    {item.images && item.images.map((img, index) => (
                                                        <img key={index} className="cursor-pointer min-w-[50px] w-[50px] h-[50px] border rounded overflow-hidden p-1" src={img} onClick={() => {
                                                            setPhotoIndex(index);
                                                            setPhotoSrc(item.images);
                                                            setOpenGallery(true)
                                                        }}/>
                                                    ))}
                                                </div>
                                            </PerfectScrollbar>
                                        </div>

                                    </StepLabel>
                                </Step>
                            ))}
                            
                            {/* {(Object.values(deliveryOrderStatusObject)).map((label) => (
                                <Step key={label} sx={{
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
                                    }} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                            ))} */}
                        </Stepper>
                    </div>
                </DialogContent>
                <DialogActions sx={{
                    '&.MuiDialogActions-root': {
                        flexDirection: 'column',
                        alignItems: 'baseline'
                    }
                }}>

                    <div className="flex px-2 flex-1 items-centers w-full gap-[20px] ml-0">
                        {/* <Button className="flex-1" size="large" variant="contained" disabled={!checked} onClick={checkedPolicy}>Agree</Button> */}
                        <Button className="flex-1" variant="outlined" size="large" onClick={handleClose}>Close</Button>
                    </div>
                </DialogActions>
            </Dialog>
            
            {openGallery && <Lightbox
                mainSrc={photoSrc[photoIndex]}
                nextSrc={photoSrc[(photoIndex + 1) % photoSrc.length]}
                prevSrc={photoSrc[(photoIndex + photoSrc.length - 1) % photoSrc.length]}
                onCloseRequest={() => setOpenGallery(false)}
                onMovePrevRequest={() => setPhotoIndex((photoIndex + photoSrc.length - 1) % photoSrc.length)}
                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % photoSrc.length)}
            />}

        </div>
    );
};

export default DeliveryOrderHistoryModal;
