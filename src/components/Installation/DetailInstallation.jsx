
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FiUserPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useAddInstallationMutation, useUpdateInstallationMutation } from "../../services/apiSlice";
import CustomDateField from "../FormField/CustomDateField";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomSelect from "../FormField/CustomSelect";
// import { addInstallation } from "../../api";
import CustomTextField from "../FormField/CustomTextField";
import { AiFillEdit } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { fetchInstallationDetail } from "../../api";

const   DetailInstallation = ({ detailRow }) => {
    const { t } = useTranslation();
    //   const [openEdit, setOpenEdit] = useState(false);
    const [detail, setDetail] = useState({});
    const { masterDatas } = useSelector((state) => state.masterDatas);
    const [updateInstallation, { isLoading }] = useUpdateInstallationMutation();

    useEffect(() => {
        if (detailRow.job_id) {
            console.log(detailRow.job_id)
            const response = fetchInstallationDetail(detailRow.job_id)
            response.then(i => {
                console.log(i.data)
                setDetail(i.data.data)
            })
        }
        // reset(Installation)
        console.log(detailRow)
    }, [detailRow])





    const onClose = () => {
        // setOpenEdit(false);
        // clearErrors();
        // reset();
    };

    return (
        <>
            <div className="flex">
                {/* <div className="flex-1 p-4 w-5/12">
                    <img className="rounded" src={`${detail.image}`} alt="" />
                </div> */}
                <div
                    className="flex-1 w-5/12 bg-white p-4 overflow-auto"
                    style={{ height: "calc(100vh - 110px)" }}
                >
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("id")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.job_id}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("accessories")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.accessories}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("accessoriesImage")}</label>
                        {detail.accessories_img_path && (<img
                            src={detail.accessories_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("additionalEquipmentImage")}</label>
                        {detail.additional_img_path && (<img
                            src={detail.additional_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("additionalEquipmentImage1")}</label>
                        {detail.additional_equipment_img1_path && (<img
                            src={detail.additional_equipment_img1_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("additionalEquipmentImage2")}</label>
                        {detail.additional_equipment_img2_path && (<img
                            src={detail.additional_equipment_img2_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("afterInstallationImage")}</label>
                        {detail.after_installation_img_path && (<img
                            src={detail.after_installation_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("antenGpsGsmImage")}</label>
                        {detail.anten_gps_gsm_img_path && (<img
                            src={detail.anten_gps_gsm_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("frontViewImage")}</label>
                        {detail.front_view_img_path && (<img
                            src={detail.front_view_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("backViewImage")}</label>
                        {detail.back_view_img_path && (<img
                            src={detail.back_view_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("beforeInstallationImage")}</label>
                        {detail.before_installation_img_path && (<img
                            src={detail.before_installation_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("carChassisImage")}</label>
                        {detail.car_chassis_img_path && (<img
                            src={detail.car_chassis_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("gpsDevicesImage")}</label>
                        {detail.gps_devices_img_path && (<img
                            src={detail.gps_devices_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("carChassisImage")}</label>
                        {detail.car_chassis_img_path && (<img
                            src={detail.car_chassis_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("installationDate")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_date}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("installationLocation")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_location}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("installationType")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_type}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("jobStatus")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.job_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("differentialStatus")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.differential_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("engineOilStatus")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.engine_oil_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("transmissionStatus")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.transmission_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("odometerReading")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.odometer_reading}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("note")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.note}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("notes")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.notes}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("other")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.other}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailInstallation;
