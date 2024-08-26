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
import CustomDateTimeField from "../FormField/CustomDateTimeField";

const FilterApprovedShipment = ({ fleets, filter, setFilter, triggleFiter, setTriggleFiter, menu }) => {
    const { t } = useTranslation();


    const siteLocation = useSelector(state => state.mapLocation)

    const {data: truckTypeList} = useGetTruckTypeQuery({page: 0, rowsPerPage: 100})

    const schema = yup.object().shape({ 
        dateFrom: yup.date().default(() => new Date()),
        dateTo: yup
        .date()
        .when(
            "dateFrom",
            (dateTo, schema) => dateTo && schema.min(dateTo, 'From date must greater or equal To date')),
        
        shipmentStatus: yup.array().min(1, "at least 1").required(t("message.validation.required", { field: t("shipmentStatus") }))
    })

    useEffect(_ => {
        var value = {...filter, dateTo: dayjs(filter.dateTo).subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss[Z]') }
        if(filter.shipmentStatus && filter.shipmentStatus.length > 0){
            value['shipmentStatus'] = shipmentStatus.filter(i => filter.shipmentStatus.includes(i.id))
        }
        
        reset(value, { keepDirtyValues: true })
    }, [filter])

    useEffect(_ => {
        if(triggleFiter){
            handleSubmit(onSubmit)()
            // setFilter(selfFilter)

            setTimeout(_ => {
                // setTriggleFiter(false)
            }, 100)
        }
    }, [triggleFiter])

    const shipmentStatus = [
        {id: 1, name: 'Planning',},
        {id: 2, name: 'Waiting Driver Accept'},
        {id: 3, name: 'Not started'},
        {id: 4, name: 'Started'},
        {id: 5, name: 'On delivery'},
        {id: 6, name: 'Delivery completed'},
        {id: 7, name: 'Closed', disabled: (menu == 'approved') ? true : false},
    ]

    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        resetField,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            shipmentId: "",
            shipmentStatus: [
                // {id: 2, name: 'Waiting to accept'},
                // {id: 3, name: 'Driver accepted'},
                // {id: 4, name: 'On Progress'},
                // {id: 5, name: 'Completed'},
            ],
            // truckType: 0,
            driverId: "",
            dateFrom: dayjs().subtract(1, 'months').startOf('day'),
            dateTo: dayjs().endOf('day'),
            licensePlate: '',
            driverName: '',
            carCharacteristicId: '',
            branchName: ""
        },
    });

    const onSubmit = async (data) => {
        let formData = ({...data, shipmentStatus: data.shipmentStatus.map(i => i?.id), dateFrom: dayjs(data.dateFrom).startOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]'), dateTo: dayjs(data.dateTo).endOf('date').format('YYYY-MM-DDTHH:mm:ss[Z]')})
        // console.log('form ', data)
        setFilter(formData)
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
                                
                                {menu == 'approved' && <MultipleSelectCheckbox 
                                    dataSource={shipmentStatus} 
                                    name="shipmentStatus"
                                    label="shipmentStatus"
                                    control={control}
                                    resetField={resetField}
                                    setValue={setValue}
                                    getValues={getValues}
                                    errors={errors.shipmentStatus}
                                    required
                                />}
                                <CustomSelect
                                    name="branchName"
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
                                {/* {menu != 'plan' && <CustomTextField
                                    name="licensePlate"
                                    label="licensePlate"
                                    control={control}
                                    errors={errors.licensePlate}
                                    // required
                                />} */}
                                {menu != 'plan' && <CustomTextField
                                    name="driverName"
                                    label="driverName"
                                    control={control}
                                    errors={errors.driverName}
                                    // required
                                />}
                                {/* <CustomTextField
                                    name="shipmentId"
                                    label="shipmentId"
                                    control={control}
                                    errors={errors.shipmentId}
                                    required
                                /> */}
                                {/* <CustomSelect
                                    name="shipmentStatus"
                                    label="shipmentStatus"
                                    control={control}
                                    errors={errors.shipmentStatus}
                                    options={shipmentStatus}
                                    multiple
                                    required
                                /> */}
                                {menu != 'plan' && <CustomSelect
                                    name="carCharacteristicId"
                                    label="Truck Type"
                                    control={control}
                                    setValue={setValue}
                                    // errors={errors.truckType}
                                    options={(truckTypeList?.content || []).map((x) => {
                                        return { id: x.id, value: x.englishName };
                                    })}
                                    // options={truckTypeList?.content || []}
                                    // required
                                />}
                                {/* <CustomSelect
                                    name="driverId"
                                    label="driver"
                                    control={control}
                                    errors={errors.driverId}
                                    options={shipmentStatus}
                                    required
                                /> */}
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

export default FilterApprovedShipment