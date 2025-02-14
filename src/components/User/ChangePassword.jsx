import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputValidation from "../FormField/InputValidation";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { changePass } from "../../api";
// import { useChangePasswordUserMutation } from "../../services/apiSlice";

const ChangePassword = ({ user, open, setOpen, refetch }) => {
    const { t } = useTranslation();

    // const [changePass, { isLoading, isError, error }] = useChangePasswordUserMutation();

    const schema = yup.object().shape({
        newPassword: yup.string().required(t("newPasswordRequired")),
    });

    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            newPassword: "",
        }
    });

    const handleClose = (e) => {
        if (e && e.reason == 'backdropClick') {
            console.log(1)
        }
        setOpen(false);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            await changePass({ ...data, id: user.user_id })
            toast.success(
                t("message.success.update", {
                    field: t("User Password"),
                })
            );
            refetch();
            reset()
            handleClose();
            setOpen(false);

        } catch (error) {
            console.log(error)
            if (error?.originalStatus == 200) {
                toast.error(
                    t("message.success.update", {
                        field: t("User Password"),
                    })
                );
                refetch();
                reset()
                handleClose();
                setOpen(false);
            } else {
                toast.error(error?.data || error?.message || error?.data?.title);
            }
        }
    };

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    ".MuiBox-root": {
                        top: '40px'
                    }
                }}
            >
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <Box>
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
                                    {t("Change Password")}
                                </Typography>
                                <div className="mt-4 space-y-5">
                                    <InputValidation
                                        id="password"
                                        {...register("newPassword")}
                                        errors={errors.newPassword}
                                        placeholder={t("New Password")}
                                        autoComplete="new-password"
                                    />
                                    <div className="text-right">
                                        <Button className="mr-4" variant="outlined" onClick={handleClose}>{t('Close')}</Button>
                                        <LoadingButton
                                            type="submit"
                                            variant="contained"
                                        // loading={isLoading}
                                        >
                                            {t("Update")}
                                        </LoadingButton>
                                    </div>
                                </div>
                            </form>
                        </Box>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ChangePassword;