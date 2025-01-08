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
        "role_id": -1,
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

    });

    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
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
                        <div className="flex min-h-0 flex-1 flex-col">
                            <div className="relative flex">
                                <div className="px-4 sm:px-6 w-full h-full">
                                    <div className="space-y-3 pt-6 pb-5">
                                        <CustomTextField
                                            name="user_name"
                                            label="user_name"
                                            control={control}
                                            errors={errors.user_name}
                                        />
                                        <CustomPasswordField
                                            name="password"
                                            label="password"
                                            control={control}
                                            errors={errors.password}
                                        />
                                        <CustomTextField
                                            name="full_name"
                                            label="full_name"
                                            control={control}
                                            errors={errors.full_name}
                                        />
                                        <CustomSelect
                                            name="role_id"
                                            label="role"
                                            control={control}
                                            // errors={errors.isActive}
                                            options={[
                                                { id: 1, value: 'ADMIN' },
                                                { id: 2, value: 'TECHNICIAN' },
                                                { id: 3, value: 'QA' },
                                            ]}
                                        />
                                        <CustomTextField
                                            name="email"
                                            label="email"
                                            control={control}
                                            errors={errors.email}
                                        />
                                        <CustomSelect
                                            name="gender"
                                            label="gender"
                                            control={control}
                                            // errors={errors.isActive}
                                            options={[
                                                { id: 'male', value: 'male' },
                                                { id: 'female', value: 'female' },
                                                { id: 'other', value: 'other' },
                                            ]}
                                        />
                                        <CustomTextField
                                            name="phone_number"
                                            label="phone_number"
                                            control={control}
                                            errors={errors.phone_number}
                                        />
                                        <CustomTextField
                                            name="address"
                                            label="address"
                                            control={control}
                                            errors={errors.address}
                                        />
                                        <CustomDateField
                                            name="date_of_birth"
                                            label="date_of_birth"
                                            control={control}
                                            errors={errors.date_of_birth}
                                        />
                                    </div>
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
                                {t("save")}
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ModalRegister;
