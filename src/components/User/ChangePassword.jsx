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
import { useChangePasswordUserMutation } from "../../services/apiSlice";

const style = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 2,
    p: 3,
};

const ChangePassword = ({ user, open, setOpen, refetch }) => {
    const { t } = useTranslation();

    const [changePass, { isLoading, isError, error }] = useChangePasswordUserMutation();

    const schema = yup.object().shape({
        newPassword: yup.string().required(t("newPasswordRequired")),
        oldPassword: yup.string().required(t("oldPasswordRequired")),
    });

    // useEffect(_ => {
    //     document.addEventListener('scroll', trackScrolling());
    // }, [showPolicy]) 

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
            oldPassword: ""
        }
    });

    const handleClose = (e) => {
        if (e && e.reason == 'backdropClick') {
            console.log(1)
        }
        setOpen(false);
        reset();

        // if (setOpenPopupJobDetail) setOpenPopupJobDetail(false);
    };

    const onSubmit = async (data) => {
        try {
            await changePass({ ...data, id: user.id }).unwrap()
            toast.success(
                t("message.success.update", {
                    field: t("User Password"),
                })
            );
            refetch();
            reset()
            handleClose();

        } catch (error) {
            console.log(error)
            if (error?.originalStatus == 200) {
                toast.success(
                    t("message.success.update", {
                        field: t("User Password"),
                    })
                );
                refetch();
                reset()
                handleClose();
            } else {

                toast.error(error?.data || error?.message || error?.data?.title);
            }
        }
    };

    return (
        <>
            <Modal
                open={open}
                // onClose={}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    ".MuiBox-root": {
                        top: '40px'
                    }
                }}
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
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h6" component="h2">
                            {t("Change Password")}
                        </Typography>
                        <div className="mt-4 space-y-5">


                            <InputValidation
                                id="password"
                                label={t("oldPassword")}
                                {...register("oldPassword")}
                                errors={errors.confirmNewPassword}
                                placeholder={t("oldPassword")}
                                autoComplete="new-password"

                            />

                            <InputValidation
                                id="password"
                                label={t("New Password")}
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
                                    loading={isLoading}
                                >
                                    {t("Update")}
                                </LoadingButton>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default ChangePassword;
