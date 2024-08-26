import React, { useState, useEffect } from "react";
import backgroundLogin from "/images/bg-login.png";
import logoColor from "/images/logo-color.svg";
import logoWhite from "/images/logo-white.svg";
import threeDot from "/images/threedot.svg";
import { useAuth } from "../utils/common";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginUsername, LoginPassword, DropdownLanguage } from "../components";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import ResetPassword from "../components/Login/ResetPassword";
import ChangePassword from "../components/Login/ChangePassword";
import ResetPasswordSuccess from "../components/Login/ResetPasswordSuccess";

const ResetPasswordLayout = () => {
    const { t } = useTranslation();
    let isAuth = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [username, setUsername] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [token, setToken] = useState(null)

    useEffect(() => {
        if (isAuth) navigate("/");
    }, [isAuth, navigate]);

    const pageDisplay = () => {
        if (page === 0) {
            return (
                <ResetPassword
                    setPage={setPage}
                    formData={formData}
                    setToken={setToken}
                    setFormData={setFormData}
                    setUsername={setUsername}
                />
            );
        } else if (page === 1) {
            return (
                <ResetPasswordSuccess/>
            );
        }
    };

    const handleControl = () => {
        if (page > 0) {
            setPage((currentPage) => currentPage - 1);
        }else if(page == 0){
            navigate('/login')
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-0">
            <div className="mx-4 flex min-h-[550px] max-w-lg overflow-hidden rounded-lg bg-white shadow-lg sm:mx-auto sm:w-full lg:max-w-5xl">
                <div className="relative hidden items-center justify-center bg-no-repeat lg:flex lg:w-1/2">
                    <img
                        src={backgroundLogin}
                        alt="Background Login"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <img src={logoWhite} alt="Logo white" className="relative" />
                    <img
                        src={threeDot}
                        alt="Three dot"
                        className="absolute left-4 bottom-4"
                    />
                </div>
                <div className="flex w-full flex-col justify-between pt-14 pb-6 lg:w-1/2 lg:px-20 px-7">
                    <Link to={'/login'}>
                        <img src="/images/logo_1.png" alt="Logo Color" className="mx-auto" />
                    </Link>
                    {/* <p className="text-center mt-4 font-medium text-red-500 text-lg">Transportation Management System</p> */}
                    <div className="flex-1">{pageDisplay()}</div>
                    
                    <div className="flex items-center justify-between mt-5">
                        <a
                            className="cursor-pointer text-blue-600 underline hover:text-blue-700"
                            onClick={handleControl}
                        >
                           <label className="inline-flex cursor-pointer text-blue-600 hover:text-blue-700">
                                <ChevronLeftIcon className="w-4" />
                                    {t("back")}
                            </label>
                        </a>
                        <DropdownLanguage />
                    </div>

                    {/* <div className="flex items-center justify-between mt-3">
                        <a
                            className="cursor-pointer text-blue-600 underline hover:text-blue-700"
                            onClick={handleControl}
                        >
                            {page === 0 ? (
                                t("signInAnotherWay")
                            ) : (
                                <label className="inline-flex cursor-pointer text-blue-600 hover:text-blue-700">
                                    <ChevronLeftIcon className="w-4" />
                                    {t("back")}
                                </label>
                            )}
                        </a>
                        <DropdownLanguage />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordLayout;
