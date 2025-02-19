
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FiUserPlus } from "react-icons/fi";
import * as yup from "yup";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomTextField from "../FormField/CustomTextField";
import CustomSelect from "../FormField/CustomSelect";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { CustomAsyncSelect } from "..";
import * as api from "../../api";
import CustomAsyncApiSelect from "../FormField/CustomAsyncApiSelect";
import CustomDateField from "../FormField/CustomDateField";
import { useAddUserMutation, useUpdateUserMutation } from "../../services/apiSlice";

const defaultValues = {
    "user_id": "",
    "full_name": "",
    "email": "",
    "gender": "",
    "phone_number": "",
    "address": "",
    "date_of_birth": '',
}

const FormUser = ({ selectedItem, triggleSubmit, setTriggleSubmit, submitError, refetch, setOpenForm, listRole }) => {
    const { t } = useTranslation();
    const [updateForm, { isLoading: isLoading1 }] = useUpdateUserMutation();
    const [addForm, { isLoading: isLoading2 }] = useAddUserMutation();

    useEffect(() => {
        if (selectedItem && selectedItem.user_id) {
            console.log(selectedItem)
            reset(selectedItem, { keepDirtyValues: true })
        } else {
            reset(defaultValues, { keepDirtyValues: true })
        }
    }, [selectedItem])

    // Validation
    const schema = yup.object().shape({
        // full_name: yup.string().required("Full name is required"),
        // email: yup.string().email("Invalid email format").required("Email is required"),
        // gender: yup.string().oneOf(["male", "female"], "Gender must be male or female").required("Gender is required"),
        // phone_number: yup
        //     .string()
        //     .matches(/^\d{10,11}$/, "Phone number must be 10-11 digits")
        //     .required("Phone number is required"),
        // address: yup.string().required("Address is required"),
        // date_of_birth: yup
        //     .date()
        //     .max(new Date(), "Date of birth cannot be in the future")
        //     .required("Date of birth is required"),
    });

    useEffect(_ => {
        // console.log('triggle')
        if (triggleSubmit == true) {
            handleSubmit(onSubmit)()
            setTimeout(_ => {
                if (Object.keys(errors).length > 0) {
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
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const formatDate = (date) => {
        const _date = new Date(date);
        const day = String(_date.getDate()).padStart(2, "0");
        const month = String(_date.getMonth() + 1).padStart(2, "0");
        const year = _date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const onSubmit = async (data) => {

        const transformData = {
            ...data,
            date_of_birth: formatDate(data.date_of_birth),
        };

        try {
            if (transformData.user_id) {
                await updateForm(transformData).unwrap();
                toast.success(
                    t("message.success.update", {
                        field: t("User"),
                    })
                );
            } else {
                await addForm(transformData).unwrap();
                toast.success(
                    t("message.success.add", {
                        field: t("User"),
                    })
                );
            }
            setTriggleSubmit(false)
            reset(defaultValues);
            refetch();
            setOpenForm(false);
        } catch (error) {
            setTriggleSubmit(false)
            toast.error('Error');
            if (error?.data?.status === 400) {
                // toast.error(error.data.validMsgList?.plateLicence[0]);
            }
        }
    };

    const onClose = () => {
        setOpenForm(false);
        clearErrors();
        reset(defaultValues);
    };

    return (
        <>
            <div className="flex h-full flex-col">
                {!selectedItem?.user_id && (
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
                                    {t("addTitle", { field: t("User") })}
                                </h2>
                                <div className="mt-1">
                                    <p className="text-sm text-light">
                                        {t("addSubtitle", { field: t("User") })}
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
                )}
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
                                            name="full_name"
                                            label="fullName"
                                            control={control}
                                            errors={errors.full_name}
                                            disabled={selectedItem?.id ? true : false}
                                            required
                                        />
                                        <CustomTextField
                                            name="email"
                                            label="email"
                                            control={control}
                                            errors={errors.email}
                                            required
                                        />
                                        <CustomSelect
                                            name="gender"
                                            label="gender"
                                            control={control}
                                            setValue={setValue}
                                            options={[
                                                { id: "male", value: "male" },
                                                { id: "female", value: "female" },
                                            ]}
                                            errors={errors.gender}
                                            required
                                        />
                                        <CustomTextField
                                            name="phone_number"
                                            label="phone"
                                            control={control}
                                            errors={errors.phone_number}
                                            required
                                        />
                                        <CustomTextField
                                            name="address"
                                            label="address"
                                            control={control}
                                            errors={errors.address}
                                            required
                                        />
                                        <CustomDateField
                                            name="date_of_birth"
                                            label={t("dateOfBirth")}
                                            control={control}
                                            errors={errors.date_of_birth}
                                            required
                                        />
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

export default FormUser;
