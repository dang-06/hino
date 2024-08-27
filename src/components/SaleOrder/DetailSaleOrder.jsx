

import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const DetailSaleOrder = ({ detailRow }) => {
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
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">SONo</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.SONo}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Created By</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.CreatedBy}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Created Date</label>
                <p className="text-[16px] leading-[1.2]">{new Date(detailRow.CreatedDate).toLocaleString()}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Updated By</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.UpdatedBy}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Updated Date</label>
                <p className="text-[16px] leading-[1.2]">{new Date(detailRow.UpdatedDate).toLocaleString()}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">SO Status</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.SOStatus}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">SO Date</label>
                <p className="text-[16px] leading-[1.2]">{new Date(detailRow.SODate).toLocaleString()}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Customer Code</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.CustCode}</p>
            </div>
        </>
    );
};

export default DetailSaleOrder;
