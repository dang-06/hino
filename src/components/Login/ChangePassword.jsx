import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputValidation from "../FormField/InputValidation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { login, reset } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Checkbox, DialogTitle, FormControlLabel } from "@mui/material";
import { UserCircleIcon } from "@heroicons/react/outline";
import { resetPassword } from "../../api";



const ChangePassword = ({ setPage, formData, setFormData, token, username }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const handleClose = () => {
        // localStorage.removeItem('user')
        // localStorage.removeItem('token')
        // setShowPolicy(false);
    };

    const schema = yup.object().shape({
        otp: yup.string().required(t("otpRequired")),
        newPassword: yup.string().required(t("newPasswordRequired")),
        confirmNewPassword: yup.string().required(t("confirmNewPasswordRequired")),
    });

    // useEffect(_ => {
    //     document.addEventListener('scroll', trackScrolling());
    // }, [showPolicy]) 

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), defaultValues: {otp: "112233"} });

    const onSubmit = (data) => {
        const newFormData = { ...data, token };
        console.log(newFormData)
        try {
            const response = resetPassword(newFormData)
            response.then(res => {
                toast.success('Update password successfully');
                navigate('/login');
                // console.log(res)
                // setToken(res.data.token)
                // setPage(1)
                // setUsername(username)
            }).catch(e => {
                let messs = e?.response?.data?.messages?.newPassword[0] || e?.response?.data?.title || 'Server Error. Please try again later.'
                // console.log(e)
                toast.error(messs)
                // console.log(e)
            })
    
        }catch(e) {
            console.log(e)
            // console.log(e)
        }
        // dispatch(login(newFormData));
        // setFormData({ ...formData, username });
        // setPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            <form className="pt-[100px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <InputValidation
                        id="otp"
                        label={t("Otp")}
                        {...register("otp")}
                        errors={errors.otp}
                        placeholder={t("Otp")}
                        autoFocus
                    />
                </div>

                <div className="mb-8">
                    <InputValidation
                        id="password"
                        type="newPassword"
                        label={t("New Password")}
                        {...register("newPassword")}
                        errors={errors.newPassword}
                        placeholder={t("New Password")}
                    autoComplete="new-password"

                    />
                   
                </div>
                <div className="mb-8">
                <InputValidation
                        id="password"
                        type="confirmNewPassword"
                        label={t("Confirm New Password")}
                        {...register("confirmNewPassword")}
                        errors={errors.confirmNewPassword}
                        placeholder={t("Confirm New Password")}
                    autoComplete="new-password"

                    />
                </div>
                <div className="mt-8">
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        fullWidth
                        // loading={isLoading}
                    >
                        {t("Update")}
                    </LoadingButton>
                    {/* <Button
                        variant="contained"
                        type="button"
                        fullWidth
                        onClick={() => setShowPolicy(true)}
                        endIcon={<FiChevronRight />}
                    >
                        {t("continue")}
                    </Button> */}
                </div>
                {/* <div className="mt-8">
         
        </div> */}
            </form>
           
        </>
    );
};

export default ChangePassword;
