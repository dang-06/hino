import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const DetailUser = ({ detailRow }) => {
    const { t } = useTranslation();
    //   const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        // if(selectedTruckEdit){
        //     console.log(selectedTruckEdit)
        //     const response = fetchTruckDetail(selectedTruckEdit.id)
        //     response.then(i => {
        //         console.log(i.data)
        //         reset(i.data)
        //     })
        // }
        // reset(truck)
    }, [detailRow])





    const onClose = () => {
        // setOpenEdit(false);
        // clearErrors();
        // reset();
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    return (
        <>
            {/* <div className="mb-4">
                <label className="text-[13px]   ont-normal text-[#5f6368]">Delivery ID</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.idTypeDetailUser}</p>
            </div> */}
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("id")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.user_id}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("userName")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.user_name}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("fullName")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.full_name}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("email")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.email}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("role")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.role_name}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("phone")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.phone_number}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("gender")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.gender}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("address")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.address}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("dateOfBirth")}</label>
                <p className="text-[16px] leading-[1.2]">{formatDate(detailRow.date_of_birth)}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("createdTime")}</label>
                <p className="text-[16px] leading-[1.2]">{formatDate(detailRow.created_time)}</p>
            </div>
        </>
    );
};

export default DetailUser;
