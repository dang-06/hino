

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
import { shipmentStatus } from "../../constants/constants";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 2,
    p: 3,
};

const ChangeStatus = ({ refetch, open, setOpen, shipment }) => {
    const { t } = useTranslation();
    //   const [open, setOpen] = useState(false);

    const [updateShipment, { isLoading: isLoading1, isError: isError1, error: error1 }] = useShipmentUpdateStatusMutation();
    const [updateDO, { isLoading: isLoadingaddStaff, isError, error }] = useDeliveryOrderUpdateStatusMutation();

    const schema = yup.object().shape({
        // staffId: yup
        //   .string()
        //   .required(t("message.validation.required", { field: t("fullName") }))
        //   .nullable(),
    });



    useEffect(_ => {
        if(shipment &&  shipment.id){
            reset({status: shipment.deliveryOrderId ? shipment.status : shipment.shipmentStatus})
        }
    }, [shipment])

    // const types = [
    //   {id: 1, value: "HELPER"},
    //   {id: 2, value: "CLERKER"},
    //   {id: 3, value: "Exp. Second Driver"}
    // ]

    // const listShipmentStatus = [
    //     {id: 1, value: "Planning", disabled: true},
    //     {id: 2, value: "Assigned", disabled: true},
    //     {id: 3, value: "Driver Accepted", disabled: true},
    //     {id: 4, value: "Start"},
    //     {id: 5, value: "Completed"},
    //     {id: 6, value: "Closed"},
    // ]

    const listDOStatus = [
        {id: 1, value: "Not Started"},
        {id: 2, value: "Checkin start"},
        {id: 3, value: "Checkin finish"},
        {id: 4, value: "Loading start"},
        {id: 5, value: "Loading finish"},
        {id: 6, value: "Loading complete start"},
        {id: 7, value: "Loading complete finish"},
        {id: 8, value: "Delivery finish"},
        {id: 9, value: "Delivery Reject"},
    ]

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            status: "",
        },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();

        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };

    const onSubmit = async ({status}) => {
        console.log(shipment, status)
        try {
            if(shipment.deliveryOrderId){
                await updateDO({deliveryId: shipment.id, status}).unwrap()
                toast.success( t("message.success.update", {field: 'Delivery Order'}));
                refetch();
                handleClose();
            }else{
                let check = shipment.deliveryOrderList.some(i => i.status < 8)
                if(!check){
                    toast.error('All Delivery must be finished before close shipment');
                    return;
                }
                await updateShipment({id: shipment.shipmentId, status}).unwrap()
                toast.success( t("message.success.update", {field: t('Shipment')} ));
                refetch();
                handleClose();
            }
        //   await addStaff({...data, shipmentId: shipment.shipmentHashString}).unwrap();
           
        //   toast.success(
        //     t("message.success.assigned", { from: t("shipment"), to: t("driver") })
        //   );
        } catch (error) {
        //   console.log(error);
        //   if (error?.status === 500) {
        //     toast.error(
        //       "The system encountered an abnormal error, please try again later."
        //     );
        //   } else {
            toast.error(error?.message || error?.data?.title);
        //   }
        //   handleClose();
        }
    };

    return (
        <div>
            {/* <p onClick={handleOpen} className="text-[#377EF0] cursor-pointer text-[13px] mt-3">+ Add Staff</p> */}

            {/* <Button onClick={handleOpen} className="text-white">
        +
      </Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    ".MuiBox-root": {
                        top: '20%'
                    }
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
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h6" component="h2">
                            {t("Update Status")}
                        </Typography>
                        <div className="mt-4 space-y-5">
                            {shipment?.deliveryOrderId && <p className="font-medium">
                                {t("Delivery Order")}: <span className="text-orange-500">{shipment?.id}</span>
                            </p>}
                            {!shipment?.deliveryOrderId && <p className="font-medium">
                                {t("Shipment")}: <span className="text-orange-500">{shipment?.shipmentId}</span>
                            </p>}

                            <CustomSelect
                                name="status"
                                label="Status"
                                control={control}
                                setValue={setValue}
                                // errors={errors.isActive}
                                options={shipment?.deliveryOrderId ? listDOStatus : shipmentStatus}
                            />
                          
                            <div className="text-right">
                                <Button className="mr-4" variant="outlined" onClick={handleClose}>Close</Button>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    loading={isLoadingaddStaff || isLoading1}
                                >
                                    {t("confirm")}
                                </LoadingButton>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ChangeStatus;
