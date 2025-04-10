import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTextField from "../FormField/CustomTextField";
import CustomSelect from "../FormField/CustomSelect";
import CustomDateField from "../FormField/CustomDateField";
import dayjs from "dayjs";

const FilterSim = ({ filter, setFilter, triggleFiter, setTriggleFiter }) => {
    const { t } = useTranslation();

    const schema = yup.object().shape({})

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
            search: '',
            from_date: '',
            to_date: '',
            status: '',
            network_carrier: '',
            data_plan: '',
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
            from_date: data.from_date
                ? dayjs(data.from_date).startOf('date').format('YYYY-MM-DD')
                : '',
            to_date: data.to_date
                ? dayjs(data.to_date).endOf('date').format('YYYY-MM-DD')
                : '',
        };
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
                                name="search"
                                label={t("searchSim")}
                                control={control}
                                errors={errors.search}
                            />
                            {/* <CustomSelect
                                name="status"
                                label={t("status")}
                                control={control}
                                setValue={setValue}
                                options={[
                                    { id: '', value: t("all") },
                                    { id: 'Active', value: t("active") },
                                    { id: 'Inactive', value: t("inactive") },
                                    { id: 'Expired', value: t("expired") },
                                ]}
                            /> */}
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
                            {/* <CustomSelect
                                name="data_plan"
                                label={t("dataPlan")}
                                control={control}
                                setValue={setValue}
                                options={[
                                    { id: '', value: t("all") },
                                    { id: '4G-1GB', value: '4G-1GB' },
                                    { id: '4G-3GB', value: '4G-3GB' },
                                    { id: '4G-5GB', value: '4G-5GB' },
                                    { id: '5G-Unlimited', value: '5G-Unlimited' },
                                ]}
                            />
                            <CustomDateField
                                name="from_date"
                                label={t("fromDate")}
                                control={control}
                                errors={errors.from_date}
                            />
                            <CustomDateField
                                name="to_date"
                                label={t("toDate")}
                                control={control}
                                errors={errors.to_date}
                            /> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FilterSim