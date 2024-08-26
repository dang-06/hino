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
import { useAddTruckMutation } from "../../services/apiSlice";
import CustomDateTimeField from "../FormField/CustomDateTimeField";
import CustomDateField from "../FormField/CustomDateField";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomSelect from "../FormField/CustomSelect";
// import { addTruck } from "../../api";
import CustomTextField from "../FormField/CustomTextField";

const AddTruckForm = ({ fleets, triggleSubmit, submitError, refetch, setOpenForm }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { masterDatas } = useSelector((state) => state.masterDatas);
    const [addTruck, { isLoading }] = useAddTruckMutation();
    // const { handleSubmitCus } = useForm();

    
    // Validation
    const schema = yup.object().shape({
        // groupId: yup
        //     .string()
        //     .required(t("message.validation.required", { field: t("branchName") })),
        brand: yup
            .string()
            .required(t("message.validation.required", { field: t("brand") })),
        plateLicence: yup
            .string()
            .required(t("message.validation.required", { field: t("plateLicence") })),
        truckType: yup
            .string()
            .required(t("message.validation.required", { field: t("type") })),
        loadingWeight: yup
            .number()
            .nullable()
            .typeError(t("message.validation.invalid", { field: t("loadingWeight") }))
            .required(
                t("message.validation.required", { field: t("loadingWeight") })
            ),
        // registrationCertificateExpirationDate: yup
        //     .date()
        //     .nullable()
        //     .typeError(
        //         t("message.validation.invalid", {
        //             field: t("registrationCertificateExpirationDate"),
        //         })
        //     )
        //     .required(
        //         t("message.validation.required", {
        //             field: t("registrationCertificateExpirationDate"),
        //         })
        //     ),
        // insuranceExpirationDate: yup
        //     .date()
        //     .nullable()
        //     .typeError(
        //         t("message.validation.invalid", { field: t("insuranceExpirationDate") })
        //     )
        //     .required(
        //         t("message.validation.required", {
        //             field: t("insuranceExpirationDate"),
        //         })
        //     ),
        // ageOfTruck: yup
        //     .string()
        //     .nullable()
        //     .typeError(t("message.validation.invalid", { field: t("ageOfTruck") }))
        //     .required(
        //         t("message.validation.required", { field: t("ageOfTruck") })
        //     ),
    });

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            groupId: "",
            brand: "",
            plateLicence: "",
            truckType: "",
            loadingWeight: "",
            registrationCertificateExpirationDate: "",
            insuranceExpirationDate: "",
            ageOfTruck: "",
        },
    });

    useEffect(_ => {
        if(triggleSubmit == true){
            console.log(1)
            handleSubmit(onSubmit)()
            setTimeout(_ => {
                if(Object.keys(errors).length > 0){
                    submitError()
                }
            }, 100) 
        }
    }, [triggleSubmit])

    const onSubmit = async (data) => {
        console.log('data', data)
        const transformData = {
            ...data,
            registrationCertificateExpirationDate: dayjs(
                data.registrationCertificateExpirationDate
            ).format(),
            insuranceExpirationDate: dayjs(data.insuranceExpirationDate).format(),
            registrationCertificate: ["JORA21U6U0UOUERZWND6EGKHND2V.jpg"],
            mid: "mid",
            insurance: ["JORA21U6U0UOUERZWND6EGKHND2V.jpg"],
            truckImages: ["JORA21U6U0UOUERZWND6EGKHND2V.jpg"],
            truckType: Number(data.truckType),
            ageOfTruck: data.ageOfTruck,
        };

        try {
            await addTruck(transformData).unwrap();
            toast.success(
                t("message.success.add", {
                    field: t("truck"),
                })
            );
            reset();
            refetch();
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
        setOpenForm(false);
        clearErrors();
        reset();
    };

    return (
        <>
            
            {/* <div className=""> */}
            <form
                noValidate
                className="flex h-full flex-col "
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex min-h-0 flex-1 flex-col">
                    {/* <div className="flex py-6 px-2 justify-between items-top border-b">
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
                                    {t("addTitle", { field: t("truck") })}
                                </h2>
                                <div className="mt-1">
                                    <p className="text-sm text-light">
                                        {t("addSubtitle", { field: t("truck") })}
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
                                loading={isLoading}
                            >
                                {t("submit")}
                            </LoadingButton>
                        </div>
                    </div> */}
                    <div className="relative flex">
                        <div className=" px-4 sm:px-6  h-full ">
                            <div className="space-y-4 pt-6 pb-5">
                                {/* <CustomSelect
                                    name="groupId"
                                    label="branchName"
                                    control={control}
                                    errors={errors.groupId}
                                    options={fleets?.map((x) => {
                                        return { id: x.groupId, value: x.groupName };
                                    })}
                                    required
                                /> */}
                                <CustomTextField
                                    name="brand"
                                    label="brand"
                                    control={control}
                                    errors={errors.brand}
                                    required
                                />
                                <CustomTextField
                                    name="plateLicence"
                                    label="plateLicense"
                                    control={control}
                                    errors={errors.plateLicence}
                                    required
                                />

                                <CustomSelect
                                    name="truckType"
                                    label="type"
                                    setValue={setValue}
                                    control={control}
                                    errors={errors.truckType}
                                    //   options={masterDatas
                                    //     .filter((x) => x.type === "TRUCK")
                                    //     .map((x) => {
                                    //       return { id: x.intValue, value: x.name };
                                    //     })}
                                    options={masterDatas?.filter(i => i.type === "VEHICLETYPE").filter((v, i, a) => a.findIndex(v2 => (v2.intValue === v.intValue)) === i).sort((a, b) => a.intValue - b.intValue).map((item) => ({
                                        id: item.intValue,
                                        value: t(item.name),
                                    }))}

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
                                />

                            </div>
                        </div>


                    </div>
                </div>

                {/* <div className="flex flex-shrink-0 justify-end gap-4 px-4 py-4">
                    <Button variant="outlined" onClick={onClose}>
                        {t("cancel")}
                    </Button>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                    >
                        {t("submit")}
                    </LoadingButton>
                </div> */}
            </form>
           
        </>
    );
};

export default AddTruckForm;
