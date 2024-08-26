import React, { useEffect, useState } from "react";
// import Modal from "@mui/material/Modal";
import { XIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Box, Button, Modal, Typography } from "@mui/material";
import { useEditTripMutation } from "../../services/apiSlice";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomNumberField from "../FormField/CustomNumberField";
import { useSelector } from "react-redux";

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

const EditTrip = ({ openEditTrip, setOpen, triggleSubmit, shipment }) => {
    const { t } = useTranslation();
    const [EditTrip, { isLoading }] = useEditTripMutation();
    const {selectedShipment} = useSelector(state => state.shipment)

    const schema = yup.object().shape({
        tripNumber: yup
            .number()
            .positive()
            .min(1, 'Trip value must greater than 1')
            .max(999, 'Trip value not valid')
    });


    const handleClose = () => {
        reset()
        setOpen(false);
    };

    useEffect(_ => {
        console.log(123, selectedShipment)
        if (selectedShipment && selectedShipment.shipmentId && openEditTrip) {
            // submitForm1(onSubmit)()
            reset({id: selectedShipment.shipmentId, tripNumber: selectedShipment.tripNumber})
        }
    }, [openEditTrip, selectedShipment])

    const {
        control,
        handleSubmit: submitForm1,
        reset,
        getValues,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            id: "",
            tripNumber: 1,
        },
    });

    const onSubmit = async () => {
        if(isValid){
            const formData = getValues();
            const transformData = {
                id: selectedShipment.shipmentId,
                tripNumber: formData.tripNumber,
            }
            try {
                await EditTrip(transformData);
                toast.success(t("Update Trip Number success"))
                setOpen(false);
                handleClose()
            } catch (error) {
                console.log(error);
                if (error?.status === 500) {
                    toast.error(
                        "The system encountered an abnormal error, please try again later."
                    );
                } else {
                    toast.error(error?.message || error?.data?.title);
                }
                handleClose();
            }
        }
    };

    return (

        <Modal
            open={openEditTrip}
            onClose={handleClose}
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
                        {t("Change trip number:")}
                        <span className="ml-2 font-medium text-orange-500">

                        </span>
                    </Typography>
                    <div className="mt-5 space-y-4">

                        <div>

                            <div className="mt-4 border p-3">
                            <div className="font-medium">Shipment: <span className="text-orange-500">{selectedShipment?.shipmentId}</span></div>
                                {<Box>
                                        
                                        <Grid>
                                            <div className="overflow-auto">
                                                <div className="flex min-h-0 flex-1 flex-col">

                                                    <div className="relative flex">
                                                        <div className="px-4 sm:px-6 w-full h-full">
                                                            <div className="space-y-6 pt-6 pb-5">

                                                                <CustomNumberField
                                                                    name="tripNumber"
                                                                    label="tripNumber"
                                                                    control={control}
                                                                    errors={errors.tripNumber}
                                                                    required
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Grid>

                                    </Box>

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

export default EditTrip;
