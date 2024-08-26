import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/outline";
import LoadingButton from "@mui/lab/LoadingButton";
import { login, reset } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputValidation from "../FormField/InputValidation";
import { forgotPassword, getOtpResetPassword, resetPassword } from "../../api";

const ResetPassword = ({ formData, setToken, setPage, setUsername}) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    username: yup.string().required(t("usernameRequired")),
    email: yup.string().required(t("Email required")).email('Email not valid'),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [isLoading, setLoading] = useState(false)

  const onSubmit = ({ username, email }) => {
    // const newFormData = { username };

    const getToken = async () => {
        setLoading(true)
        try {
            const response = forgotPassword({username, email})
            response.then(res => {
                let data = res.data
                if(data.status.code == 200){
                    setPage(1)
                }else if(data.status.code == 400){
                    toast.error(data?.status?.description || 'Something wrong, please try again later')
                }else{
                    toast.error('Something wrong, please try again later')
                }
                setLoading(false)
                // setToken(res.data.token)
                // setPage(1)
                // setUsername(username)
            }).catch(e => {
                toast.error('Something wrong, please try again later')
                setLoading(false)
                // console.log(e)
            })
    
        }catch(e) {
            // console.log(e)
        }

    }

    getToken()
    // dispatch(login(newFormData));
  };

  return (
    <>
      <form className="relative pt-[40px]" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="absolute top-[30px] w-full text-center">
          <div className="mx-auto inline-flex items-center justify-center gap-1 rounded-lg bg-gray-200 px-2 py-1 text-sm">
            <UserCircleIcon className="w-4" /> {formData.username}
          </div>
        </div> */}
        <h1 className="font-medium text-[18px] mb-[30px]">Forgot password</h1>
        <div className="mb-5">
          <InputValidation
            id="username"
            type="username"
            label={t("username")}
            {...register("username")}
            errors={errors.username}
            placeholder={t("username")}
            autoFocus
          />
        </div>
        <div className="mb-10">
          <InputValidation
            id="email"
            type="email"
            label={t("email")}
            {...register("email")}
            errors={errors.email}
            placeholder={t("email")}
          />
        </div>
        <div className="mt-8">
          <LoadingButton
            variant="contained"
            type="submit"
            fullWidth
            loading={isLoading}
          >
            {t("Continue")}
          </LoadingButton>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
