import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const DetailSim = ({ detailRow }) => {
    const { t } = useTranslation();

    useEffect(() => {
        // For future API integration
    }, [detailRow]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    return (
        <>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("Sim ID")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.sim_id}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("Sim No")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.sim_no}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("Active Date")}</label>
                <p className="text-[16px] leading-[1.2]">{formatDate(detailRow.active_date)}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("Expire Date")}</label>
                <p className="text-[16px] leading-[1.2]">{formatDate(detailRow.expire_date)}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">{t("Network Carrier")}</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.network_carrier}</p>
            </div>
        </>
    );
};

export default DetailSim;