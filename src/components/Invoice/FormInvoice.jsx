
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
import {
    useAddInvoiceMutation,
    useUpdateInvoiceMutation
} from "../../services/apiSlice";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomTextField from "../FormField/CustomTextField";
import Tooltip from "@mui/material/Tooltip";

const FormInvoice = ({ selectedItem, triggleSubmit, setTriggleSubmit, submitError, refetch, setOpenForm }) => {
    const { t } = useTranslation();
    const [updateForm, { isLoading: isLoading1 }] = useUpdateInvoiceMutation();
    const [addForm, { isLoading: isLoading2 }] = useAddInvoiceMutation();



    useEffect(() => {
        if (selectedItem && selectedItem.id) {
            //     console.log(selectedItem)
            //     const response = fetchStaffDetail(selectedItem.id)
            //     response.then(i => {
            //         console.log(i.data)
            //         reset(i.data)
            //     })
            reset(selectedItem, { keepDirtyValues: true })
        } else {
            reset(defaultValues, { keepDirtyValues: true })
        }
    }, [selectedItem])

    const defaultValues = {
        id: "",
        invoice_no: "",
        item_no: "",
        item_quantity: "",
        item_price: "",
        item_desc: "",
        item_discount_pe: "",
    }

    // Validation
    const schema = yup.object().shape({

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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const onSubmit = async (data) => {
        const transformData = {
            ...data,

        };

        try {
            if (transformData.id) {
                await updateForm(transformData).unwrap();
                toast.success(
                    t("message.success.update", {
                        field: t("Invoice"),
                    })
                );
            } else {
                await addForm(transformData).unwrap();
                toast.success(
                    t("message.success.add", {
                        field: t("Invoice"),
                    })
                );
            }
            setTriggleSubmit(false)
            reset(defaultValues);
            refetch();
            setOpenForm(false);
        } catch (error) {
            setTriggleSubmit(false)
            if (error?.data?.status === 400) {
                toast.error('Error');
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
                                    {t("addTitle", { field: t("Invoice") })}
                                </h2>
                                <div className="mt-1">
                                    <p className="text-sm text-light">
                                        {t("addSubtitle", { field: t("Invoice") })}
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
                                            name="invoice_no"
                                            label="Invoice No"
                                            control={control}
                                            errors={errors.invoice_no}
                                            required
                                        />
                                        <CustomTextField
                                            name="item_no"
                                            label="Item No"
                                            control={control}
                                            errors={errors.item_no}
                                            required
                                        />
                                        <CustomTextField
                                            name="item_quantity"
                                            label="Quantity"
                                            control={control}
                                            errors={errors.item_quantity}
                                            required
                                        />
                                        <CustomTextField
                                            name="item_price"
                                            label="Price"
                                            control={control}
                                            errors={errors.item_price}
                                            required
                                        />
                                        <CustomTextField
                                            name="item_discount_pe"
                                            label="Discount %"
                                            control={control}
                                            errors={errors.item_discount_pe}
                                            required
                                        />
                                        <CustomTextField
                                            name="item_desc"
                                            label="Description"
                                            control={control}
                                            errors={errors.item_desc}
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

export default FormInvoice;
