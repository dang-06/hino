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
import { useAddTruckMutation, useShipmentGenerateQRCodeMutation } from "../../services/apiSlice";
import CustomDateTimeField from "../FormField/CustomDateTimeField";
import CustomDateField from "../FormField/CustomDateField";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomSelect from "../FormField/CustomSelect";
// import { addTruck } from "../../api";
import CustomTextField from "../FormField/CustomTextField";
import { Box, Modal, Typography } from "@mui/material";

const style = {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 2,
    p: 3,
};

const GenerateQRCode = ({ shipment, open, setOpen }) => {
    const { t } = useTranslation();

    const [imageSrc, setImageSrc] = useState('')
    const [generateQr, { data, isFetching, isLoading, isError }] = useShipmentGenerateQRCodeMutation()
    const {selectedShipment} = useSelector(state => state.shipment)

    // Validation


    const schema = yup.object().shape({
        size: yup
            .number()
            .positive("Must be a positive value")
            .required("Please enter a number. The field cannot be left blank.") // Sets it as a compulsory field
            .min(1, "Size must be greater than or equal to 1!"),
        // height: yup
        //     .number()
        //     .positive("Must be a positive value")
        //     .required("Please enter a number. The field cannot be left blank.") // Sets it as a compulsory field
        //     .min(1, "Height must be greater than or equal to 1!"),
    });

    useEffect(_ => {
        if (selectedShipment && selectedShipment.shipmentId && open) {
            submitForm1(onSubmit1)()
        }
    }, [open, selectedShipment])

    const {
        control,
        handleSubmit: submitForm1,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            size: 200,
            // height: 200
        },
    });


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setImageSrc('')
        setOpen(false);
        reset();

        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };

    const handleDownload = () => {
        var a = document.createElement("a"); //Create <a>
        a.href = imageSrc; //Image Base64 Goes here
        a.download = "Shipment_" + selectedShipment.shipmentId + ".png"; //File name Here
        a.click(); //Downloaded file
    }

    const onSubmit1 = async ({ size }) => {
        if (imageSrc) {
            setImageSrc('')
        }
        try {
            const shipmentId = selectedShipment.shipmentId
            const formData = { shipmentId, data: { width: size, height: size } }
            // console.log(formData)
            const res = await generateQr(formData).unwrap()
            if (res) {
                setImageSrc('data:image/png;base64,' + res?.imageData)
            }
           
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


    const onClose = () => {
        setOpen(false);
        clearErrors();
        reset();
    };

    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

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
                    <Typography variant="h6" component="h2">
                        {t("Generate Shipment QrCode ")}
                    </Typography>
                    <div className="mt-2">
                        {selectedShipment?.deliveryOrderId && <p className="font-medium">
                            {t("Delivery Order")}: <span className="text-orange-500">{selectedShipment?.id}</span>
                        </p>}
                        {!selectedShipment?.deliveryOrderId && <p className="font-medium">
                            {t("Shipment")}: <span className="text-orange-500">{selectedShipment?.shipmentId}</span>
                        </p>}
                    </div>

                    {/* <form className="mb-4" noValidate onSubmit={submitForm1(onSubmit1)}>
                        <div className="mt-3 space-y-5">
                            <div className="flex items-center gap-5">
                                <CustomNumberField
                                    name="size"
                                    label="Size"
                                    control={control}
                                    errors={errors?.size}
                                    required
                                    className="flex-1"
                                />

                                <LoadingButton
                                    type="submit"
                                    className="h-[38px]"
                                    variant="contained"
                                    loading={isLoading}
                                >
                                    {t("Create")}
                                </LoadingButton>
                            </div>
                        </div>
                    </form> */}
                    <div className="mt-3 min-h-[300px] m-auto flex items-center flex-col">
                        <p>Send QR-code of Shipment to driver to login Driver app.</p>
                        {!imageSrc && <div className="bg-[#0000008a] m-auto">
                                <div className="lds-roller relative z-20"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>}
                        {imageSrc && <div className="w-fit m-auto border p-2 rounded-xl border-gray-300">
                            <img src={imageSrc} alt="" />
                        </div>}
                    </div>
                    <div className="mt-3">

                        <div className="text-center">
                            <Button disabled={!imageSrc} className="mr-4" variant="outlined" onClick={handleDownload}>Download</Button>
                            <Button className="" color="error" variant="outlined" onClick={handleClose}>Close</Button>
                            {/* <Button className="mr-4" variant="outlined" onClick={() => handleSubmit(onSubmit1)()}>Close</Button> */}

                        </div>
                    </div>
                    {/* </div> */}
                    {/* </form> */}

                </Box>
            </Modal>
        </>
    );
};

export default GenerateQRCode;
