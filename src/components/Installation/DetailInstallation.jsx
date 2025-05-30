
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
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

const DetailInstallation = ({ detailRow }) => {
    const { t } = useTranslation();
    //   const [openEdit, setOpenEdit] = useState(false);
    const [detail, setDetail] = useState({});
    const { masterDatas } = useSelector((state) => state.masterDatas);
    const [updateInstallation, { isLoading }] = useUpdateInstallationMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [images, setImages] = useState([]);

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
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("vinNo")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.vin_no}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("engineNo")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.engine_no}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("model")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.model}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("lotNo")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.lot_no}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("manufactureDate")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.manufacture_date}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("segment")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.segment}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("specialEquipment")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.special_equipment}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("installationType")}</label>
                        <p className="text-[16px] leading-[1.2]">{t(detail.installation_type)}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("installationLocation")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_location}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("installationDate")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.installation_date}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("jobStatus")}</label>
                        <p className="text-[16px] leading-[1.2]">{t(detail.job_status)}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("techName")}</label>
                        <p className="text-[16px] leading-[1.2]">{t(detail.techname)}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("note")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.note}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("ODO")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.odometer_reading}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("imeiNo")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.imei_no}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">{t("simNo")}</label>
                        <p className="text-[16px] leading-[1.2]">{detail.sim_no}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">
                            {t("installationImage")}
                        </label>
                        <div className="flex gap-2 mt-2">
                            {detail.installation_img_paths?.length > 0 && (
                                detail.installation_img_paths.map((imgPath, index) => (
                                    <img
                                        key={index}
                                        src={imgPath}
                                        alt={`Installation Image ${index + 1}`}
                                        className="max-w-full h-40 object-cover rounded-lg shadow cursor-pointer"
                                        onClick={() => {
                                            setPhotoIndex(index);
                                            setImages(detail.installation_img_paths);
                                            setIsOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">
                            {t("afterInstallationImg")}
                        </label>
                        <div className="flex gap-2 mt-2">
                            {detail.after_installation_img_paths?.length > 0 && (
                                detail.after_installation_img_paths.map((imgPath, index) => (
                                    <img
                                        key={index}
                                        src={imgPath}
                                        alt={`Installation Image ${index + 1}`}
                                        className="max-w-full h-40 object-cover rounded-lg shadow cursor-pointer"
                                        onClick={() => {
                                            setPhotoIndex(index);
                                            setImages(detail.after_installation_img_paths);
                                            setIsOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">
                            {t("deviceAndSimImg")}
                        </label>
                        <div className="flex gap-2 mt-2">
                            {detail.device_and_sim_img_paths?.length > 0 && (
                                detail.device_and_sim_img_paths.map((imgPath, index) => (
                                    <img
                                        key={index}
                                        src={imgPath}
                                        alt={`Installation Image ${index + 1}`}
                                        className="max-w-full h-40 object-cover rounded-lg shadow cursor-pointer"
                                        onClick={() => {
                                            setPhotoIndex(index);
                                            setImages(detail.device_and_sim_img_paths);
                                            setIsOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">
                            {t("deviceStatusImg")}
                        </label>
                        <div className="flex gap-2 mt-2">
                            {detail.device_status_img_paths?.length > 0 && (
                                detail.device_status_img_paths.map((imgPath, index) => (
                                    <img
                                        key={index}
                                        src={imgPath}
                                        alt={`Installation Image ${index + 1}`}
                                        className="max-w-full h-40 object-cover rounded-lg shadow cursor-pointer"
                                        onClick={() => {
                                            setPhotoIndex(index);
                                            setImages(detail.device_status_img_paths);
                                            setIsOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">
                            {t("vehicleInforImg")}
                        </label>
                        <div className="flex gap-2 mt-2">
                            {detail.vehicle_infor_img_paths?.length > 0 && (
                                detail.vehicle_infor_img_paths.map((imgPath, index) => (
                                    <img
                                        key={index}
                                        src={imgPath}
                                        alt={`Installation Image ${index + 1}`}
                                        className="max-w-full h-40 object-cover rounded-lg shadow cursor-pointer"
                                        onClick={() => {
                                            setPhotoIndex(index);
                                            setImages(detail.vehicle_infor_img_paths);
                                            setIsOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                    imagePadding={80}
                />
            )}
        </>
    );
};

export default DetailInstallation;
