import React, { useEffect, useState } from "react";
// import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Autocomplete, Grid, Box, Button, Chip, Modal, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useResendDeliveryOrderMutation } from "../../services/apiSlice";
import toast from "react-hot-toast";

const ResendDO = ({ openResendDO, setOpen, listResend = [] }) => {
    const { t } = useTranslation();

    const [rejectDO, { isLoading }] = useResendDeliveryOrderMutation();
   
    const handleClose = () => {
        setOpen(false);
       
    };

    const onSubmit = async () => {
        try {
            const transformData = { deliveryOrderNumber: listResend }
            await rejectDO(transformData);
            toast.success(t("Reject DO Successfully"))
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
    };

    return (

        <Modal
            open={openResendDO}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className=" sm:items-start">
                        <Typography variant="h6" component="h2">
                            {t("Resend Delivery Order : ")}
                            <span className="ml-2 font-medium text-orange-500">

                            </span>
                        </Typography>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Box>
                                <h2 className="my-2">Are you sure Resend Delivery Order List? </h2>
                                <div >
                                    {listResend.map((item, index) => {
                                        return (
                                            <div className="text-orange-500" key={index}>
                                                {item}
                                                <br />
                                            </div>
                                        )

                                    })}
                                </div>
                            </Box>
                        </div>
                    </div>
                    <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            loading={isLoading}
                        >
                            {t("confirm")}
                        </LoadingButton>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                        >
                            {t("cancel")}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ResendDO;
