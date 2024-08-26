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
import { useAddUserVehicleMutation, useDeliveryOrderEditMutation, } from "../../services/apiSlice";
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

const defaultValues = {
    // platform: '',
    username: '',
    password: '',
    auto_password: true,
    // display_name: '',
    // company: "",
    email: "",
    phone_no: "",
    vehicle_id: ""
    // role: "",
    // language: "",
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
    // height: '100%'
};

const AddUser = ({ selectedItem, refetch, setTriggleSubmit, triggleSubmit, submitError, setOpenFormAddDO, open, setOpen, vehicle }) => {
    const { t } = useTranslation();
    const [updateForm, { isLoading: isLoading1 }] = useDeliveryOrderEditMutation();

    const [addNew, { isLoading: isLoadingAdd, data: dataAdd }] = useAddUserVehicleMutation();

    const [formSubmitLoading, setFormSubmitLoading] = useState(false)

    useEffect(_ => {
        // console.log(selectedItem)
        if (selectedItem && selectedItem.user_id) {
            reset({
                ...selectedItem, // ... : nhận đc cả dạng array và object
            }, { keepDirtyValues: true })
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
        username: yup
            .string()
            .required(t("Field required")),
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

    });


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
    

    const onSubmit = async (data) => {
        const transformData = {
            ...data,
        };
        // console.log(transformData)
        try {
            if (transformData.id) {
                await updateForm(transformData).unwrap();
                toast.success(
                    t("message.success.update", {
                        field: t("DO"),
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
            console.log(error)
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
                                        <Typography className="text-[18px] font-medium">{selectedItem && selectedItem.id ? 'Edit' : 'Add'} User </Typography>
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

                                        <div className="relative flex">
                                            <div className="px-4 sm:px-6 w-full h-full">
                                                {/* {(vehicle && vehicle.vehicle_id) &&<div className="mt-3">
                                                    <Typography className="text-[16px] font-medium">Vehicle Information:</Typography>
                                                    <Typography>Vehicle Name: {vehicle?.vehicle_name}</Typography>
                                                    <Typography>License Plate: {vehicle?.license_plate_no}</Typography>
                                                    <Typography>Vin No: {vehicle?.vin_no}</Typography>
                                                </div>} */}
                                                <div className="space-y-3 pt-6 pb-5">
                                                    <CustomTextField2
                                                        name="username"
                                                        label="Username"
                                                        control={control}
                                                        errors={errors?.username}
                                                        required
                                                    />
                                                   
                                                    <CustomCheckbox
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
                                                    />

                                                    <CustomTextField2
                                                        name="email"
                                                        label="Email"
                                                        control={control}
                                                        errors={errors?.email}
                                                        required
                                                        infor={true}
                                                        inforText="Please fill up your mail"
                                                    />
                                                    <CustomTextField2
                                                        name="phone_no"
                                                        label="Phone no."
                                                        control={control}
                                                        errors={errors?.phone}
                                                        infor={true}
                                                        inforText="Please fill up your phone"
                                                    />
                                                   
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

export default AddUser;
