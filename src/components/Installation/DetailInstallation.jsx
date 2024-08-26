
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
    const { masterDatas } = useSelector((state) => state.masterDatas);
    const [updateInstallation, { isLoading }] = useUpdateInstallationMutation();

    useEffect(() => {
        // if(selectedInstallationEdit){
        //     console.log(selectedInstallationEdit)
        //     const response = fetchInstallationDetail(selectedInstallationEdit.id)
        //     response.then(i => {
        //         console.log(i.data)
        //         reset(i.data)
        //     })
        // }
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
                <div className="flex-1 p-4 w-5/12">
                    <img className="rounded" src={`${detailRow.image}`} alt="" />
                </div>
                <div className="flex-1 w-5/12 bg-white p-4 overflow-auto" style={{ height: 'calc(100vh - 110px)' }}>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">ID</label>
                        <p className="text-[16px] leading-[1.2]">{detailRow.id}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Number Plate</label>
                        <p className="text-[16px] leading-[1.2]">{detailRow.numberPlate}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-[13px] font-normal text-[#5f6368]">Description</label>
                        <p className="text-[16px] leading-[1.2]">{detailRow.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailInstallation;
