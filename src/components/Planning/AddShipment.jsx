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
import { useCreateShipmentMutation } from "../../services/apiSlice";
import CustomDateTimeField from "../FormField/CustomDateTimeField";
import CustomDateField from "../FormField/CustomDateField";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomSelect from "../FormField/CustomSelect";
// import { addShipment } from "../../api";
import CustomTextField from "../FormField/CustomTextField";

const AddShipmentForm = ({ truckTypes,selectedItem, fleets, triggleSubmit, submitError, refetch, setOpenFormAddShipment }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { masterDatas } = useSelector((state) => state.masterDatas);
    // const [addForm, { isLoading: isLoading1 }] = useAddShipmentMutation();
    const [addShipment, { isLoading : isLoading2 }] = useCreateShipmentMutation();
    // const { handleSubmitCus } = useForm();

    useEffect(_ => {
        if(truckTypes){
            // console.log(truckTypes)
        }
    }, [truckTypes])
    // Validation
    // const schema = yup.object().shape({
    //     // groupId: yup
    //     //     .string()
    //     //     .required(t("message.validation.required", { field: t("branchName") })),
    //     brand: yup
    //         .string()
    //         .required(t("message.validation.required", { field: t("brand") })),
    //     plateLicence: yup
    //         .string()
    //         .required(t("message.validation.required", { field: t("plateLicence") })),
    //     truckType: yup
    //         .string()
    //         .required(t("message.validation.required", { field: t("type") })),
    //     loadingWeight: yup
    //         .number()
    //         .nullable()
    //         .typeError(t("message.validation.invalid", { field: t("loadingWeight") }))
    //         .required(
    //             t("message.validation.required", { field: t("loadingWeight") })
    //         ),
    //     // registrationCertificateExpirationDate: yup
    //     //     .date()
    //     //     .nullable()
    //     //     .typeError(
    //     //         t("message.validation.invalid", {
    //     //             field: t("registrationCertificateExpirationDate"),
    //     //         })
    //     //     )
    //     //     .required(
    //     //         t("message.validation.required", {
    //     //             field: t("registrationCertificateExpirationDate"),
    //     //         })
    //     //     ),
    //     // insuranceExpirationDate: yup
    //     //     .date()
    //     //     .nullable()
    //     //     .typeError(
    //     //         t("message.validation.invalid", { field: t("insuranceExpirationDate") })
    //     //     )
    //     //     .required(
    //     //         t("message.validation.required", {
    //     //             field: t("insuranceExpirationDate"),
    //     //         })
    //     //     ),
    //     // ageOfShipment: yup
    //     //     .string()
    //     //     .nullable()
    //     //     .typeError(t("message.validation.invalid", { field: t("ageOfShipment") }))
    //     //     .required(
    //     //         t("message.validation.required", { field: t("ageOfShipment") })
    //     //     ),
    // });

    const defaultValues = {

        "areaShipment": "",
        "driverId": "",
        "driverName": "",
        "plateLicense": "",
        "shipmentId": "",
        "shipmentStatus": 0,
        "shipmentType": "",
        "truckId": ""
    }

    // Validation
    const schema = yup.object().shape({
    //  groupId: yup
    //      .string()
    //      .required(t("message.validation.required", { field: t("branchName") })),
    areaShipment: yup
            .string()
             .required(t("message.validation.required", { field: t("areaShipment") })),
            //  driverId: yup
            //  .string()
            //  .required(t("message.validation.required", { field: t("shipmentId") })),
             shipmentId: yup
             .string()
             .required(t("message.validation.required", { field: t("shipmentId") })),
             shipmentStatus: yup
             .string()
             .required(t("message.validation.required", { field: t("shipmentStatus") })),
             shipmentType: yup
             .string()
             .required(t("message.validation.required", { field: t("shipmentType") })),
        //  loadingWeight: yup
        //      .number()
        //      .nullable()
        //      .typeError(t("message.validation.invalid", { field: t("loadingWeight") }))
        //     .required(
        //          t("message.validation.required", { field: t("loadingWeight") })
        //      ),
    });

    useEffect(_ => {
        // console.log('triggle')
        if(triggleSubmit == true){
            handleSubmit(onSubmit)()
            setTimeout(_ => {
                if(Object.keys(errors).length > 0){
                    submitError()
                }
            }, 100) 
        }
    }, [triggleSubmit])


    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // groupId: "",
            // brand: "",
            // plateLicence: "",
            // truckType: "",
            // loadingWeight: "",
            // registrationCertificateExpirationDate: "",
            // insuranceExpirationDate: "",
            // ageOfShipment: "",
            areaShipment: "",
            driverName: "",
            shipmentId: "",
            shipmentStatus: 0,
            shipmentType: "",

        },
    });

    // useEffect(_ => {
    //     if(triggleSubmit == true){
    //         console.log(1)
    //         handleSubmit(onSubmit)()
    //         setTimeout(_ => {
    //             if(Object.keys(errors).length > 0){
    //                 submitError()
    //             }
    //         }, 100) 
    //     }
    // }, [triggleSubmit])

    const onSubmit = async (data) => {
        console.log('data', data)
        const transformData = {
            ...data,
            // registrationCertificateExpirationDate: dayjs(
            //     data.registrationCertificateExpirationDate
            // ).format(),
            // insuranceExpirationDate: dayjs(data.insuranceExpirationDate).format(),
            // registrationCertificate: ["JORA21U6U0UOUERZWND6EGKHND2V.jpg"],
            // mid: "mid",
            // insurance: ["JORA21U6U0UOUERZWND6EGKHND2V.jpg"],
            // truckImages: ["JORA21U6U0UOUERZWND6EGKHND2V.jpg"],
            // truckType: Number(data.truckType),
            // ageOfTruck: data.ageOfTruck,
            truckId: data.truckId,
            driverId: data.driverId
        };

        try {
            await addShipment(transformData).unwrap();
            toast.success(
                t("message.success.add", {
                    field: t("Shipment"),
                })
            );
            reset();
            // refetch();
            // setTimeout(_ => {
            //     console.log('3s later')
            //     refetch();
            // }, 3000)
            
            setOpen(false);
        } catch (error) {
            if (error.data.status === 400) {
                toast.error(error.data.validMsgList?.plateLicence[0]);
            }
        }
        console.log(data);
        console.log(transformData);
    };


    const onClose = () => {
        setOpenFormAddShippment(false);
        clearErrors();
        reset(defaultValues);
    };

    return (
        <>
            <div className="flex h-full flex-col">
                {!selectedItem?.id && (
                    <div className="flex py-6 px-2 justify-between items-top border-b">
                        <div className="flex">
                            <div className="flex h-7 items-center justify-center gap-4">
                                <button
                                    type="button"
                                    className="bg-transparent hover:bg-[#999] text-[#3d3b3b] p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={onClose}
                                >
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex flex-col ml-3 items-start">
                                <h2 className="text-lg font-medium capitalize ">
                                    {t("addTitle", { field: t("shipment") })}
                                </h2>
                                <div className="mt-1">
                                    <p className="text-sm text-light">
                                        {t("addSubtitle", { field: t("shipment") })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mr-2">
                            <Button variant="outlined" onClick={onClose}>
                                {t("cancel")}
                            </Button>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                className="ml-3"
                                onClick={() => handleSubmit(onSubmit)()}
                                loading={isLoading2}
                            >
                                {t("submit")}
                            </LoadingButton>
                        </div>
                    </div>
                ) }
                <div className="overflow-auto pb-[50px]">
                    <form
                        noValidate
                        className="flex h-full flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex min-h-0 flex-1 flex-col">
                            
                            <div className="relative flex">
                                <div className="px-4 sm:px-6 w-full h-full">
                                    <div className="space-y-6 pt-6 pb-5">
                                <CustomTextField
                                    name="areaShipment"
                                    label="areaShipment"
                                    control={control}
                                    errors={errors?.areaShipment}
                                    required
                                />
                                {/* <CustomTextField
                                    name="truckId"
                                    label="truckId"
                                    control={control}
                                    errors={errors?.truckId}
                                    required
                                /> */}
                                <CustomTextField
                                    name="shipmentId"
                                    label="shipmentId"
                                    control={control}
                                    errors={errors?.shipmentId}
                                    required
                                />
                                {/* <CustomTextField
                                    name="driverId"
                                    label="driverId"
                                    control={control}
                                    errors={errors?.driverId}
                                    required
                                /> */}
                                <CustomTextField
                                    name="driverName"
                                    label="driverName"
                                    control={control}
                                    errors={errors?.driverName}
                                    required
                                />
                                {/* <CustomTextField
                                    name="plateLicense"
                                    label="plateLicense"
                                    control={control}
                                    errors={errors?.plateLicence}
                                    required
                                /> */}
                                <CustomTextField
                                    name="shipmentStatus"
                                    label="shipmentStatus"
                                    control={control}
                                    errors={errors?.shipmentStatus}
                                    required
                                />
                                <CustomTextField
                                    name="shipmentType"
                                    label="shipmentType"
                                    control={control}
                                    errors={errors?.shipmentType}
                                    required
                                />

                                {/* <CustomSelect
                                    name="truckType"
                                    label="type"
                                    control={control}
                                    errors={errors.truckType}
                                    options={truckTypes.content.map((x) => {
                                        return { id:x.id, value: x.englishName };
                                    })}
                                

                                    required
                                />
                                <CustomNumberField
                                    name="loadingWeight"
                                    label="loadingWeight"
                                    control={control}
                                    errors={errors.loadingWeight}
                                    required
                                />
                                <CustomDateField
                                    name="registrationCertificateExpirationDate"
                                    label="registrationCertificateExpirationDate"
                                    control={control}
                                    errors={errors.registrationCertificateExpirationDate}
                                    required
                                />

                                <CustomDateField
                                    name="insuranceExpirationDate"
                                    label="insuranceExpirationDate"
                                    control={control}
                                    errors={errors.insuranceExpirationDate}
                                    required
                                /> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddShipmentForm;
