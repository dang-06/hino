import React, { useEffect, useState } from "react";
// import Modal from "@mui/material/Modal";
import axios from "axios";
import { XIcon } from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomDateField from "../FormField/CustomDateField";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Autocomplete, Grid, Box, Button, Chip, Modal, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import {
    useMoveDeliveryOrderToShipmentMutation,
    useSplitDeliveryOrderMutation,
    useAddDoToShipmentMutation,
    useLazyGetShipmentsOrderQuery,
    useSplitResultDeliveryOrderMutation
} from "../../services/apiSlice";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomNumberField from "../FormField/CustomNumberField";
import { MdOutlineExpandMore } from "react-icons/md";
import { useSelector } from "react-redux";
import CustomTextField from "../FormField/CustomTextField";
import CustomAsyncSelect from "../FormField/CustomAsyncSelect";

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

const MoveDoToShipmentAnother = ({ openMoveDOToShipment, listShipment = [], setOpen, listMove = [] }) => {
    const { t } = useTranslation();

    const [moveDO, { isLoading, isError }] = useMoveDeliveryOrderToShipmentMutation();
    const [splitResultDO, { getDataSplit, isFetching: fetchingStaff }] = useSplitResultDeliveryOrderMutation();
    const [shipmentNew, setShipmentNew] = useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Before Split DO', 'After Split DO'];
    const { selectedShipmentAddDO } = useSelector(state => state.shipment)

    const [fetchShipment, { data: listShipment1, isLoading2, isFetching, isSuccess }] = useLazyGetShipmentsOrderQuery();

    useEffect(_ => {
        if (selectedShipmentAddDO && selectedShipmentAddDO.id) {

            reset({ shipmentId: selectedShipmentAddDO.shipmentId })
        }
    }, [selectedShipmentAddDO])

    useEffect(_ => {
        if (openMoveDOToShipment) {
            fetchShipment({
                page: 0,
                rowsPerPage: 1000,
                shipmentStatus: [1],
            })
        }
    }, [openMoveDOToShipment])

    const schema = yup.object().shape({
        shipmentId: yup
            .string()
            .required(t("message.validation.required", { field: t("shipmentId") }))

    });


    const {
        control,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            shipmentId: "",
        },
    });

    const handleClose = () => {
        setOpen(false);
        // setOpenModalDelete(false)
        reset({});
        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };



    const onSubmit = async () => {
        try {
            const dataShipment = getValues()
            const shipmentData = dataShipment.shipmentId
            const formData = { deliveryOrderNumber: listMove, shipmentIdNew: shipmentData, }
            const response = await moveDO(formData)
            if (response?.error?.status == 500) {
                toast.error(
                    "The system encountered an abnormal error, please try again later."
                );
                return
            }
            toast.success(t("message.success.delete", { field: 'Move Delivery Order' }));
            handleClose()
            setOpen(false);
            
        } catch (error) {
            if (error?.status === 500) {
                toast.error(
                    "The system encountered an abnormal error, please try again later."
                );
            } else {
                toast.error(error?.message || error?.data?.title);
            }
            //   handleClose();
        }
    };


    return (
        <Modal
            open={openMoveDOToShipment}
            // onClose={hanleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{

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
                        {t("Move Delivery Order : ")}
                        <span className="ml-2 font-medium text-orange-500">

                        </span>
                    </Typography>
                    <div className="mt-5 space-y-4">

                        <div>

                            <div className="">
                                {activeStep == 0 && (
                                    // count
                                    <Box>
                                        <Grid>
                                            <div className="overflow-auto">
                                                <div className="flex min-h-0 flex-1 flex-col">

                                                    <div className="relative flex">
                                                        <div className="px-4 sm:px-6 w-full h-full">
                                                            <div className="space-y-6 pt-2 pb-5">

                                                                <CustomAsyncSelect
                                                                    className="w-full"
                                                                    label="Shipment"
                                                                    data={listShipment1?.content.map((item) => ({
                                                                        id: item.shipmentId,
                                                                        text: `${item.shipmentId} (${item.deliveryOrderList.length} DO)`,
                                                                    }))}
                                                                    multiple={false}
                                                                    isFetching={isFetching}
                                                                    isLoading={isLoading}
                                                                    defaultValue={selectedShipmentAddDO?.id ? {
                                                                        id: selectedShipmentAddDO.shipmentId,
                                                                        text: `${selectedShipmentAddDO.shipmentId} (${selectedShipmentAddDO.deliveryOrderList.length} DO)`,
                                                                    } : null}
                                                                    // onChange={handleChange}
                                                                    onChange={(e) => {
                                                                        // set
                                                                        setValue('shipmentId', e, { shouldValidate: true })
                                                                        // setSelectedShipment(e)
                                                                    }}
                                                                    control={control}
                                                                    value={shipmentNew}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Grid>
                                        <h2>List Delivery Order move to new Shipment: </h2>
                                        <div >
                                            {listMove.map((item, index) => {
                                                return (
                                                    <span className="text-orange-500" key={index}>
                                                        {item}
                                                        <br />
                                                    </span>
                                                )

                                            })}
                                        </div>
                                    </Box>
                                )

                                }
                            </div>
                        </div>

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
                                disabled={errors['shipmentId']}
                                onClick={onSubmit}
                                variant="contained"
                                loading={isLoading}
                            >
                                {t("confirm")}
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default MoveDoToShipmentAnother;
