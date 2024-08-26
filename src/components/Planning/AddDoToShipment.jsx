

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
    useAddDoToShipmentMutation,
    useAssignDriverMutation,
    useDeliveryOrderUpdateStatusMutation,
    useGetStaffsQuery,
    useLazyGetShipmentsOrderQuery,
    useShipmentAddStaffMutation,
    useShipmentUpdateStatusMutation,
} from "../../services/apiSlice";
import CustomAsyncSelect from "../FormField/CustomAsyncSelect";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomSelect from "../FormField/CustomSelect";
import { shipmentStatus } from "../../constants/constants";
import { useSelector } from "react-redux";

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

const AddDoToShipment = ({ refetch, open, setOpen, setOpenFormAddShipment, listDO=[] }) => {
    const { t } = useTranslation();
    //   const [open, setOpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null)

    const {selectedShipmentAddDO} = useSelector(state => state.shipment)

    const [updateShipment, { isLoading: isLoading1, isError: isError1, error: error1 }] = useAddDoToShipmentMutation();

    const [fetchShipment, { data: listShipment, isLoading, isFetching, isSuccess }] = useLazyGetShipmentsOrderQuery();

    useEffect(_ => {
        if(selectedShipmentAddDO && selectedShipmentAddDO.id){

            reset({shipmentId: selectedShipmentAddDO.shipmentId})
        }
    }, [selectedShipmentAddDO])

    useEffect(_ => {
        fetchShipment({
            page: 0,
            rowsPerPage: 1000,
            shipmentStatus: [1],
        })
    }, [])

    const schema = yup.object().shape({
        shipmentId: yup
          .string()
          .required(t("message.validation.required", { field: t("shipmentId") }))
    });


    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            shipmentId: "",
        },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setOpenFormAddShipment(false)
        reset({});
        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };

    const onSubmit = async (data) => {
        try {
            const formData = {deliveryOrderId: listDO.map(i => i.id), ...data}
            await updateShipment(formData)
            toast.success( t("message.success.update", {field: 'Delivery Order'}));
            handleClose()
            // shipmentId
            // if(shipment.deliveryOrderId){
            //     await updateDO({deliveryId: shipment.id, status}).unwrap()
            //     toast.success( t("message.success.update", {field: 'Delivery Order'}));
            //     refetch();
            //     handleClose();
            // }else{
            //     let check = shipment.deliveryOrderList.some(i => i.status < 8)
            //     if(!check){
            //         toast.error('All Delivery must be finished before close shipment');
            //         return;
            //     }
            //     await updateShipment({id: shipment.shipmentId, status}).unwrap()
            //     toast.success( t("message.success.update", {field: t('Shipment')} ));
            //     refetch();
            //     handleClose();
            // }
        //   await addStaff({...data, shipmentId: shipment.shipmentHashString}).unwrap();
           
        //   toast.success(
        //     t("message.success.assigned", { from: t("shipment"), to: t("driver") })
        //   );
        } catch (error) {
        //   console.log(error);
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
        <div>
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
                        {t("Add Delivery Order to Shipment")}
                    </Typography>
                    <div className="mt-4 space-y-5">
                        {/* {shipment?.deliveryOrderId && <p className="font-medium">
                            {t("Delivery Order")}: <span className="text-orange-500">{shipment?.id}</span>
                        </p>}
                        {!shipment?.deliveryOrderId && <p className="font-medium">
                            {t("Shipment")}: <span className="text-orange-500">{shipment?.shipmentId}</span>
                        </p>} */}

                        <CustomAsyncSelect
                            className="w-full"
                            label="Shipment"
                            data={listShipment?.content.map((item) => ({
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
                                // console.log(e)
                                // setSelectedShipment(e)
                            }}
                            control={control}
                        />
                        <span></span>
                        {/* <CustomSelect
                            name="status"
                            label="Status"
                            control={control}
                            // errors={errors.isActive}
                            options={(listShipment?.content || []).map(ship => {
                                return {id: ship.shipmentId, value: `${ship.shipmentId} (${ship.deliveryOrderList.length} DO)`}
                            })}
                        /> */}
                        <div>
                            List of Delivery Order:
                        {listDO.map(i => {
                            return (
                                <div key={i.id}>
                                    {i.id}
                                </div>
                            )
                            
                        })}
                        </div>
                    
                        <div className="text-right">
                            <Button className="mr-4" variant="outlined" onClick={handleClose}>Close</Button>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isLoading1}
                                disabled={errors['shipmentId']}
                            >
                                {t("confirm")}
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    </div>
    )
      
    ;
};

export default AddDoToShipment;
