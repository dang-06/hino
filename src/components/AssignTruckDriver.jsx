import { XIcon } from "@heroicons/react/outline";
import { LoadingButton } from "@mui/lab";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Autocomplete, Box, Button, Chip, Modal, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {  useGetDriversQuery, useGetStaffsQuery, useGetTruckTypeQuery, useGetTrucksQuery, useLazyGetDriversQuery, useLazyGetStaffsQuery, useLazyGetTrucksQuery, useShipmentAddStaffMutation, useShipmentAssignDriverMutation, useShipmentAssignTruckDriverStaffMutation, useShipmentAssignTruckMutation, useLazyGetListDriverUsersApprovedShipmentQuery } from "../services/apiSlice";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineExpandMore } from "react-icons/md";

import { result } from "lodash";
import { useSelector } from "react-redux";
import { CustomAsyncSelect } from ".";
import { listStaffType } from "../constants/constants";
import { FaTrash } from "react-icons/fa";

const style = {
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 2,
    p: 3,
};

const steps = [ 'Assign Truck', 'Assign Driver', 'Add Staff', ];


const AssignTruckDriver = ({ open, setOpen, info, setInfo, refetch }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0)
    const [shipment, setShipment] = useState(null)

    const {selectedShipment} = useSelector(state => state.shipment)

    useEffect(_ => {
        if(selectedShipment && selectedShipment.shipmentId){
            setShipment(selectedShipment)
        }
    }, [selectedShipment])
    
    
    const [selectedStaff, setSelectedStaff] = useState([])
    const [selectedDriver, setSelectedDriver] = useState(null)
    const [selectedTruck, setSelectedTruck] = useState(null)
    const siteLocation = useSelector(state => state.mapLocation)
    const handleClose = () => {
        setActiveStep(0);
        setSelectedDriver(null)
        setSelectedStaff([])
        setSelectedTruck(null)
        setOpen(false);
        // reset();
        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };

    // const listStaffType = [
    //     {id: 'พนักงานยกสินค้า', value: 'พนักงานยกสินค้า'}, // Người khuân vác
    //     {id: 'พนักงานขับรถ', value: 'พนักงานขับรถ'}, // Tài xế phụ
    //     {id: 'เด็กรถ', value: 'เด็กรถ'}, // Xe trẻ em
    // ]

    const {data: dataTruckType} = useGetTruckTypeQuery({page: 0, rowsPerPage: 1000})

    const [filterStaff, setFilterStaff] = useState({ idSite: null, staffPosition: '', page: 0, rowsPerPage: 1000 })
    const [filterTruck, setFilterTruck] = useState({ idSiteDc: null, carCharactersId: '', page: 0, rowsPerPage: 1001 })
    const [filterDriver, setFilterDriver] = useState({ branchId: null, page: 0, rowsPerPage: 1000 })

    // useEffect(_ => {
    //     console.log(selectedStaff)
    // }, [selectedStaff]) 

    // const dataTruck = []
    const [fetchStaff, { data: dataStaff, isFetching: fetchingStaff, isLoading: loadingStaff }] = useLazyGetStaffsQuery();
    const [fetchDriver, { data: dataDriver, isFetching: fetchingDriver }] = useLazyGetListDriverUsersApprovedShipmentQuery();
    // const [fetchDriver2, { data: dataDriver2, isFetching: fetchingDriver2 }] = useLazyGetListDriverUsersApprovedShipmentQuery();
    const [fetchTruck, { data: dataTruck, isFetching: fetchingTruck }] = useLazyGetTrucksQuery({}, {skip: true, enable: false, refetchOnFocus: false});

    const [assignShipment, {isLoading: isLoadingAssign, isError: isErrorAssign, error: errorAssign, isSuccess: isSuccessAssign}] = useShipmentAssignTruckDriverStaffMutation();

    const [assignDriver, { isLoading: isLoadingAssignDriver, isError: isErrorDriver, error: errorDriver, isSuccess: isSuccessDriver }] =
        useShipmentAssignDriverMutation();

    const [assignTruck, { isLoading: isLoadingAssignTruck, isError: isErrorTruck, error: errorTruck, isSuccess: isSuccessTruck }] =
        useShipmentAssignTruckMutation();

    const [addStaff, { isLoading: isLoadingAddStaff, isError: isErrorStaff, error: errorStaff, isSuccess: isSuccessStaff }] =
        useShipmentAddStaffMutation();

    useEffect(_ => {
        // console.log(shipment, open)
        if (shipment && shipment.shipmentId && open) {
            // console.log(shipment)
            // if(shipment.)
            // setFilterStaff({...filterStaff, })
            const idSite = shipment?.deliveryOrderList ? shipment?.deliveryOrderList[0].branchId : null
            fetchStaff({...filterStaff, idSite})
            fetchDriver({...filterDriver, branchId: idSite})
            setFilterStaff({...filterStaff, idSite})
            // setFilterTruck({...filterTruck, idSite})
            setFilterDriver({...filterDriver, branchId: idSite})
            fetchTruck({...filterTruck, idSiteDc: idSite})
           
        }
        // if (shipment?.truckId && data.content) {
        //     let find = data.content.find(i => i.truckId == shipment.truckId)
        //     if (find) {
        //         setSelectedTruck(find)
        //     }
        // }
        // if (shipment?.staffs && shipment?.staffs.length > 0 && dataStaff.content) {
        //     setSelectedStaff([...shipment?.staffs])
        // }
    }, [shipment, open])

    const handleSubmit = async () => {
        try {
            let promises = []
            let flag = false
            if (!shipment.driverId && selectedDriver) {
                // console.log(!shipment.truckId && !selectedTruck)
                if (!shipment.truckId && !selectedTruck) {
                    toast.error('Please select truck to approve plan')
                    setActiveStep(0)
                    // alert('1')
                    return
                }
                // console.log(shipment?.staffs.length,selectedStaff.length)
                // if(selectedStaff.length == 0){
                //     toast.error('Please add staff to approve plan')
                //     setActiveStep(1)
                //     return
                // }
                flag = true
                // alert(2)
            }

            // if (!shipment.truckId && selectedTruck) {
            //     promises.push(assignTruck({ shipmentId: shipment.key, truckId: selectedTruck.truckId }).unwrap())
            // }
            // if (selectedStaff && selectedStaff.length > 0) {
            //     let ids = selectedStaff.map(i => i.staffId)
            //     promises.push(addStaff({ shipmentId: shipment.shipmentHashString, staffIds: ids }))
            // }
            // if (flag) {
            //     promises.push(assignDriver({ shipmentId: shipment.key, driverId: selectedDriver.driverId }).unwrap())
            // }



            // const aT = async () => {
            //     await assignTruck({shipmentId: shipment.key, truckId: selectedTruck.truckId})
            //     toast.success('Assign truck success')
            //     if(!shipment.truckId && selectedTruck){
            //     }
            // }
            // const aD = async () => {
            //     await assignDriver({shipmentId: shipment.key, driverId: selectedDriver.driverId})
            //     toast.success('Assign driver success')
            //     if(!shipment.driverId &&selectedDriver){
            //     }
            // }
            // aT()
            // aD()
            // if (promises.length == 0) {
            //     handleClose()
            //     return
            // }
            // await Promise.allSettled(promises).then(response => {
            //     if (response.some(r => r.status == 'rejected')) {
            //         throw e
            //     }
            // })
            let ids = selectedStaff.map(i => i.staffId)
            await assignShipment({
                truckId: selectedTruck?.truckId || '', 
                shipmentId: shipment.key,
                driverId: selectedDriver.driverId,
                staffIds: ids || '',
            }).unwrap()
            toast.success('Assign success shipment ' + shipment.key)
            // refetch()
            handleClose()
        } catch (e) {
            console.log(e)
            let mess = e?.data?.title || 'Something wrong. Please try again later or contact administrator!'
            toast.error(mess)
        }

        // handleClose()
        // console.log(selectedTruck, selectedStaff, selectedDriver)
    }


    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return 3;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleSearchTruck = () => {
        // console.log(filterTruck)
        console.log(123)
        fetchTruck({...filterTruck})
    }

    const handleSearchStaff = () => {
        // console.log(filterTruck)
        fetchStaff({...filterStaff})
    }

    const handleSearchDriver = () => {
        // console.log(filterTruck)
        fetchDriver({...filterDriver})
    }



    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const isErrorStep = (step) => {
        if(step != 1){

        }else if(step != 2){}
    }


    return (
        <>
            {open && <Modal
                open={open}
                // onClose={hanleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    // ".MuiBox-root": {
                    //     top: '50px',
                    //     transform: 'translateX(-50%)'
                    // }
                }}
            >
                <Box sx={style}>
                    <button
                        type="button"
                        className="absolute right-3 top-3 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={handleClose}
                    >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <form noValidate >
                        <Typography variant="h6" component="h2">
                            {t("Assign Truck & Driver")}
                            <span className="ml-2 font-medium text-orange-500">
                                {shipment?.key}
                            </span>
                        </Typography>
                        <div className="mt-5 space-y-4">
                            {/* <p className="font-medium">
                                {t("shipmentId")}: <span className="text-orange-500">{shipment?.key}</span>
                            </p> */}
                            <div>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((label, index) => {
                                        const labelProps = {};
                                            // if()
                                        return (
                                            <Step key={index}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        )
                                    }
                                        
                                        // <Step key={2}>
                                        //     <StepLabel>{'Add Staff'}</StepLabel>

                                        // </Step>
                                        // <Step key={3}>
                                        //     <StepLabel>{'Assign Driver'}</StepLabel>
                                        // </Step>
                                    )}
                                </Stepper>
                                <div className="mt-4 border p-3">
                                    {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                        Step {activeStep + 1}
                                    </Typography> */}
                                    {activeStep == 0 && (
                                        <Box>
                                            {/* <Controller
                                                name="truckId"
                                                control={control}
                                                render={({ field: { onChange } }) => ( */}

                                            <Accordion defaultExpanded={true}>
                                                <AccordionSummary
                                                    expandIcon={<MdOutlineExpandMore />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                >
                                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                        Filter Truck
                                                    </Typography>
                                                    {/* <Typography sx={{ color: 'text.secondary' }}>{}</Typography> */}
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div className="flex gap-3">

                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-siteID"
                                                            options={siteLocation?.listSiteLocation || []}
                                                            fullWidth
                                                            disabled={fetchingTruck}
                                                            size="small"
                                                            // value={filterStaff.idSite || ''}
                                                            defaultValue={shipment?.deliveryOrderList ? shipment?.deliveryOrderList[0].branchId : null}
                                                            onChange={(e, value) => {
                                                                if(value){
                                                                    setFilterTruck(prevState => ({
                                                                        ...prevState,
                                                                        idSiteDc: value.idSite
                                                                    }))
                                                                }else{
                                                                    setFilterTruck(prevState => ({
                                                                    ...prevState,
                                                                    idSiteDc: null
                                                                }))}

                                                                //or
                                                                //setFilterTruck(prevState => ({
                                                                    // ...prevState,
                                                                    // idSiteDc: value? value.idSite : null
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label={t("idSite")}
                                                                    required
                                                                />
                                                            )}
                                                            getOptionLabel={(option) => {
                                                                return option?.idSite || option || ''
                                                            }}
                                                            isOptionEqualToValue={(option, value) =>
                                                                option?.idSite === value
                                                            }
                                                            renderOption={(props, option) => (
                                                                <li
                                                                    {...props}
                                                                    style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                                                                    className="grid cursor-pointer gap-px p-2 hover:bg-gray-200"
                                                                    key={option.idSite}
                                                                >
                                                                    <p className="font-medium text-amber-800">
                                                                        {option.idSite}
                                                                    </p>
                                                                    <p className="">{option.siteName}</p>
                                                                    {/* <p className="">{option.trucks[0].plateLicense}</p> */}
                                                                </li>
                                                            )}
                                                        />
                                                        
                                                    </div>
                                                    <div className="mt-3 text-right">
                                                        <Button variant="outlined" onClick={handleSearchTruck}>Reload Truck</Button>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                            <br />

                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={dataTruck?.content || []}
                                                fullWidth
                                                disabled={fetchingTruck}
                                                size="small"
                                                value={selectedTruck || {}}
                                                // inputValue={""}

                                                defaultValue={selectedTruck}
                                                onChange={(event, newValue) => {
                                                    // setSelectedTruck(
                                                    //     data?.content.find((x) => x.truckId === newValue.truckId)
                                                    // );
                                                    setSelectedTruck(newValue)
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t("licensePlate")}
                                                        // error={!!errors.truckId}
                                                        // helperText={errors ? errors.truckId?.message : ""}
                                                        required
                                                    />
                                                )}
                                                getOptionLabel={(option) => option?.plateLicense || ""}
                                                isOptionEqualToValue={(option, value) =>
                                                    option.truckId === value.truckId
                                                }
                                                renderOption={(props, option) => (
                                                    <li
                                                        {...props}
                                                        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                                                        className="grid cursor-pointer gap-px p-2 hover:bg-gray-200"
                                                        key={option.truckId}
                                                    >
                                                        <p className="font-medium text-amber-800">
                                                            {option.truckId}
                                                        </p>
                                                        <p className="">{option.plateLicense}</p>
                                                        {/* <p className="">{option.trucks[0].plateLicense}</p> */}
                                                    </li>
                                                )}
                                            />
                                            {/* )}
                                            /> */}

                                        </Box>
                                    )}
                                    {
                                        activeStep == 2 && (
                                            <Box>
                                                {/* <Controller
                                                name="truckId"
                                                control={control}
                                                render={({ field: { onChange } }) => ( */}

                                                <Accordion defaultExpanded={true}>
                                                    <AccordionSummary
                                                        expandIcon={<MdOutlineExpandMore />}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                            Filter Staff
                                                        </Typography>
                                                        {/* <Typography sx={{ color: 'text.secondary' }}>{}</Typography> */}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div className="flex gap-3">

                                                            <Autocomplete
                                                                disablePortal
                                                                id="combo-box-siteID"
                                                                options={siteLocation?.listSiteLocation || []}
                                                                fullWidth
                                                                disabled={fetchingStaff}
                                                                size="small"
                                                                // value={filterStaff.idSite || ''}
                                                                defaultValue={shipment?.deliveryOrderList ? shipment?.deliveryOrderList[0].branchId : null}
                                                                onChange={(e, value) => {
                                                                    if(value){
                                                                        setFilterTruck(prevState => ({
                                                                            ...prevState,
                                                                            idSiteDc: value.idSite
                                                                        }))
                                                                    }else{
                                                                        setFilterTruck(prevState => ({
                                                                        ...prevState,
                                                                        idSiteDc: null
                                                                    }))}
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label={t("idSite")}
                                                                        // required
                                                                    />
                                                                )}
                                                                getOptionLabel={(option) => {
                                                                    return option?.idSite || option || ''
                                                                }}
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option?.idSite === value
                                                                }
                                                                renderOption={(props, option) => (
                                                                    <li
                                                                        {...props}
                                                                        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                                                                        className="grid cursor-pointer gap-px p-2 hover:bg-gray-200"
                                                                        key={option.idSite}
                                                                    >
                                                                        <p className="font-medium text-amber-800">
                                                                            {option.idSite}
                                                                        </p>
                                                                        <p className="">{option.siteName}</p>
                                                                        {/* <p className="">{option.trucks[0].plateLicense}</p> */}
                                                                    </li>
                                                                )}
                                                            />
                                                            <Autocomplete
                                                            disablePortal
                                                            id="combo-box-staffPosition"
                                                            options={listStaffType || []}
                                                            fullWidth
                                                            disabled={fetchingStaff}
                                                            // disabled={shipment?.truckId ? true : false}
                                                            size="small"
                                                            onChange={(e, value) => setFilterStaff(prevState => ({
                                                                ...prevState,
                                                                staffPosition: value?.id || null
                                                            }))}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label={t("Staff Type")}
                                                                    // required
                                                                />
                                                            )}
                                                            getOptionLabel={(option) => {
                                                                return option?.value || ''
                                                            }}
                                                            isOptionEqualToValue={(option, value) =>
                                                                option?.id === value
                                                            }
                                                            renderOption={(props, option) => (
                                                                <li
                                                                    {...props}
                                                                    // style={}
                                                                    className="grid cursor-pointer gap-px p-2 hover:bg-gray-200"
                                                                    key={option.id}
                                                                >
                                                                    <p className="font-medium text-amber-800">
                                                                        {option.value}
                                                                    </p>
                                                                </li>
                                                            )}
                                                        />
                                                        </div>
                                                        <div className="mt-3 text-right">
                                                            <Button variant="outlined" onClick={handleSearchStaff}>Reload Staff</Button>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            <br />
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo1"
                                                    options={dataStaff?.content || []}
                                                    fullWidth
                                                    disabled={fetchingStaff}
                                                    // multiple
                                                    size="small"
                                                    // inputValue={""}
                                                    // defaultValue={selectedStaff}
                                                    onChange={(event, newValue) => {
                                                        
                                                        if(newValue){

                                                            let find = selectedStaff.findIndex(i => i.staffId == newValue.staffId)
                                                            if(find < 0){
                                                                setSelectedStaff([...selectedStaff, newValue])
                                                            }
                                                        }
                                                    }}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip variant="outlined" key={index} label={option?.firstName + option.lastName} {...getTagProps({ index })} />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label={t("Staff")}
                                                            // error={!!errors.truckId}
                                                            // helperText={errors ? errors.truckId?.message : ""}
                                                            // required
                                                        />
                                                    )}
                                                    getOptionLabel={(option) => option?.staffType || ""}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.staffId === value.staffId
                                                    }
                                                    renderOption={(props, option) => (
                                                        <li
                                                            {...props}
                                                            style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                                                            className="grid cursor-pointer gap-px p-2 hover:bg-gray-200"
                                                            key={option.staffId}
                                                        >
                                                            <p className="font-medium text-amber-800">
                                                                {option?.staffType}
                                                            </p>
                                                            <p className="">{option.firstName} {option.lastName}</p>
                                                            {/* <p className="">{option.trucks[0].plateLicense}</p> */}
                                                        </li>
                                                    )}
                                                />

                                            </Box>
                                        )
                                    }
                                    {
                                        activeStep == 1 && (
                                            <Box>
                                                {/* <Controller
                                                name="truckId"
                                                control={control}
                                                render={({ field: { onChange } }) => ( */}
                                                <Accordion defaultExpanded={true}>
                                                    <AccordionSummary
                                                        expandIcon={<MdOutlineExpandMore />}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                            Filter Driver
                                                        </Typography>
                                                        {/* <Typography sx={{ color: 'text.secondary' }}>{}</Typography> */}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div className="flex gap-3">

                                                            <Autocomplete
                                                                disablePortal
                                                                id="combo-box-siteID"
                                                                options={siteLocation?.listSiteLocation || []}
                                                                fullWidth
                                                                disabled={fetchingDriver}
                                                                // disabled={shipment?.truckId ? true : false}
                                                                size="small"
                                                                // value={filterStaff.idSite || ''}
                                                                defaultValue={shipment?.deliveryOrderList ? shipment?.deliveryOrderList[0].branchId : null}
                                                                onChange={(e, value) => {
                                                                    if(value){
                                                                        setFilterTruck(prevState => ({
                                                                            ...prevState,
                                                                            idSiteDc: value.idSite
                                                                        }))
                                                                    }else{
                                                                        setFilterTruck(prevState => ({
                                                                        ...prevState,
                                                                        idSiteDc: null
                                                                    }))}
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label={t("idSite")}
                                                                        required
                                                                    />
                                                                )}
                                                                getOptionLabel={(option) => {
                                                                    return option?.idSite || option || ''
                                                                }}
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option?.idSite === value
                                                                }
                                                                renderOption={(props, option) => (
                                                                    <li
                                                                        {...props}
                                                                        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                                                                        className="grid cursor-pointer gap-px p-2 hover:bg-gray-200"
                                                                        key={option.idSite}
                                                                    >
                                                                        <p className="font-medium text-amber-800">
                                                                            {option.idSite}
                                                                        </p>
                                                                        <p className="">{option.siteName}</p>
                                                                        {/* <p className="">{option.trucks[0].plateLicense}</p> */}
                                                                    </li>
                                                                )}
                                                            />
                                                            
                                                        </div>
                                                        <div className="mt-3 text-right">
                                                            <Button variant="outlined" onClick={handleSearchDriver}>Reload Driver</Button>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <br />
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo2"
                                                    options={dataDriver?.content || []}
                                                    fullWidth
                                                    size="small"
                                                    disabled={fetchingDriver}
                                                    // value={selectedDriver || {}}
                                                    // inputValue={""}

                                                    // defaultValue={selectedDriver}
                                                    onChange={(event, newValue) => {
                                                        // setSelectedTruck(
                                                        //     data?.content.find((x) => x.truckId === newValue.truckId)
                                                        // );
                                                        setSelectedDriver(newValue)
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label={t("Driver")}
                                                            // error={!!errors.truckId}
                                                            // helperText={errors ? errors.truckId?.message : ""}
                                                            required
                                                        />
                                                    )}
                                                    getOptionLabel={(option) => option?.fullName || ""}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.id === value.id
                                                    }
                                                    renderOption={(props, option) => (
                                                        <li
                                                            {...props}
                                                            style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
                                                            className="grid cursor-pointer gap-px p-2 hover:bg-gray-200"
                                                            key={option.id}
                                                        >
                                                            <p className="font-medium text-amber-800">
                                                                {option.driverId}
                                                            </p>
                                                            <p className="">{option.fullName}({option.branchId})</p>
                                                            {/* <p className="">{option.trucks[0].plateLicense}</p> */}
                                                        </li>
                                                    )}
                                                />
                                                {/* )}
                                            /> */}

                                            </Box>
                                        )
                                    }
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button variant="outlined" disabled={activeStep == 2} onClick={handleNext} sx={{ mr: 1 }}>
                                            Next
                                        </Button>
                                        {/* {activeStep !== 3 &&
                                            (completed[activeStep] ? (
                                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                    Step {activeStep + 1} already completed
                                                </Typography>
                                            ) : (
                                                <Button onClick={handleComplete}>
                                                    {completedSteps() === totalSteps() - 1
                                                        ? 'Finish'
                                                        : 'Complete Step'}
                                                </Button>
                                            ))} */}
                                    </Box>
                                </div>
                            </div>
                            <Alert severity="info">
                                {selectedDriver && (
                                    <div>
                                        <p>
                                            - <span className="font-medium">{t("Driver")}:</span>{" "}
                                            {selectedDriver.fullName}({selectedDriver.branchId})
                                        </p>
                                    </div>
                                )}
                                {selectedTruck && (<div>
                                    <p>
                                        - <span className="font-medium">{t("Truck")}:</span>{" "}
                                        {selectedTruck.plateLicense}
                                    </p>
                                </div>)}
                                {(selectedStaff.length > 0) && (
                                    <div>
                                        <p>
                                            - <span className="font-medium">{t("Staff")}:</span>&nbsp;
                                            {selectedStaff.map((staff, index) => {
                                                return (
                                                    <span className="block pl-4" key={staff?.staffId}>
                                                        {staff?.firstName} {staff?.lastName}({staff?.staffType}) 
                                                        <span className="inline-block ml-2 cursor-pointer">
                                                            <FaTrash className="text-[#EF4444]" onClick={() => {
                                                                // console.log(index)
                                                                setSelectedStaff([
                                                                    ...selectedStaff.filter(i => i.staffId != staff.staffId)
                                                                ])
                                                            }}/>
                                                        </span>
                                                    </span>
                                                )
                                            })}
                                            <span></span>
                                        </p>
                                    </div>
                                )}
                               
                            </Alert>
                            <div className="text-right">
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={handleClose}
                                    sx={{ mr: 1 }}
                                >
                                    Cancel
                                </Button>
                                <LoadingButton
                                    type="button"
                                    disabled={!selectedDriver || !selectedDriver?.driverId || !selectedTruck || !selectedTruck?.truckId}
                                    onClick={handleSubmit}
                                    variant="contained"
                                    loading={isLoadingAssignDriver || isLoadingAssignTruck || isLoadingAddStaff}
                                >
                                    {t("confirm")}
                                </LoadingButton>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>}
            
        </>

    );
};

export default AssignTruckDriver;
