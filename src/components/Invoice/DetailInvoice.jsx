

import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const DetailInvoice = ({ detailRow }) => {
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
                <label className="text-[13px] font-normal text-[#5f6368]">Invoice No</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.invoice_no}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Item No</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.item_no}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Quantity</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.item_quantity}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Price</label>
                <p className="text-[16px] leading-[1.2]">฿{detailRow.item_price.toLocaleString()}</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Discount %</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.item_discount_pe}%</p>
            </div>
            <div className="mb-4">
                <label className="text-[13px] font-normal text-[#5f6368]">Description</label>
                <p className="text-[16px] leading-[1.2]">{detailRow.item_desc}</p>
            </div>
        </>
    );
};

export default DetailInvoice;
