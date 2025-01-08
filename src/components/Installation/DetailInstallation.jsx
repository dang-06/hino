
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

const DetailInstallation = ({ detailRow }) => {
    const { t } = useTranslation();
    //   const [openEdit, setOpenEdit] = useState(false);
    const [detail, setDetail] = useState({});
    const { masterDatas } = useSelector((state) => state.masterDatas);
    const [updateInstallation, { isLoading }] = useUpdateInstallationMutation();

    useEffect(() => {
        if (detailRow.id) {
            console.log(detailRow.id)
            const response = fetchInstallationDetail(detailRow.id)
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
                        <label className="text-[13px] font-normal text-[#5f6368]">ID</label>
                        <p className="text-[16px] leading-[1.2]">{detail.job_id}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Accessories</label>
                        <p className="text-[16px] leading-[1.2]">{detail.accessories}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Accessories Image</label>
                        {detail.accessories_img_path && (<img
                            src={detail.accessories_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Additional Equipment Image</label>
                        {detail.additional_img_path && (<img
                            src={detail.additional_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Additional Equipment Image 1</label>
                        {detail.additional_equipment_img1_path && (<img
                            src={detail.additional_equipment_img1_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Additional Equipment Image 2</label>
                        {detail.additional_equipment_img2_path && (<img
                            src={detail.additional_equipment_img2_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">after_installation_img_path</label>
                        {detail.after_installation_img_path && (<img
                            src={detail.after_installation_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">anten_gps_gsm_img_path</label>
                        {detail.anten_gps_gsm_img_path && (<img
                            src={detail.anten_gps_gsm_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">front_view_img_path</label>
                        {detail.front_view_img_path && (<img
                            src={detail.front_view_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">back_view_img_path</label>
                        {detail.back_view_img_path && (<img
                            src={detail.back_view_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">before_installation_img_path</label>
                        {detail.before_installation_img_path && (<img
                            src={detail.before_installation_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">car_chassis_img_path</label>
                        {detail.car_chassis_img_path && (<img
                            src={detail.car_chassis_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">gps_devices_img_path</label>
                        {detail.gps_devices_img_path && (<img
                            src={detail.gps_devices_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">car_chassis_img_path</label>
                        {detail.car_chassis_img_path && (<img
                            src={detail.car_chassis_img_path}
                            alt="Additional Equipment 1"
                            className="max-w-full max-h-80"
                        />)}
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Installation Date</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_date}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Installation Location</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_location}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">installation_type</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_type}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Job Status</label>
                        <p className="text-[16px] leading-[1.2]">{detail.job_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Differential Status</label>
                        <p className="text-[16px] leading-[1.2]">{detail.differential_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Engine Oil Status</label>
                        <p className="text-[16px] leading-[1.2]">{detail.engine_oil_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Transmission Status</label>
                        <p className="text-[16px] leading-[1.2]">{detail.transmission_status}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">odometer_reading</label>
                        <p className="text-[16px] leading-[1.2]">{detail.odometer_reading}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Note</label>
                        <p className="text-[16px] leading-[1.2]">{detail.note}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Notes</label>
                        <p className="text-[16px] leading-[1.2]">{detail.notes}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">other</label>
                        <p className="text-[16px] leading-[1.2]">{detail.other}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailInstallation;
