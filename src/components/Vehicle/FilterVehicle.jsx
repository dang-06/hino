import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTextField from "../FormField/CustomTextField";
import CustomSelect from "../FormField/CustomSelect";
import dayjs from "dayjs";

const FilterVehicle = ({ filter, setFilter, triggleFiter, setTriggleFiter }) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        vin_no: yup.string(),
        equipmentid: yup.string(),
        sim_no: yup.string(),
        network_carrier: yup.string()
    })

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            vin_no: '',
            equipmentid: '',
            sim_no: '',
            network_carrier: '',
        },
    });

    useEffect(() => {
        if (filter) {
            reset(filter)
        }
    }, [filter])

    useEffect(() => {
        if (triggleFiter) {
            handleSubmit(onSubmit)()
            setTimeout(() => {
                setTriggleFiter(false)
            }, 100)
        }
    }, [triggleFiter])

    useEffect(() => {
        reset()
    }, [])

    const onSubmit = async (data) => {
        let formData = {
            ...data,
            simno: data.sim_no || '',
        };
        delete formData.sim_no;
        setFilter(formData)
    }

    return (
        <>
            <form
                noValidate
                className="flex h-full flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="relative flex">
                    <div className="px-4 sm:px-6 h-full max-w-full">
                        <div className="space-y-4 pt-6 pb-5">
                            <CustomTextField
                                name="vin_no"
                                label={t("vinNo")}
                                control={control}
                                errors={errors.vin_no}
                                placeholder={t("enterVinNumber")}
                            />
                            <CustomTextField
                                name="equipmentid"
                                label={t("equipmentId")}
                                control={control}
                                errors={errors.equipmentid}
                                placeholder={t("enterEquipmentId")}
                            />
                            <CustomTextField
                                name="sim_no"
                                label={t("simNo")}
                                control={control}
                                errors={errors.sim_no}
                                placeholder={t("enterSimNumber")}
                            />
                            <CustomSelect
                                name="network_carrier"
                                label={t("networkCarrier")}
                                control={control}
                                setValue={setValue}
                                options={[
                                    { id: '', value: t("all") },
                                    { id: 'Viettel', value: 'Viettel' },
                                    { id: 'Mobifone', value: 'Mobifone' },
                                    { id: 'Vinaphone', value: 'Vinaphone' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FilterVehicle