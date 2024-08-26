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
import { forgotPassword, getOtpResetPassword, resetPassword } from "../../api";

const ResetPasswordSuccess = ({ formData, setToken, setPage, setUsername}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const schema = yup.object().shape({
    username: yup.string().required(t("usernameRequired")),
    email: yup.string().required(t("emailRequired")).email('Email not valid'),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = ({ username, email }) => {
    // const newFormData = { username };

    const getToken = async () => {
        try {
            const response = forgotPassword({username, email})
            response.then(res => {
                console.log(res)
                let data = res.data
                if(data.status.code == 200){
                    setPage(1)
                }else if(data.status.code == 400){
                    toast.error(data?.status?.description || 'Something wrong, please try again later')
                }else{
                    toast.error('Something wrong, please try again later')
                }
                // setToken(res.data.token)
                // setPage(1)
                // setUsername(username)
            }).catch(e => {
                toast.error('Something wrong, please try again later')
                // console.log(e)
            })
    
        }catch(e) {
            // console.log(e)
        }

    }

    getToken()
    // dispatch(login(newFormData));
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
      <form className="relative pt-[40px]" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="absolute top-[30px] w-full text-center">
          <div className="mx-auto inline-flex items-center justify-center gap-1 rounded-lg bg-gray-200 px-2 py-1 text-sm">
            <UserCircleIcon className="w-4" /> {formData.username}
          </div>
        </div> */}
        <h1 className="font-medium text-[18px] mb-[30px]">Successfully</h1>
        <div className="mb-5">
            <p>We have to send new password to your email.
                please check your email inbox.</p>
        </div>
        
        <div className="mt-8">
          <LoadingButton
            variant="contained"
            type="submit"
            fullWidth
            onClick={navigate('/login')}
          >
            {t("Login")}
          </LoadingButton>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordSuccess;
