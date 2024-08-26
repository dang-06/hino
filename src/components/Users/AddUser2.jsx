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
import * as api from "../../api";
import { useAddUserVehicleMutation, useDeliveryOrderEditMutation, useAddUserMutation, useUpdateUserMutation, useLazyGetUserDetailQuery } from "../../services/apiSlice";
import CustomDateField from "../FormField/CustomDateField";
import CustomNumberField from "../FormField/CustomNumberField";
import CustomSelect from "../FormField/CustomSelect";
import MultipleSelectCheckbox from "../FormField/MultipleSelectCheckbox";
import CustomAsyncApiSelect from "../FormField/CustomAsyncApiSelect";
import { convertCalculationOrder } from "../../utils/common";
// import { addShipment } from "../../api";
import CustomTextField from "../FormField/CustomTextField";
import { Box, Checkbox, FormControlLabel, Modal, Typography } from "@mui/material";
import CustomTextField2 from "../FormField/CustomTextField2";
import CustomSelect2 from "../FormField/CustomSelect2";
import CustomDateField2 from "../FormField/CustomDateField2";
import CustomCheckbox from "../FormField/CustomCheckbox";
import moment from "moment";

const defaultValues = {
    "user_level_id": 0,
    "display_name": "",
    "username": "",
    "password": "",
    "mobile": "",
    "email": "",
    "line_id": "",
    "expired_date": "",
    "forgot_password": "",
    "default_language_id": 1,
    "owner_partner_id": 0,
    "user_id": 0,
    "avatar_attach_id": 0,
    "customers": [],
    "dealers": [],
    "fleets": [],
    "vehicles": [],
    auto_password: true,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 440,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: '5px',
    maxHeight: '85vh',
    overflow: 'hidden',
    height: '100%'
};

const listRole = [
    {id: 1, value: 'System Manager'},
    {id: 2, value: 'System Assistant'},
    {id: 3, value: 'Platform Manager'},
    {id: 22, value: 'Platform Assistant'},
    {id: 20, value: 'Customer Manager'},
    {id: 42, value: 'Customer Assistant'},
    {id: 43, value: 'Fleet Manager'},
    {id: 44, value: 'Driver'},
]

const AddUser2 = ({ selectedItem, refetch, setTriggleSubmit, triggleSubmit, submitError, setOpenFormAddDO, open, setOpen, vehicle }) => {
    const { t } = useTranslation();
    const [fetchDetail, {data, isLoading, isFetching}] = useLazyGetUserDetailQuery()
    const [updateForm, { isLoading: isLoading1 }] = useUpdateUserMutation();

    const [addNew, { isLoading: isLoadingAdd, data: dataAdd }] = useAddUserMutation();

    const [detailItem, setDetailItem] = useState({})

    const [loadingDetail, setLoadingDetail] = useState(false)
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const [listFleet, setListFleet] = useState([ ])
    const [listVehicle, setListVehicle] = useState([ ])
    const [loadingVehicle, setLoadingVehicle] = useState(false)
    const [clearValue, setClearValue] = useState(1)

    const {dealer, partner} = useSelector(state => state.masterDatas)

    useEffect(_ => {
        // console.log('listFleet', listFleet)
    }, [listFleet])

    useEffect(_ => {
        // console.log(selectedItem)
        if (selectedItem && selectedItem.user_id) {
            setLoadingDetail(true)
            // console.log(selectedItem)
            const getDetailUser = async() => {
                try{
                    const res = await fetchDetail(selectedItem.user_id)
                    if(res.status == "fulfilled"){
                        const data = res.data
                        setDetailItem({...data, id: data.user_id, vehicle_info: data.vehicle_infos.map(i => Object.assign({id: i.id, text: `${i.vin_no}|${i.vehicle_name}|${i.license_plate_no}`}))})
                        reset({...data})
                        setValue('owner_partner_id', data.owner_partner_id)
                        setValue('id', data.user_id)
                        setValue('vehicles', data.vehicle_infos)
                    
                    }else{
                        alert('error')
                    }
                }catch(e){
                }
            }
            getDetailUser()
            // reset({
            //     ...selectedItem, // ... : nhận đc cả dạng array và object
            // }, { keepDirtyValues: true })
        } else {
            reset(defaultValues, { keepDirtyValues: true })
        }
    }, [selectedItem])

    useEffect(_ => {
        if(vehicle && vehicle.vehicle_id){
            setValue('vehicle_id', vehicle.vehicle_id)
        }
    }, [vehicle])

    // Validation
    const schema = yup.object().shape({
        display_name: yup
            .string()
            .required(t("Field required")),
        expired_date: yup
            .string()
            .required(t("Field required")),
        username: yup
            .string()
            .required(t("Field required"))
            .max(20, 'Username max length 20 character'),
        auto_password:  yup.boolean(),
        password: yup
            .string()
            .when("auto_password", {
                is: false,
                then: yup
                    .string()
                    .required(t("message.validation.required", { field: t("password") }))
                    .min(8, 'Min length 8 character')
                    .matches(
                        /^(?=.*[a-z])/,
                        " Must Contain One Lowercase Character"
                    )
                    .matches(
                    /^(?=.*[A-Z])/,
                    "  Must Contain One Uppercase Character"
                    )
                    .matches(
                    /^(?=.*[0-9])/,
                    "  Must Contain One Number Character"
                    )
                    .matches(
                    /^(?=.*[!@#\$%\^&\*])/,
                    "  Must Contain  One Special Case Character"
                    )
            }),
        email: yup
            .string()
            .required(t("Field required"))
            .email(t("Email not valid")),
        mobile: yup
            .string()
            .required(t("Field required")),
        owner_partner_id: yup
            .number()
            .required(t("Field required")),
        user_level_id: yup
            .number()
            .required(t("Field required")),
        

    });

    const fetchCustomer = async (name) => {
        if (name && name.length > 2) {
            try{
                setLoadingVehicle(true)
                const res = await api.fetchVehicle({
                    "offset": 0,
                    "limit": 10,
                    "valueField": "",
                    "search": [
                        {
                            "searchField": "partner_id",
                            "searchValue": watchPartner
                        },
                        {
                            "searchField": "vin_no",
                            "searchValue": name
                        },
                        {
                            "searchField": "license_plate",
                            "searchValue": name
                        },
                    ]
                })
                if(res.status == 200){
                    // const list =  res.data.data
                    const value = (res?.data?.data || []).map(x => {
                        return Object.assign({ id: x.id, text: x.value })
                    })
                    setListVehicle(value)
                    setLoadingVehicle(false)
                    // console.log(value)
                }else{
                    setListVehicle([])
                    setLoadingVehicle(false)
                }
            }catch(e){
                setListVehicle([])
                setLoadingVehicle(false)
            }
            // try {
            //     setLoadingCustomer(true)
            //     let params = '?firstname='+name
            //     const response = await api.fetchCustomer(params);
            //     if (response.status === 200) {
            //         console.log(response)
            //         const value = (response?.data?.data || []).map(x => {
            //             return Object.assign({ id: x.id, text: x.firstname })
            //         })
            //         console.log(value)
            //         setListCustomer(value)
            //         setLoadingCustomer(false)
            //     }
            //     setLoadingCustomer(false)
            // } catch (error) {
            //     setLoadingCustomer(false)
            //     // toast.error(error.response.data?.title);
            // }
        }
    }


    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        resetField,
        getValues,
        unregister,
        register,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
        shouldUnregister: true
    });
    const watchAutoPassword = watch("auto_password", true)
    const watchPartner = watch("owner_partner_id", 0)
    
    useEffect(_ => {
        setListFleet([])
        setListVehicle([])

        // console.log('trigger fleet', watchPartner)
        if(watchPartner){
            setValue(`vehicles`, [], { shouldValidate: true })
            setValue(`fleets`, [], { shouldValidate: true })
            setClearValue(Math.random())
            const fetchFleetByPartner = async() => {
                try{
                    const res = await api.fetchVehicleFleetPartner(watchPartner, {
                        "offset": 0,
                        "limit": 99999,
                        "valueField": "",
                        "search": []
                    })
                    if(res.status == 200){
                        const list =  res.data.data
                        setListFleet(list)
                        if(detailItem.user_id){
                            setTimeout(_ => {
                                setValue('fleets', detailItem['fleets'], { shouldValidate: true })
                            }, 100)
                        }
                        // console.log(list)
                    }else{
                        setListFleet([])
                    }
                }catch(e){
                    console.log('errorr?', e)
                    setListFleet([])
                }
            }

            const fetchVehicleByPartner = async() => {
                try{
                    const res = await api.fetchVehicle({
                        "offset": 0,
                        "limit": 99999,
                        "valueField": "",
                        "search": [
                            {
                                "searchField": "partner_id",
                                "searchValue": watchPartner
                            }
                        ]
                    })
                    if(res.status == 200){
                        const list =  res.data.data
                        setListVehicle(list)
                        // console.log(list)
                    }else{
                        setListVehicle([])
                    }
                }catch(e){
                    setListVehicle([])
                }
            }

            // fetchVehicleByPartner()
            fetchFleetByPartner()

        }
    }, [watchPartner])

    useEffect(_ => {
        
        // console.log(errors, getValues())
    }, [errors])

    const onSubmit = async (data) => {
        const transformData = {
            ...data,
            expired_date: data.expired_date ? moment(data.expired_date).format('YYYY-MM-DD') : null
        };
        console.log(transformData)
        try {
            if (transformData.id) {
                await updateForm(transformData).unwrap();
                toast.success(
                    t("message.success.update", {
                        field: t("User"),
                    })
                );
            } else {
                const res = await addNew(transformData).unwrap();
                toast.success(
                    t("Create new user successfully")
                );

            }
            reset(defaultValues);
            setOpen(false);
        } catch (error) {
            // console.log(error)
            let status = error?.status
            let message = 'Something wrong, please try again later!'
            if (status == 400) {
                message = error?.data?.status?.description || 'Some thing wrong, please try again later'
            }else if(status == 422){
                message = (error?.data?.title + ' - '+error?.data.detail) || 'Some thing wrong, please try again later'
            }
            toast.error(message);
           
        }

    };

    const onClose = () => {
        reset(defaultValues)
        setOpen(false)
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => onClose(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                title="Table Setting"
            >
                <Box style={style}>
                    <div className="bg-white h-full ">

                        <div className="flex h-full flex-col">
                            <div className="flex py-[13px] px-2 justify-between items-top border-b">
                                <div className="flex">
                                    <div className="flex flex-col ml-3 items-start">
                                        <Typography className="text-[18px] font-medium">{detailItem && detailItem.id ? 'Edit' : 'Add'} User </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-auto bg-gray-100">
                                <form
                                    noValidate
                                    className="flex h-full flex-col"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className="flex min-h-0 flex-1 flex-col">

                                        <div className="relative overflow-hidden flex">
                                            <div className="px-4 w-full h-full flex flex-col">
                                                {/* {(vehicle && vehicle.vehicle_id) &&<div className="mt-3">
                                                    <Typography className="text-[16px] font-medium">Vehicle Information:</Typography>
                                                    <Typography>Vehicle Name: {vehicle?.vehicle_name}</Typography>
                                                    <Typography>License Plate: {vehicle?.license_plate_no}</Typography>
                                                    <Typography>Vin No: {vehicle?.vin_no}</Typography>
                                                </div>} */}
                                                <CustomTextField2
                                                    className="hidden"
                                                    name="id"
                                                    control={control}
                                                    errors={errors?.id}
                                                />
                                                {/* <CustomTextField2
                                                    className="hidden"
                                                    name="user_level_id"
                                                    control={control}
                                                    errors={errors?.user_level_id}
                                                /> */}
                                                <div className=" overflow-auto space-y-3 pt-6 pb-5">
                                                    <CustomTextField2
                                                        name="display_name"
                                                        label="Display Name"
                                                        control={control}
                                                        errors={errors?.display_name}
                                                        required
                                                    />
                                                    <CustomSelect2
                                                        label="Role"
                                                        name="user_level_id"
                                                        control={control}
                                                        setValue={setValue}
                                                        multiple={false}
                                                        size="small"
                                                        sx={{
                                                            m: 0, minWidth: 100, backgroundColor: '#fff'
                                                        }}
                                                        errors={errors.user_level_id}
                                                        required
                                                        options={listRole}
                                                    />
                                                    <CustomTextField2
                                                        name="username"
                                                        label="Username"
                                                        control={control}
                                                        errors={errors?.username}
                                                        required
                                                        disabled={detailItem.id ? true : false}
                                                    />
                                                   
                                                    {!detailItem.id && (<><CustomCheckbox
                                                        control={control}
                                                        label="Auto Password"
                                                        name="auto_password"
                                                        size="small"
                                                    />
                                                    <CustomTextField2
                                                        disabled={watchAutoPassword}
                                                        type="password"
                                                        name="password"
                                                        label="Password"
                                                        control={control}
                                                        errors={errors?.password}
                                                        required
                                                    /></>)}

                                                    <CustomTextField2
                                                        name="email"
                                                        label="Email"
                                                        control={control}
                                                        errors={errors?.email}
                                                        required
                                                        infor={true}
                                                        inforText="Please fill up your mail"
                                                    />
                                                    <div className="flex gap-2">

                                                        <CustomTextField2
                                                            name="mobile"
                                                            label="Phone number"
                                                            control={control}
                                                            errors={errors?.phone}
                                                            required
                                                        />
                                                        <CustomTextField2
                                                            name="line_id"
                                                            label="Line ID"
                                                            control={control}
                                                            errors={errors?.phone}
                                                        />
                                                    </div>
                                                    <CustomSelect2
                                                        label="Dealer"
                                                        name="dealers"
                                                        control={control}
                                                        setValue={setValue}
                                                        multiple={true}
                                                        size="small"
                                                        sx={{
                                                            m: 0, minWidth: 100, backgroundColor: '#fff'
                                                        }}
                                                        errors={errors.dealers}

                                                        options={dealer?.data || []}
                                                    />
                                                    <CustomSelect2
                                                        label="Owner Partner"
                                                        name="owner_partner_id"
                                                        control={control}
                                                        setValue={setValue}
                                                        size="small"
                                                        sx={{
                                                            m: 0, minWidth: 100, backgroundColor: '#fff'
                                                        }}
                                                        required
                                                        errors={errors.owner_partner_id}
                                                        infor={true}
                                                        inforText={'Please type name to select'}
                                                        options={partner?.data || []}
                                                    />
                                                    <CustomSelect2
                                                        label="Fleet"
                                                        name="fleets"
                                                        control={control}
                                                        setValue={setValue}
                                                        multiple={true}
                                                        size="small"
                                                        sx={{
                                                            m: 0, minWidth: 100, backgroundColor: '#fff'
                                                        }}
                                                        errors={errors.fleets}
                                                        infor={true}
                                                        inforText={'Please select Owner Partner first'}
                                                        options={listFleet}
                                                    />
                                                    <CustomAsyncApiSelect
                                                        className="w-full"
                                                        name="vehicles"
                                                        fetchApi={fetchCustomer}
                                                        label="Vehicle"
                                                        defaultValue={detailItem.vehicle_info || []}
                                                        data={listVehicle}
                                                        multiple={true}
                                                        clearValue={clearValue}
                                                        errors={errors.vehicles}
                                                        isFetching={loadingVehicle}
                                                        isLoading={loadingVehicle}
                                                        control={control}
                                                        infor={true}
                                                        inforText={'Please type customer name to select'}
                                                        onChange={(e) => {
                                                            // console.log(e)
                                                            setValue(`vehicles`, e, { shouldValidate: true })
                                                        }}
                                                    />
                                                    {/* <CustomSelect2
                                                        label="Vehicle"
                                                        name="vehicles"
                                                        control={control}
                                                        setValue={setValue}
                                                        multiple={true}
                                                        required
                                                        size="small"
                                                        infor={true}
                                                        inforText={'Please select Owner Partner first'}
                                                        sx={{
                                                            m: 0, minWidth: 100, backgroundColor: '#fff'
                                                        }}
                                                        errors={errors.vehicles}

                                                        options={listVehicle}
                                                    /> */}
                                                    <div className="flex gap-2">
                                                        <CustomDateField2
                                                            label="Expired Date"
                                                            name="expired_date"
                                                            size="small"
                                                            required
                                                            control={control}
                                                            errors={errors.expired_date}
                                                            sx={{ backgroundColor: '#fff', width: '100%' }}
                                                        />
                                                        <CustomSelect2
                                                            label="Default Language"
                                                            name="default_language_id"
                                                            control={control}
                                                            setValue={setValue}
                                                            size="small"
                                                            sx={{
                                                                m: 0, minWidth: 100,  backgroundColor: '#fff'
                                                            }}
                                                            errors={errors.default_language_id}

                                                            options={[
                                                                { id: 1, value: "English" },
                                                                { id: 2, value: 'ไทย' },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="text-right py-[14px] px-2 border-t border-secondary flex items-center gap-3 justify-end">
                                <button onClick={() => onClose(false)} className="border border-[#464f6029] py-[6px] px-4 rounded-[7px]  text-secondary">Cancel</button>
                                <LoadingButton
                                    onClick={() => { handleSubmit(onSubmit)() }}
                                    type="submit"
                                    variant="contained"
                                    loading={formSubmitLoading}
                                >Save</LoadingButton>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>


        </>
    );
};

export default AddUser2;
