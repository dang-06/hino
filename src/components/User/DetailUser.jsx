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

    return (
        <>
            {/* <div className="mb-4">
                <label className="text-[13px]   ont-normal text-[#5f6368]">Delivery ID</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.idTypeDetailUser}</p>
            </div> */}
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("userName")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.userName}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("fullName")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.fullName}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("role")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.roleName}</p>
            </div>
            {/* <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("branchId")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.branchIdString}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("Sender")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow?.sender?.senderName}</p>
            </div> */}

            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("phone")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.phone}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("email")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.email}</p>
            </div>

            {/* <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("avatar")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.avatar}</p>
            </div> */}
            {/* <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("isActive")}</label>
                {!detailRow.isActive
                    ? <p className="text-[16px] leading-[1.2] text-[#cc0b0b]">{t("inactive")}</p>
                    : <p className="text-[16px] leading-[1.2] text-[#00b11f]">{t("active")}</p>
                }
                <p className="text-[16px] leading-[1.2]">{detailRow.isActive ? 'Active' : "DeActive"}</p>
            </div> */}
            {/* <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("State")}</label>
                {detailRow.isLocked
                    ? <p className="text-[16px] leading-[1.2] text-[#cc0b0b]">{t("locked")}</p>
                    : <p className="text-[16px] leading-[1.2] text-[#00b11f]">{t("normal")}</p>
                }
            </div> */}

        </>
    );
};

export default DetailUser;
