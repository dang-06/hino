import React, { useEffect } from "react";
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

const LoginPassword = ({ formData }) => {
  const { t } = useTranslation();             
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const schema = yup.object().shape({
    password: yup.string().required(t("passwordRequired")),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  const onSubmit = ({ password }) => {
    const newFormData = { ...formData, password };
    dispatch(login(newFormData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate(from, { replace: true });
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <form className="relative pt-[100px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="absolute top-[30px] w-full text-center">
          <div className="mx-auto inline-flex items-center justify-center gap-1 rounded-lg bg-gray-200 px-2 py-1 text-sm">
            <UserCircleIcon className="w-4" /> {formData.username}
          </div>
        </div>
        <div className="mb-16">
          <InputValidation
            id="password"
            type="password"
            label={t("password")}
            {...register("password")}
            errors={errors.password}
            placeholder={t("password")}
            autoComplete="new-password"
            autoFocus
          />
        </div>
        <div className="mt-8">
          <LoadingButton
            variant="contained"
            type="submit"
            fullWidth
            loading={isLoading}
          >
            {t("login")}
          </LoadingButton>
        </div>
      </form>
    </>
  );
};

export default LoginPassword;
