import React, { Fragment, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import {
    useRegisterUserMutation
} from "../services/apiSlice";

import CustomDateField from "./FormField/CustomDateField";
import CustomSelect from "./FormField/CustomSelect";
import CustomTextField from "./FormField/CustomTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CustomPasswordField from "./FormField/CustomPasswordField";


const ModalRegister = ({ open, setOpen }) => {
    const { t } = useTranslation();

    const [registerUser, { isLoading: isLoading }] = useRegisterUserMutation();

    const defaultValues = {
        "user_name": "",
        "password": "",
        "full_name": "",
        "role_id": "",
        "email": "",
        "gender": "",
        "phone_number": "",
        "address": "",
        "date_of_birth": ""
    }


    useEffect(() => {
        reset(defaultValues);
    }, [])


    // Validation
    const schema = yup.object().shape({
        user_name: yup.string().required("User name is required"),
        full_name: yup.string().required("Full name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone_number: yup.string().matches(/^\d{10,15}$/, "Phone number must be 10-15 digits").required("Phone number is required"),
        date_of_birth: yup.date().max(new Date(), "Date of birth cannot be in the future").required("Date of birth is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        role_id: yup.number().oneOf([1, 2, 3], "Invalid role").required("Role is required"),
        gender: yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
        address: yup.string().required("Address is required"),
    });

    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const onSubmit = async (data) => {
        const date = new Date(data.date_of_birth);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        const transformData = {
            ...data,
            date_of_birth: formattedDate
        };

        try {

            await registerUser(transformData).unwrap();
            toast.success(
                t("message.success.add", {
                    field: t("Installation"),
                })
            );
            setTriggleSubmit(false)
            reset(defaultValues);
            setOpen(false);
        } catch (error) {
            setTriggleSubmit(false)
            if (error?.data?.status === 400) {
                toast.error('Error');
                // toast.error(error.data.validMsgList?.plateLicence[0]);
            }
        }
    };

    const onClose = () => {
        setOpen(false);
        clearErrors();
        reset(defaultValues);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-auto rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                    <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                        <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-2xl font-medium capitalize">
                            {t("registerUserTitle")}
                        </span>
                    </div>
                    <form
                        noValidate
                        className="flex h-full flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex min-h-0 flex-1 flex-col pb-4">
                            <div className="relative flex">
                                <div className="px-4 sm:px-6 w-full h-full">
                                    <div className="my-4 flex flex-col sm:flex-row gap-4">
                                        {/* Cột trái */}
                                        <div className="space-y-4 flex-1">
                                            <CustomTextField name="user_name" label={t("userName")} control={control} errors={errors.user_name} required />
                                            <CustomTextField name="full_name" label={t("fullName")} control={control} errors={errors.full_name} required />
                                            <CustomTextField name="email" label={t("email")} control={control} errors={errors.email} required />
                                            <CustomTextField name="phone_number" label={t("phone")} control={control} errors={errors.phone_number} required />
                                        </div>

                                        {/* Cột phải */}
                                        <div className="space-y-4 flex-1">
                                            <CustomPasswordField name="password" label={t("password")} control={control} errors={errors.password} required />
                                            <CustomSelect
                                                name="role_id"
                                                label={t("role")}
                                                control={control}
                                                setValue={setValue}
                                                options={[
                                                    { id: 1, value: 'ADMIN' },
                                                    { id: 2, value: 'TECHNICIAN' },
                                                    { id: 3, value: 'QA' },
                                                ]}
                                                required
                                            />
                                            <CustomSelect
                                                name="gender"
                                                label={t("gender")}
                                                control={control}
                                                setValue={setValue}
                                                options={[
                                                    { id: 'male', value: t('male') },
                                                    { id: 'female', value: t('female') },
                                                    { id: 'other', value: t('other') },
                                                ]}
                                                required
                                            />
                                            <CustomDateField name="date_of_birth" label={t("dateOfBirth")} control={control} errors={errors.date_of_birth} required />
                                        </div>
                                    </div>
                                    <CustomTextField name="address" label={t("address")} control={control} errors={errors.address} required />
                                </div>
                            </div>
                        </div>
                        <div className=" flex items-center justify-end gap-4">
                            <Button variant="outlined" onClick={onClose}>
                                {t("cancel")}
                            </Button>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                className="ml-3"
                                onClick={() => handleSubmit(onSubmit)()}
                                loading={isLoading}
                            >
                                {t("submit")}
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ModalRegister;
