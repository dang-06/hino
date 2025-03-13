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

const FilterUser = ({ filter, setFilter, triggleFiter, setTriggleFiter }) => {
    const { t } = useTranslation();

    // Validation schema
    const schema = yup.object().shape({
        user_name: yup.string(),
        full_name: yup.string(),
        phone_number: yup.string(),
        email: yup.string().email("Invalid email format")
    });

    const defaultValues = {
        user_name: '',
        full_name: '',
        phone_number: '',
        email: ''
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    useEffect(() => {
        if (triggleFiter) {
            handleSubmit(onSubmit)();
            setTriggleFiter(false);
        }
    }, [triggleFiter]);

    const onSubmit = (data) => {
        setFilter(data);
        reset(defaultValues);
    };

    const handleReset = () => {
        reset(defaultValues);
        setFilter(defaultValues);
    };

    return (
        <div className="flex h-full flex-col">
            <form noValidate className="flex h-full flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="relative flex">
                        <div className="px-4 sm:px-6 w-full h-full">
                            <div className="space-y-6 pt-6 pb-5">
                                <CustomTextField
                                    name="user_name"
                                    label="userName"
                                    control={control}
                                    errors={errors.user_name}
                                />
                                <CustomTextField
                                    name="full_name" 
                                    label="fullName"
                                    control={control}
                                    errors={errors.full_name}
                                />
                                <CustomTextField
                                    name="phone_number"
                                    label="phone"
                                    control={control} 
                                    errors={errors.phone_number}
                                />
                                <CustomTextField
                                    name="email"
                                    label="email"
                                    control={control}
                                    errors={errors.email}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FilterUser;
