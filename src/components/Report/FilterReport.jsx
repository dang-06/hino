import react, { useEffect, useState } from "react";
import { CustomAsyncSelect } from "..";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import CustomSelect from "../FormField/CustomSelect";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { DesktopDatePicker, DatePicker } from "@mui/x-date-pickers";
import CustomDateField from "../FormField/CustomDateField";
import { useForm } from "react-hook-form";
import CustomTextField from "../FormField/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetTruckTypeQuery } from "../../services/apiSlice";
import MultipleSelectCheckbox from "../FormField/MultipleSelectCheckbox";
import { useSelector } from "react-redux";
import { expenseTypes, listStaffPosition, listStaffType, reportTypes } from "../../constants/constants";

const FilterReport = ({ filter, setFilter, triggleFiter, setTriggleFiter }) => {
    const { t } = useTranslation();

    const siteLocation = useSelector(state => state.mapLocation)

    const schema = yup.object().shape({ 
        // dateFrom: yup.date().default(() => new Date()),
        dateTo: yup
        .date()
        .when(
            "createdFrom",
            (dateTo, schema) => dateTo && schema.min(dateTo, 'From date must greater or equal To date')),
    })

    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        watch,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            shipmentId: '',
            dateFrom: dayjs().subtract(1, 'months'),
            dateTo: dayjs(),
            reportType: 1,
            staffName: '',
            staffType: '',
            positionStaff: '',
            expenseType: 0,
            idSite: ''
           
        },
    });

    const watchType = watch("reportType", 1) // you can supply default value as second argument

    useEffect(_ => {
        if(filter){
            console.log(filter)
            reset(filter)
        }
    }, [filter])

    useEffect(_ => {
        // alert( triggleFiter)
        if(triggleFiter){
            handleSubmit(onSubmit)()
            // setFilter(selfFilter)

            setTimeout(_ => {
                setTriggleFiter(false)
            }, 100)
        }
    }, [triggleFiter])

    

    useEffect(_ => {
        reset()
    }, [])



    const onSubmit = async (data) => {
        // let formData = ({dateFrom: dayjs(data.dateFrom).startOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]'), dateTo: dayjs(data.dateTo).endOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]')})
        setFilter(data)
        
    }

    // useEffect(_ => {
    //     if(filter){
    //         setFilter(selfFilter)
    //     }
    // }, [filter])


    const handleChange = (e) => {

    }

    return (
        <>
            <form
                noValidate
                className="flex h-full flex-col "
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="relative flex">
                        <div className=" px-4 sm:px-6  h-full max-w-full">
                            <div className="space-y-4 pt-6 pb-5">
                                
                                <CustomSelect
                                    name="reportType"
                                    label="Report Type"
                                    control={control}
                                    setValue={setValue}
                                    // errors={errors.truckType}
                                    options={reportTypes}/>

                                {watchType == 2 && <CustomSelect
                                    name="expenseType"
                                    label="expenseType"
                                    control={control}
                                    setValue={setValue}
                                    errors={errors.expenseType}
                                    options={[{id: 0, value: 'All'}, ...expenseTypes]}
                                    // required
                                />}
                                {watchType == 1 && <CustomSelect
                                    name="staffType"
                                    label="Staff Type"
                                    control={control}
                                    setValue={setValue}
                                    // errors={errors.truckType}
                                    options={listStaffType}/>
                                }
                                {watchType == 1 && <CustomSelect
                                    name="positionStaff"
                                    label="Staff Position"
                                    control={control}
                                    setValue={setValue}
                                    // errors={errors.truckType}
                                    options={listStaffPosition}/>
                                }
                                {watchType == 1 && <CustomTextField
                                    name="staffName"
                                    label="staffName"
                                    control={control}
                                    errors={errors.staffName}
                                    // required
                                />
}       
                                <CustomSelect
                                    name="idSite"
                                    label="Site ID"
                                    control={control}
                                    setValue={setValue}
                                    // errors={errors.truckType}
                                    options={(siteLocation?.listSiteLocation || []).map((x) => {
                                        return { id: x.idSite, value: `${x.siteName} (${x.idSite})` };
                                    })}
                                    // options={truckTypeList?.content || []}
                                    // required
                                />
                                <CustomTextField
                                    name="shipmentId"
                                    label="shipmentId"
                                    control={control}
                                    errors={errors.shipmentId}
                                    // required
                                />
                                 <CustomDateField
                                    name="dateFrom"
                                    label="dateFrom"
                                    control={control}
                                    errors={errors.dateFrom}
                                    required
                                />

                                <CustomDateField
                                    name="dateTo"
                                    label="dateTo"
                                    control={control}
                                    errors={errors.dateTo}
                                    required
                                />
                            </div>
                        </div>
                </div>                
            </form>
        

        </>
    )
}

export default FilterReport