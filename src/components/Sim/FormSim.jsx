import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAddSimMutation, useUpdateSimMutation } from "../../services/apiSlice";
import CustomTextField from "../FormField/CustomTextField";
import Tooltip from "@mui/material/Tooltip";
import CustomDateField from "../FormField/CustomDateField";
import CustomSelect from "../FormField/CustomSelect";

const FormSim = ({ selectedItem, triggleSubmit, setTriggleSubmit, submitError, refetch, setOpenForm }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [addSim] = useAddSimMutation();
    const [updateSim] = useUpdateSimMutation();

    useEffect(() => {
        if (selectedItem && selectedItem.id) {
            console.log("Selected item:", selectedItem);
            reset(selectedItem, { keepDirtyValues: true });
        } else {
            reset(defaultValues, { keepDirtyValues: true });
        }
    }, [selectedItem]);

    const defaultValues = {
        "id": "",
        "sim_no": "",
        "active_date": null,
        "expire_date": null,
        "network_carrier": ""
    };

    // Validation
    const schema = yup.object().shape({
        sim_no: yup.string().required(t("Sim No is required")),
        active_date: yup.date().nullable(),
        expire_date: yup.date().nullable(),
        network_carrier: yup.string().nullable()
    });

    useEffect(() => {
        if (triggleSubmit === true) {
            handleSubmit(onSubmit)();
            setTimeout(() => {
                if (Object.keys(errors).length > 0) {
                    submitError();
                }
            }, 100);
        }
    }, [triggleSubmit]);

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

    const formatDate = (date) => {
        if (date && !isNaN(Date.parse(date))) {
            const _date = new Date(date);
            _date.setDate(_date.getDate() + 1);
            const formattedDate = _date.toISOString().split('T')[0];
            return formattedDate;
        } else {
            return '';
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        const payload = {
            sim_no: data.sim_no,
            active_date: data.active_date ? formatDate(data.active_date) : null,
            expire_date: data.expire_date ? formatDate(data.expire_date) : null,
            network_carrier: data.network_carrier
        };

        try {
            if (data.id) {
                await updateSim({ ...payload, id: data.id }).unwrap();
            } else {
                await addSim(payload).unwrap();
            }

            toast.success(
                data.id
                    ? t("message.success.update", { field: t("Sim") })
                    : t("message.success.add", { field: t("Sim") })
            );

            setTriggleSubmit(false);
            reset(defaultValues);
            refetch();
            setOpenForm(false);
        } catch (error) {
            setTriggleSubmit(false);
            console.error("API error:", error);

            const errorMessage = error?.data?.message || '';

            if (errorMessage.toLowerCase().includes('sim no')) {
                toast.error(t("simNoAlreadyExists", { sim_no: data.sim_no }));
            } else {
                toast.error(t("An error occurred"));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onClose = () => {
        setOpenForm(false);
        clearErrors();
        reset(defaultValues);
    };

    return (
        <>
            <div className="flex h-full flex-col bg-white overflow-auto" style={{ height: 'calc(100vh - 110px)' }}>
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
                                    {t("addTitle", { field: t("Sim") })}
                                </h2>
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
                                loading={isLoading}
                            >
                                {t("save")}
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
                                            name="sim_no"
                                            label={t("Sim No")}
                                            control={control}
                                            errors={errors.sim_no}
                                            required
                                        />
                                        <CustomDateField
                                            name="active_date"
                                            label={t("Active Date")}
                                            control={control}
                                            errors={errors.active_date}
                                        />
                                        <CustomDateField
                                            name="expire_date"
                                            label={t("Expire Date")}
                                            control={control}
                                            errors={errors.expire_date}
                                        />
                                        <CustomSelect
                                            name="network_carrier"
                                            label={t("Network Carrier")}
                                            control={control}
                                            errors={errors.network_carrier}
                                            options={[
                                                { id: 'Viettel', value: 'Viettel' },
                                                { id: 'Mobifone', value: 'Mobifone' },
                                                { id: 'Vinaphone', value: 'Vinaphone' },
                                            ]}
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

export default FormSim;